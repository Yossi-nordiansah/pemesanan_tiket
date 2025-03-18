import Link from 'next/link';
import Image from 'next/image';

export default function GuestList({ guests, onDeleteClick }) {
  if (guests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 mb-4">No guests found</p>
        <Link href="/admin/guests/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Your First Guest
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
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {guests.map((guest) => (
            <tr key={guest.id}>
              {/* Logo */}
              <td className="px-6 py-4 whitespace-nowrap">
                {guest.logo ? (
                  <Image 
                    src={`${guest.logo}`} 
                    alt={guest.name}
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Logo</span>
                  </div>
                )}
              </td>

              {/* Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                {guest.name}
              </td>

              {/* Event */}
              <td className="px-6 py-4 whitespace-nowrap">
                {guest.event}
              </td>

              {/* Image */}
              <td className="px-6 py-4 whitespace-nowrap">
                {guest.image ? (
                  <Image 
                    src={`${guest.image}`} 
                    alt={guest.name}
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
              </td>

              {/* Detail Guest */}
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {guest.detail_guest ? guest.detail_guest : '-'}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/admin/guests/edit/${guest.id}`}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeleteClick(guest)}
                  className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-red-600 text-xs font-medium rounded text-red-600 bg-white hover:bg-red-50"
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
