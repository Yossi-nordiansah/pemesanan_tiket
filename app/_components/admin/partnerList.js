import Link from 'next/link';
import Image from 'next/image';

export default function PartnerList({ partners, onDeleteClick }) {
  if (partners.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 mb-4">No partners found</p>
        <Link href="/admin/partners/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Your First Partner
          </button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Logo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Partner Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ref Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {partners.map((partner) => (
            <tr key={partner.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {partner.logo ? (
                  <Image 
                    src={`/admin/partner/logo/${partner.logo}`} 
                    alt={partner.partner_name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No logo</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {partner.partner_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {partner.ref_code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {partner.disc}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {partner.owner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/admin/partners/edit/${partner.id}`}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeleteClick(partner)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}