import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const allData = [
  { date: "2025-03-01", count: 50 },
  { date: "2025-03-02", count: 80 },
  { date: "2025-03-03", count: 120 },
  { date: "2025-03-04", count: 90 },
  { date: "2025-03-05", count: 150 },
  { date: "2025-03-10", count: 200 },
  { date: "2025-03-15", count: 180 },
  { date: "2025-04-01", count: 300 },
];

const HateSpeechTrends = () => {
  const [filter, setFilter] = useState("week");

  // Fonction pour filtrer les données
  const filterData = () => {
    const now = new Date("2025-04-01"); // Remplacer par la date actuelle dynamique
    let filtered = allData;

    if (filter === "week") {
      filtered = allData.filter(d => new Date(d.date) >= new Date(now.setDate(now.getDate() - 7)));
    } else if (filter === "month") {
      filtered = allData.filter(d => new Date(d.date) >= new Date(now.setMonth(now.getMonth() - 1)));
    } else if (filter === "year") {
      filtered = allData.filter(d => new Date(d.date) >= new Date(now.setFullYear(now.getFullYear() - 1)));
    }
    
    return filtered;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Évolution des discours haineux</h2>
      
      {/* Sélecteur de période */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: "10px", padding: "5px" }}>
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
        <option value="year">Année</option>
      </select>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filterData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#FF0000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HateSpeechTrends;
