'use client';
import { useSearchParams } from 'next/navigation';

const TicketPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const pdfUrl = orderId ? `/tickets/${orderId}.pdf#toolbar=0&navpanes=0&scrollbar=0` : null;

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Pembayaran Berhasil 🎉</h1>
      <p className="mb-2">Terima kasih telah melakukan pembayaran.</p>

      {pdfUrl && (
        <>
          <div className="my-6">
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              className="border rounded"
            />
          </div>
          <a
            href={pdfUrl}
            download={`tiket-${orderId}.pdf`}
            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ⬇️ Unduh Tiket
          </a>
        </>
      )}
    </div>
  );
}

export default TicketPage