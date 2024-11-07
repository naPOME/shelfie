import { FaTimes } from 'react-icons/fa';

const BookSummary = ({ onClose, summary }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">Book Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="text-gray-700 text-sm leading-relaxed mb-4 h-72 overflow-y-auto">
          {summary ? (
            <p>{summary}</p>
          ) : (
            <p className="italic text-gray-500">No summary available for this book.</p>
          )}
        </div>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSummary;
