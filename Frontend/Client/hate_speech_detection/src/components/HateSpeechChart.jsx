import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./HateSpeechChart.css";

const data = [
  { week: "January", tweets: 300, hate: 45 },
  { week: "February", tweets: 400, hate: 78 },
  { week: "March", tweets: 500, hate: 120 },
  { week: "April", tweets: 550, hate: 90 },
];

const HateSpeechChart = () => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Monthly Hate Speech Detection</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="tweets"
            stroke="#8884d8"
            fill="#8884d8"
            name="Tweets Analyzed"
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="hate"
            stroke="#ff4d4f"
            fill="#ff4d4f"
            name="Hate Speech Detected"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HateSpeechChart;
