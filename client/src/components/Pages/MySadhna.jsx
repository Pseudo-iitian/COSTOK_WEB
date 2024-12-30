import { useEffect, useState } from "react";
import axios from "axios"; // For API calls
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

const MySadhana = () => {
  const [data, setData] = useState([]); // State to store the chart data

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchSadhanaData = async () => {
      try {
        const response = await axios.get(
          "https://obscure-telegram-q7q67qqp9xp349qw-3001.app.github.dev/api/v1/getmysadhna"
        ); // Replace with your API endpoint
        const apiData = response.data;

        // Transform API data into the format expected by Recharts
        const formattedData = apiData.map((item) => {
          const formattedDate = new Date(
            item.reporting_date
          ).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          });
          return {
            date: formattedDate, // Use formatted date for the X-axis
            score: item.final_score, // Use final_score for the Y-axis
          };
        });

        setData(formattedData); // Update state with formatted data
      } catch (error) {
        console.error("Error fetching Sadhana data:", error);
      }
    };

    fetchSadhanaData();
  }, []); // Run this only once when the component mounts

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-krishna-blue-900 mb-6">
        My Sadhana
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" name="Daily Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MySadhana;
