import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    // Tentukan folder berdasarkan field 'type' dalam FormData
    const type = formData.get("type");
    const folder = type === "logo" ? "logo" : "image";
    const uploadDir = path.join(process.cwd(), "public/admin/guest", folder);

    // Simpan file
    await writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ filename: `/admin/guest/${folder}/${fileName}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
