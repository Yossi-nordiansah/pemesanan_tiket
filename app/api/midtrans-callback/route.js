import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';

export const runtime = 'nodejs';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    const { transaction_status, fraud_status, order_id } = body;

    if (transaction_status === 'settlement' && fraud_status === 'accept') {
      const transaction = await prisma.transactions.update({
        where: { id: order_id },
        data: {
          status: 'Paid',
          purchase_time: new Date(),
        },
      });

      const { name, email, whatsapp } = transaction;

      const qrData = `${name} | ${email} | ${whatsapp} | ${order_id}`;
      const qrImage = await QRCode.toDataURL(qrData);
      const qrBuffer = Buffer.from(qrImage.split(',')[1], 'base64');

      await prisma.transactions.update({
        where: { id: order_id },
        data: { qr_code: qrImage },
      });

      // Buat PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([400, 520]);

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const image = await pdfDoc.embedPng(qrBuffer);

      // 🎨 Warna
      const yellow = rgb(1, 0.87, 0.2);
      const blue = rgb(0.15, 0.35, 0.85);
      const lightGray = rgb(0.97, 0.97, 0.97);

      // 🟨 Header Kuning
      page.drawRectangle({
        x: 0,
        y: 450,
        width: 400,
        height: 80,
        color: yellow,
      });

      page.drawText('TIKET MASUK', {
        x: 130,
        y: 490,
        size: 20,
        font: boldFont,
        color: blue,
      });

      page.drawText('MetaVFest 2025', {
        x: 139,
        y: 470,
        size: 16,
        font: boldFont,
        color: rgb(0.2, 0.2, 0.2),
      });

      // 📦 Box konten
      page.drawRectangle({
        x: 30,
        y: 20, //100
        width: 340,
        height: 400,
        color: lightGray,
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 1,
      });

      // 📷 QR Code
      page.drawImage(image, {
        x: 100,
        y: 200,
        width: 200,
        height: 200,
      });

      // 🧾 Info
      page.drawText(`Nama        : ${name}`, { x: 50, y: 130, size: 14, font, color: rgb(0, 0, 0) });
      page.drawText(`WhatsApp : ${whatsapp}`, { x: 50, y: 110, size: 14, font });
      page.drawText(`Order ID    : ${order_id}`, { x: 50, y: 90, size: 14, font });

      // 🟦 Footer info kecil
      page.drawText('Tunjukkan tiket ini saat masuk event', {
        x: 120,
        y: 45, //130
        size: 10,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      // ➖ Garis putus-putus sobekan
      for (let x = 30; x <= 369; x += 10) {
        page.drawLine({
          start: { x, y: 165 },
          end: { x: x + 5, y: 165 },
          thickness: 3,
          color: rgb(0.6, 0.6, 0.6),
        });
      }

      const pdfBytes = await pdfDoc.save();

      // Simpan ke file
      const filePath = path.join(process.cwd(), 'public', 'tickets', `${order_id}.pdf`);
      await fs.writeFile(filePath, pdfBytes);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const pdfBuffer = await readFile(filePath);
      await transporter.verify().then(() => {
        console.log('✅ SMTP server ready to take messages');
      }).catch(console.error);

      
      await transporter.sendMail({
        from: `"MetaVFest 2025" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'E-Tiket MetaVFest 2025',
        text: `Halo ${name},\n\nBerikut adalah e-tiket kamu untuk MetaVFest 2025.\n\nTunjukkan saat masuk ke acara.\n\nSalam,\nMetaVFest Team`,
        attachments: [
          {
            filename: `Tiket-MetaVFest-${order_id}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      }).then(() => {
        console.log('📤 Email berhasil dikirim');
      }).catch((err) => {
        console.error('❌ Gagal kirim email:', err);
      });

      console.log('📤 Email terkirim ke', email);
      return NextResponse.json({ message: 'Tiket dibuat dan disimpan' });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Gagal proses callback:', err.message);
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 });
  }
}


