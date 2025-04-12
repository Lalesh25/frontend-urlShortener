import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateLink = () => {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/links/create', { originalUrl: longUrl, alias, expirationDate });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Error creating link. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Short Link</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={alias}
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          type="date"
          value={expirationDate}
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 rounded-lg ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Link'}
        </button>
      </form>
    </div>
  );
};

export default CreateLink;
