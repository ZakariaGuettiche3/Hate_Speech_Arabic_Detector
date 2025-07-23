// import React, { useState } from "react";
// import axios from "axios";
// import "../Styles/HomePage.css";

// const HomePage = () => {
//   const [text, setText] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handlePredict = async () => {
//     if (text.trim() === "") {
//       alert("Veuillez entrer un texte !");
//       return;
//     }
    
//     setLoading(true);
//     try {
      
//       const response = await axios.post("http://localhost:5000/predict", { text });
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error("Erreur lors de la prédiction", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="prediction-box">
//         <h1 className="title">Prédiction de Discours</h1>
//         <textarea
//           className="input-text"
//           placeholder="Entrez votre texte ici..."
//           value={text}
//           onChange={handleTextChange}
//         />
//         <button className="predict-button" onClick={handlePredict} disabled={loading}>
//           {loading ? "Prédiction en cours..." : "Faire une Prédiction"}
//         </button>
//         {prediction && (
//           <div className="result-box">
//             <h2>Prédiction :</h2>
//             <p className={`predict-p ${prediction === "hate" ? 'hate' : ""}`}>{prediction}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       <div className="content">
//         <input type="text" placeholder="Entrez quelque chose..." />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/HomePage.css";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "./HateSpeechDetector.css";



export default function HomePage() {
  
    const [text, setText] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
  
    const handlePredict = async () => {
      if (!text.trim()) return;
      setLoading(true);
      setPrediction(null);
  
      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
  
        const data = await response.json();
        setPrediction(data.prediction);
      } catch (error) {
        console.error("Erreur lors de la prédiction:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const arabicKeys = [
      "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
      "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
      "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ",
    ];
  
    const addKey = (key) => {
      setText((prev) => prev + key);
    };
  
    return (
      <div className="page-container">
        <div className="detector-container">
          {/* <h1 className="title">🔍 Prédiction de Discours</h1> */}
  
          <textarea
            className="text-input"
            rows={3}
            placeholder="اكتب النص هنا..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
  
          <button onClick={handlePredict} className="predict-button">
            {loading ? "Analyse..." : "Predict"}
          </button>
  
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`result-box ${prediction === "hate" ? "hate" : "normal"}`}
            >
              {prediction === "hate" ? "🚨 Discours Haineux détecté" : "✅ Discours Normal"}
            </motion.div>
          )}
  
          {/* <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className="toggle-keyboard-button"
          >
            {showKeyboard ? "Masquer le Clavier Arabe" : "Afficher le Clavier Arabe"}
          </button> */}
  
          {showKeyboard && (
            <div className="keyboard">
              {arabicKeys.map((key, i) => (
                <button
                  key={i}
                  onClick={() => addKey(key)}
                  className="key-button"
                >
                  {key}
                </button>
              ))}
              <button
                onClick={() => setText((prev) => prev.slice(0, -1))}
                className="delete-button"
              >
                ⌫ Effacer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  