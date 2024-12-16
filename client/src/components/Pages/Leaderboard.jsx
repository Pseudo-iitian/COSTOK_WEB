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
  const [data, setData] = useState([]); // State to store leaderboard data
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for calendar input
  const [noDataFound, setNoDataFound] = useState(false); // State for no data condition
  const [winner, setWinner] = useState(null); // State for winner (highest score)

  // Fetch leaderboard data
  const fetchLeaderboardData = async (reporting_date) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/leaderboarddata",
        {
          reporting_date,
        }
      );

      if (response.data.length === 0) {
        setData([]);
        setNoDataFound(true); // No data found for the selected date
        setWinner(null); // Reset winner
      } else {
        setData(response.data);
        const allScoresZero = response.data.every(
          (user) => user.final_score === 0
        ); // Check if all final scores are 0

        if (allScoresZero) {
          setNoDataFound(true); // Show "Data not found" if all scores are 0
          setWinner(null); // Reset winner
        } else {
          setNoDataFound(false); // Data exists with non-zero scores

          // Find the winner (highest final_score)
          const highestScoreUser = response.data.reduce((prev, current) =>
            prev.final_score > current.final_score ? prev : current
          );
          setWinner(highestScoreUser); // Set winner based on highest score
        }
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setData([]);
      setNoDataFound(true); // Handle error case by showing "No data found"
      setWinner(null); // Reset winner
    }
  };

  // Handle date change and fetch data
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    fetchLeaderboardData(formattedDate);
  };

  // Automatically fetch data for today's date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    fetchLeaderboardData(formattedDate); // Fetch today's data
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-krishna-blue-900 mb-6">
        Leaderboard
      </h1>

      {/* Calendar Input */}
      <div className="flex justify-end mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="p-2 border rounded"
        />
      </div>

      {/* Bar Chart - Only showing the highest score user */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={winner ? [winner] : []}>
            {" "}
            {/* Show only the winner */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* Name of the winner */}
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                const { payload } = props; // Access the full data for the hovered bar
                return [
                  `Score: ${value}`,
                  `Name: ${payload.name}\nEmail: ${payload.email}`, // Removed username
                ];
              }}
            />
            <Legend />
            <Bar dataKey="final_score" fill="#82ca9d" name="Final Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* No Data Found Message for Bar Chart */}
      {noDataFound && (
        <div className="text-center text-gray-500 mt-4">
          Data not found for the selected date.
        </div>
      )}

      {/* Table - Render all data */}
      {!noDataFound && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Leaderboard Table</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sr. No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Final Score
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => b.final_score - a.final_score) // Sort by final_score in descending order
                .map((item, index) => (
                  <tr key={item.email} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.final_score}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Data Found Message for Table */}
      {noDataFound && (
        <div className="text-center text-gray-500 mt-4">
          Data not found for the selected date.
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
