import { useEffect, useState } from 'react';
import API from '../../Apis';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { API_ROUTES } from '../../constants/apiRoutes';

const getRandomDarkColor = (usedHues) => {
  let hue;
  do {
    hue = Math.floor(Math.random() * 360);
  } while (usedHues.has(hue));
  usedHues.add(hue);
  return `hsl(${hue}, 80%, 35%)`;
};

const MoodAnalyticsChart = () => {
  const [analytics, setAnalytics] = useState([]);
  const [moodColorMap, setMoodColorMap] = useState({});
  const [selectedMood, setSelectedMood] = useState('');
  const [summaryStats, setSummaryStats] = useState({
    totalEntries: 0,
    mostLoggedMood: 'None',
    weeksTracked: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get(API_ROUTES.MOOD_ANALYTICS);
        const analyticsData = res?.data?.analytics || [];
        const formatted = formatChartData(analyticsData);

        const moodCountMap = {};
        let total = 0;
        const uniqueMoods = new Set();

        analyticsData.forEach((week) => {
          week.moods.forEach((m) => {
            const mood = capitalize(m.mood);
            uniqueMoods.add(mood);
            total += m.count;
            moodCountMap[mood] = (moodCountMap[mood] || 0) + m.count;
          });
        });

        const usedHues = new Set();
        const moodColors = {};
        uniqueMoods.forEach((mood) => {
          moodColors[mood] = getRandomDarkColor(usedHues);
        });

        const mostLogged = Object.entries(moodCountMap).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] || 'None';

        setMoodColorMap(moodColors);
        setAnalytics(formatted);
        setSelectedMood(Array.from(uniqueMoods)[0] || '');
        setSummaryStats({
          totalEntries: total,
          mostLoggedMood: mostLogged,
          weeksTracked: analyticsData.length,
        });
      } catch (err) {
        console.error("Error fetching mood analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatChartData = (data = []) => {
    return data.map((weekData) => {
      const weekEntry = { week: `W${weekData._id}` };
      weekData.moods.forEach((m) => {
        const mood = capitalize(m.mood);
        weekEntry[mood] = m.count;
      });
      return weekEntry;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#660e60] mb-6 text-center">
        Mood Analytics Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#ac6f82] text-white p-6 rounded-xl shadow transition transform hover:scale-105 hover:shadow-lg">
          <p className="text-sm tracking-wide">Total Mood Entries</p>
          <h3 className="text-2xl font-bold mt-1">{summaryStats.totalEntries}</h3>
        </div>
        <div className="bg-[#893f71] text-white p-6 rounded-xl shadow transition transform hover:scale-105 hover:shadow-lg">
          <p className="text-sm tracking-wide">Most Logged Mood</p>
          <h3 className="text-2xl font-bold mt-1">{summaryStats.mostLoggedMood}</h3>
        </div>
        <div className="bg-[#cfa093] text-white p-6 rounded-xl shadow transition transform hover:scale-105 hover:shadow-lg">
          <p className="text-sm tracking-wide">Weeks Tracked</p>
          <h3 className="text-2xl font-bold mt-1">{summaryStats.weeksTracked}</h3>
        </div>
      </div>

      {/* Top Section: Line Chart + Mood Legend */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Line Chart */}
        <div className="w-full md:w-3/4 bg-white p-4 rounded-xl border border-[#ac6f82] shadow h-[300px] overflow-x-auto transition hover:shadow-md">
          <h3 className="text-md font-semibold text-[#893f71] text-center mb-3">
            Weekly Mood Trends (Line Chart)
          </h3>
          {selectedMood && (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={analytics}>
                <XAxis dataKey="week" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={selectedMood}
                  stroke={moodColorMap[selectedMood] || '#893f71'}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Mood Legend */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-xl border border-[#ac6f82] shadow overflow-y-auto max-h-[300px] transition hover:shadow-md">
          <h3 className="font-semibold text-[#660e60] mb-2 text-center">Mood Colors</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(moodColorMap).map(([mood, color]) => (
              <button
                key={mood}
                className={`flex items-center gap-2 text-left text-sm p-2 rounded-md transition ${
                  selectedMood === mood ? 'bg-[#f3d0a4]' : ''
                } hover:bg-[#f3d0a4]/60`}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                <span className="text-[#660e60]">{mood}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl border border-[#ac6f82] shadow transition hover:shadow-md overflow-x-auto">
        <h3 className="text-md font-semibold text-[#893f71] text-center mb-3">
          Weekly Mood Trends (Bar Chart)
        </h3>
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.entries(moodColorMap).map(([mood, color]) => (
                <Bar key={mood} dataKey={mood} fill={color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalyticsChart;
