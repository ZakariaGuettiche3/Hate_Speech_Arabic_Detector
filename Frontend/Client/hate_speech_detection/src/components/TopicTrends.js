import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { topic: "Politique", count: 120 },
  { topic: "Religion", count: 90 },
  { topic: "Sport", count: 60 },
  { topic: "Économie", count: 40 },
  { topic: "Autre", count: 30 },
];

const TopicTrends = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Sujets les plus mentionnés dans les discours haineux</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#FF5733" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicTrends;
