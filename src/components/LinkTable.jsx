import { useState } from 'react';
import QRModal from './QRModal';

const LinkTable = ({ data }) => {
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-xl shadow">
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Original URL</th>
            <th className="p-2">Short URL</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Created</th>
            <th className="p-2">Expires</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((link) => (
            <tr key={link._id} className="border-t hover:bg-gray-50">
              <td className="p-2 max-w-xs truncate">{link.originalUrl}</td>
              <td className="p-2 text-blue-600 underline">
                <a href={`http://localhost:5000/${link.shortCode}`} target="_blank" rel="noreferrer">
                  {`/${link.shortCode}`}
                </a>
              </td>
              <td className="p-2">{link.analytics?.length || 0}</td>
              <td className="p-2">{new Date(link.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{link.expirationDate ? new Date(link.expirationDate).toLocaleDateString() : '—'}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleCopy(`http://localhost:5000/${link.shortCode}`)}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    setSelectedLink(`http://localhost:5000/${link.shortCode}`);
                    setQrOpen(true);
                  }}
                  className="bg-blue-200 px-2 py-1 rounded text-sm"
                >
                  QR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {qrOpen && (
        <QRModal
          link={selectedLink}
          onClose={() => {
            setQrOpen(false);
            setSelectedLink('');
          }}
        />
      )}
    </div>
  );
};

export default LinkTable;
