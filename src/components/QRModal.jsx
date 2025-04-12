import QRCode from 'react-qr-code';

const QRModal = ({ link, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center relative">
        <h2 className="text-xl font-bold mb-4">QR Code</h2>
        <QRCode value={link} size={200} />
        <p className="mt-2 break-all text-sm">{link}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRModal;
