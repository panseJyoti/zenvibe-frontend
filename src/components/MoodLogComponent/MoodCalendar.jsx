import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './calendarCustom.css';
import API from "../../Apis";
import { API_ROUTES } from "../../constants/apiRoutes";

function formatDate(date) {
  const [year, month, day] = date.toLocaleDateString("en-CA").split("-");
  return `${year}-${month}-${day}`;
}

const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodData, setMoodData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(API_ROUTES.MOOD_BY_DATE)
      .then((res) => {
        setMoodData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mood data:", err);
        setLoading(false);
      });
  }, []);

  const selectedKey = formatDate(selectedDate);
  const moods = moodData[selectedKey] || [];

  return (
    <div className="right-4 top-20 w-80 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg z-50">
      <h1 className="text-xl font-bold text-[#660e60] text-center mb-2">Mood Calendar</h1>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => {
          const key = formatDate(date);
          if (!moodData[key]) return null;
          return selectedKey === key ? 'selected-date' : 'mood-date';
        }}
        showNeighboringMonth={false}
        className="rounded-md border-none"
      />

      <div className="mt-4 bg-gradient-to-br from-[#fceee0] to-white dark:from-gray-800 dark:to-gray-900 p-3 rounded-xl shadow-inner">
        <h2 className="text-md font-semibold text-[#893f71] dark:text-[#f3d0a4] mb-2 text-center">
          {selectedDate.toDateString()}
        </h2>

        {loading ? (
          <p className="text-gray-500 text-sm text-center">Loading...</p>
        ) : moods.length > 0 ? (
          <ul className="space-y-2 max-h-40 overflow-y-auto custom-scroll">
            {moods.map((entry, index) => (
              <li
                key={index}
                className="bg-[#f3d0a4] border-l-4 border-[#660e60] pl-3 py-2 px-2 rounded-md shadow-sm hover:bg-[#fdeacc] transition-all duration-300"
              >
                <p className="text-sm font-medium text-[#660e60]">
                  {entry.time} — {entry.mood}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-sm text-center">No mood logged.</p>
        )}
      </div>
    </div>
  );
};

export default MoodCalendar;
