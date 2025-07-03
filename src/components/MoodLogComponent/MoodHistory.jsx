import { useEffect, useState } from 'react';
import API from '../../Apis';
import moment from 'moment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaSmile, FaClipboardList, FaClock } from 'react-icons/fa';
import { API_ROUTES } from '../../constants/apiRoutes';

const MoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const res = await API.get(API_ROUTES.MOOD_HISTORY);
        setMoodHistory(res.data.moodHistory || []);
      } catch (err) {
        setError('Could not load mood history.');
      } finally {
        setLoading(false);
      }
    };
    fetchMoodHistory();
  }, []);

  const filteredLogs =
    filter === 'All' ? moodHistory : moodHistory.filter((log) => log.mood === filter);

  const moodOptions = ['All', ...new Set(moodHistory.map((log) => log.mood))];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Mood History', 14, 16);
    const tableData = filteredLogs.map((log) => [
      log.mood,
      moment(log.createdAt).format('MMMM Do YYYY, h:mm a'),
      log.note || '—',
      log.suggestions.map((s) => s.name).join(', '),
    ]);
    autoTable(doc, {
      head: [['Mood', 'Date', 'Note', 'Suggestions']],
      body: tableData,
      startY: 20,
    });
    doc.save('mood-history.pdf');
  };

  const mostFrequentMood = () => {
    const moodCount = {};
    moodHistory.forEach((log) => {
      moodCount[log.mood] = (moodCount[log.mood] || 0) + 1;
    });
    return Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#660e60] mb-8">
          Mood History
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
            <FaClipboardList className="text-[#ac6f82] text-2xl" />
            <div>
              <p className="text-sm text-[#893f71]">Total Logs</p>
              <p className="text-lg font-semibold text-[#660e60]">{moodHistory.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
            <FaSmile className="text-[#cfa093] text-2xl" />
            <div>
              <p className="text-sm text-[#893f71]">Most Frequent Mood</p>
              <p className="text-lg font-semibold text-[#660e60]">{mostFrequentMood()}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
            <FaClock className="text-[#660e60] text-2xl" />
            <div>
              <p className="text-sm text-[#893f71]">Last Logged</p>
              <p className="text-lg font-semibold text-[#660e60]">
                {moodHistory[0] ? moment(moodHistory[0].createdAt).fromNow() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Export */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md bg-[#f3d0a4] text-[#660e60] font-semibold"
          >
            {moodOptions.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>

          <button
            onClick={exportPDF}
            className="px-4 py-2 bg-[#660e60] text-white rounded-md hover:bg-[#893f71] transition"
          >
            Export as PDF
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto shadow rounded-lg">
          {loading ? (
            <p className="text-center text-[#893f71]">Loading mood history...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredLogs.length === 0 ? (
            <p className="text-center text-[#660e60]">No logs available.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-[#893f71] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Mood</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-left">Suggestions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr
                    key={log._id}
                    className={index % 2 === 0 ? 'bg-[#fcf9f4]' : 'bg-[#fdf3e7]'}
                  >
                    <td className="px-4 py-3 font-semibold text-[#660e60]">{log.mood}</td>
                    <td className="px-4 py-3 text-[#893f71]">
                      {moment(log.createdAt).format('MMMM Do YYYY, h:mm a')}
                    </td>
                    <td className="px-4 py-3 italic text-[#cfa093]">
                      {log.note || '—'}
                    </td>
                    <td className="px-4 py-3">
                      {log.suggestions.length > 0 ? (
                        log.suggestions.map((s, idx) => (
                          <div key={idx}>
                            <span className="font-semibold text-[#481D39]">{s.name}</span>
                            {s.description && (
                              <span className="text-xs text-gray-500"> — {s.description}</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400">No suggestions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
