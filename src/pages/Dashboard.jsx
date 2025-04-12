import { useEffect, useState } from 'react';
import API from '../api/axios';
import LinkTable from '../components/LinkTable';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await API.get('/links/all');
        setLinks(res.data);
        setFiltered(res.data);
        generateChartData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLinks();
  }, []);

  const generateChartData = (links) => {
    const dataMap = {};

    links.forEach(link => {
      link.analytics?.forEach(click => {
        const date = new Date(click.timestamp).toLocaleDateString();
        if (!dataMap[date]) dataMap[date] = 0;
        dataMap[date]++;
      });
    });

    const result = Object.entries(dataMap).map(([date, clicks]) => ({
      date,
      clicks,
    }));

    setChartData(result);
  };

  useEffect(() => {
    const results = links.filter(link =>
      link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
      link.shortCode.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
    setPage(1);
  }, [search, links]);

  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        <input
          type="text"
          placeholder="Search by URL or alias"
          className="border px-3 py-2 rounded-lg w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <LinkTable data={paginatedData} />

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Clicks Over Time</h2>
        <div className="bg-white p-4 rounded-xl shadow w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
