export default function DeleteConfirmation({ item, itemType, onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this {itemType}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }