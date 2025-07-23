import "../Styles/History.css";

import React, { useState,useEffect } from "react";
import "../Styles/History.css";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Cookies from 'js-cookie';
import axios from 'axios';

const sampleHistory = [
  { id: 1, text: "هذا النص يتضمن خطاب كراهية", date: "2025-04-20", prediction: "Hate Speech" },
  { id: 2, text: "مرحباً بكم جميعاً في المنصة", date: "2025-04-21", prediction: "Normal" },
  { id: 3, text: "كل الناس سواسية لا فرق بينهم", date: "2025-04-22", prediction: "Normal" },
  { id: 4, text: "اذهب إلى الجحيم!", date: "2025-04-22", prediction: "Hate Speech" },
];



const History = () => {
  const [history, setHistory] = useState(sampleHistory);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteEntry = (id) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/historiqueget/', {
          id: Cookies.get('id')
        });
        setData(response.data);
        setHistory(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du fetch :', error);
        setLoading(false);
      }
    };
  
    fetchData();
  },[]); 
  
  return (
    <div className="history-container">
      <h2><FaRegClock /> User History</h2>
      {history.length === 0 ? (
        <p className="empty">No history available yet.</p>
      ) : (
        <ul className="history-list">
          {data.map(entry => (
            <li key={entry.id} className="history-item">
              <div className="text-block">
                <p className="text">{entry.text}</p>
                 <div className="history-category">
                 <span className={`prediction ${entry.is_hate == true ? "hate" : "normal"}`}>
                 {entry.is_hate ? <span>hate</span> : <span>normal</span>}
                </span>
              {entry.is_hate== true &&  <span className="prediction-category">
                
                  {entry.categories}
                </span>}
                 </div>
                
              </div>
              <div className="meta">
                <span className="date">{entry.created_at}</span>
                <button onClick={async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          'http://127.0.0.1:8000/historiquedelete/', 
          {
              "id": entry.id,
            }
      );
      
      if (response.status === 200) {
              console.log(response.data)
      } 
  } catch (error) {
      
      console.error(error.response.data.detail);
  }
  
  }} title="Delete">
                  <MdOutlineDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
