import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noDataFound, setNoDataFound] = useState(false);
  const [winner, setWinner] = useState(null);

  const fetchLeaderboardData = async (reporting_date) => {
    try {
      const response = await axios.post(
        "https://obscure-telegram-q7q67qqp9xp349qw-3001.app.github.dev/api/v1/leaderboarddata",
        { reporting_date }
      );

      if (response.data.length === 0) {
        setData([]);
        setNoDataFound(true);
        setWinner(null);
      } else {
        setData(response.data);
        const allScoresZero = response.data.every(
          (user) => user.final_score === 0
        );

        if (allScoresZero) {
          setNoDataFound(true);
          setWinner(null);
        } else {
          setNoDataFound(false);
          const highestScoreUser = response.data.reduce((prev, current) =>
            prev.final_score > current.final_score ? prev : current
          );
          setWinner(highestScoreUser);
        }
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setData([]);
      setNoDataFound(true);
      setWinner(null);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    fetchLeaderboardData(formattedDate);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    fetchLeaderboardData(formattedDate);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold text-krishna-blue-900 mb-4">
        Leaderboard
      </h1>

      <div className="flex justify-end mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="p-2 border rounded text-sm"
        />
      </div>

      <div className="bg-white p-2 sm:p-4 rounded-lg shadow mb-4 h-[200px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={winner ? [winner] : []}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props;
                return [
                  `Score: ${value}`,
                  `Name: ${payload.name}\nEmail: ${payload.email}`,
                ];
              }}
            />
            <Legend />
            <Bar dataKey="final_score" fill="#82ca9d" name="Final Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {noDataFound && (
        <div className="text-center text-gray-500 mt-4">
          Data not found for the selected date.
        </div>
      )}

      {!noDataFound && (
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Leaderboard Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Email
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data
                  .sort((a, b) => b.final_score - a.final_score)
                  .map((item, index) => (
                    <tr key={item.email}>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 hidden sm:table-cell">
                        {item.name}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.email}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.final_score}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
