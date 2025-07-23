// import React, { useState } from "react";
// import "./Analyser.css";
// import { motion } from "framer-motion";

// export default function Analyser() {
//   const [text, setText] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAnalyse = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     setPrediction(null);

//     // Simule une requête
//     setTimeout(() => {
//       const isHate = text.includes("haine") || text.length % 2 === 0;
//       setPrediction(isHate ? "hate" : "normal");
//       setLoading(false);
//     }, 1500);
//   };

//   const resetText = () => {
//     setText("");
//     setPrediction(null);
//   };

//   return (
//     <div className="analyser-container">
//       <h1 className="title">🧠 Analyse de Discours</h1>
//       <p className="description">Entrez un texte ci-dessous pour détecter s'il contient un discours haineux.</p>

//       <textarea
//         className="text-area"
//         placeholder="Tapez votre texte ici..."
//         rows={6}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>

//       <div className="actions">
//         <span className="char-count">{text.length} caractères</span>
//         <button className="reset-btn" onClick={resetText}>Effacer</button>
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           className="analyse-btn"
//           onClick={handleAnalyse}
//           disabled={loading}
//         >
//           {loading ? "Analyse en cours..." : "Analyser le texte"}
//         </motion.button>
//       </div>

//       {prediction && (
//         <motion.div
//           className={`result-box ${prediction}`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {prediction === "hate"
//             ? "🚨 Ce texte contient potentiellement un discours haineux."
//             : "✅ Aucun discours haineux détecté."}
//         </motion.div>
//       )}

//       <div className="tips-box">
//         <h3>📝 Conseils d’utilisation :</h3>
//         <ul>
//           <li>Utilisez un texte suffisamment long pour une meilleure détection.</li>
//           <li>Évitez les abréviations ou le langage cryptique.</li>
//           <li>Les textes doivent être en français ou en arabe.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "./Analyser.css";

// export default function Analyser() {
//   const [text, setText] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showKeyboard, setShowKeyboard] = useState(false);

//   const handlePredict = async () => {
//     if (!text.trim()) return;
//     setLoading(true);
//     setPrediction(null);

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       const data = await response.json();
//       setPrediction(data.prediction);
//     } catch (error) {
//       console.error("Prediction error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const arabicKeys = [
//     "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
//     "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
//     "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ",
//   ];

//   const addKey = (key) => setText((prev) => prev + key);

//   return (
//     <div className="analyser-container">
//       <h2 className="analyser-title">🧠 Hate Speech Detector</h2>
//       <p className="analyser-description">
//         Enter a text in Arabic to analyze whether it contains hate speech.
//       </p>

//       <textarea
//         className="analyser-textarea"
//         rows={4}
//         placeholder="اكتب النص العربي هنا..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>

//       <div className="analyser-actions">
//         <button onClick={handlePredict} className="analyser-button">
//           {loading ? "Analyzing..." : "Analyze"}
//         </button>
//         {/* <button onClick={() => setShowKeyboard(!showKeyboard)} className="keyboard-toggle">
//           {showKeyboard ? "Hide Arabic Keyboard" : "Show Arabic Keyboard"}
//         </button> */}
//       </div>

//       {showKeyboard && (
//         <div className="arabic-keyboard">
//           {arabicKeys.map((key, i) => (
//             <button key={i} onClick={() => addKey(key)} className="key">
//               {key}
//             </button>
//           ))}
//           <button onClick={() => setText((prev) => prev.slice(0, -1))} className="delete-key">
//             ⌫
//           </button>
//         </div>
//       )}

//       {prediction && (
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`prediction-box ${prediction === "hate" ? "hate" : "normal"}`}
//         >
//           {prediction === "hate"
//             ? "🚨 Hate speech detected"
//             : "✅ The text appears to be normal"}
//         </motion.div>
//       )}

//       <div className="analyser-guidelines">
//         <h4>   Guidelines:</h4>
//         <ul>
//           <li>Use a complete and meaningful sentence in Arabic.</li>
//           <li>Avoid abbreviations or encrypted/slang writing.</li>
//           <li>Ensure clarity for better detection accuracy.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Analyser.css";
import axios from 'axios';
import Navbar from "./Navbar";
import Cookies from 'js-cookie';

export default function Analyser({nav}) {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [language, setLanguage] = useState("en"); // "ar" or "en"
  const [hatePercentage, setHatePercentage] = useState(null);
  const [ishate,setIsHate] = useState()
  const [hateType,sethateType] = useState()


  const translations = {
    ar: {
      title: "🧠 كاشف خطاب الكراهية",
      description: "أدخل نصًا باللغة العربية لتحليل ما إذا كان يحتوي على خطاب كراهية.",
      placeholder: "اكتب النص العربي هنا...",
      analyze: "تحليل",
      analyzing: "جاري التحليل...",
      showKeyboard: "إظهار لوحة المفاتيح",
      hideKeyboard: "إخفاء لوحة المفاتيح",
      hate: "🚨 تم الكشف عن خطاب كراهية",
      normal: "✅ النص لا يحتوي على خطاب كراهية",
      guidelinesTitle: "إرشادات الاستخدام:",
      guidelines: [
        "استخدم جملة كاملة ومفهومة باللغة العربية.",
        "تجنب الاختصارات أو الكتابة بلغة مشفرة أو عامية.",
        "احرص على وضوح النص للحصول على نتائج دقيقة.",
      ],
      switch: "English",
    },
    en: {
      title: "🧠 Hate Speech Detector",
      description: "Enter a text in Arabic to analyze whether it contains hate speech.",
      placeholder: "Write Arabic text here ...",
      analyze: "Analyze Text",
      analyzing: "Analyzing...",
      showKeyboard: "Show Arabic Keyboard",
      hideKeyboard: "Hide Keyboard",
      hate: "🚨 Hate speech detected",
      normal: "✅ The text appears to be normal",
      guidelinesTitle: "Guidelines:",
      guidelines: [
        "Use a complete and meaningful sentence in Arabic.",
        "Avoid abbreviations or encrypted/slang writing.",
        "Ensure clarity for better detection accuracy.",
      ],
      switch: "العربية",
    },
  };

  const t = translations[language];
  const myValue = Cookies.get('id');
  const token = Cookies.get('token'); 

  const isArabicText = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/g;
    const matches = text.match(arabicRegex);
    return matches && matches.length >= 5; // Exiger au moins 5 lettres arabes
  };
  

  const handlePredict = async () => {
    if (!text.trim()) return;
  
    if (!isArabicText(text)) {
      alert(
        language === "ar"
          ? "يرجى إدخال نص يحتوي على أحرف عربية."
          : "Please enter a text that contains Arabic letters."
      );
      return;
    }
  
    setLoading(true);
    setPrediction(null);
  
    axios.post("http://127.0.0.1:8000/predecte/", { text: text })
    .then(response => {
      
      const data = response.data;
      
      setPrediction(data.prediction);
      console.log("prediction :", data.prediction);
  
      const isHate = data.prediction === 'hate';
      setIsHate(isHate);
      if (!isHate) {
        
        const date = new Date().toISOString();
        console.log(myValue)
        console.log(text)
        console.log(date)
        return axios.post(
          'http://127.0.0.1:8000/historique/',
          {
          author_id: myValue,
          text: text,
          created_at: date,
          is_hate: false,
          categories: "NON"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true
          }
        );
      }
  
      // D'abord envoyer vers categories
      return axios.post("http://127.0.0.1:8000/categories/", { text: text });
    })
    .then(responseCategories => {
      const date = new Date().toISOString();
      // Une fois categories récupéré, maintenant appeler historique
     
      sethateType(responseCategories.data.prediction);
  
      return axios.post(
        'http://127.0.0.1:8000/historique/',
        {
          author_id: myValue,
          text: text,
          created_at: date,
          is_hate: ishate,
          categories: hateType
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
    })
    .then(responseHistorique => {
      console.log("Historique response :", responseHistorique.data);
    })
    .catch(error => {
      console.error("Erreur :", error);
    })
    .finally(() => {
      setLoading(false);
    });
  
   
   
  
  };




  // const handlePredict = async () => {
  //   if (!text.trim()) return;
  
  //   if (!isArabicText(text)) {
  //     alert(language === "ar"
  //       ? "يرجى إدخال نص يحتوي على أحرف عربية."
  //       : "Please enter a text that contains Arabic letters.");
  //     return;
  //   }
  
  //   setLoading(true);
  //   setPrediction(null);
  //   setHatePercentage(null);
  
  //   const phrases = splitTextIntoPhrases(text);
  //   let hateCount = 0;
  
  //   for (const phrase of phrases) {
  //     try {
  //       const response = await fetch("http://localhost:5000/predict", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ text: phrase }),
  //       });
  
  //       const data = await response.json();
  //       if (data.prediction === "hate") hateCount++;
  //     } catch (error) {
  //       console.error("Prediction error:", error);
  //     }
  //   }
  
  //   const percent = Math.round((hateCount / phrases.length) * 100);
  //   setHatePercentage(percent);
  //   setPrediction(hateCount > 0 ? "hate" : "normal");
  //   setLoading(false);
  // };
  

  // const splitTextIntoPhrases = (text) => {
  //   return text
  //     .split(/[,.،]+/)
  //     .map(p => p.trim())
  //     .filter(p => p.length > 0);
  // };
  
  

  const arabicKeys = [
    "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
    "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
    "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ",
  ];

  const addKey = (key) => setText((prev) => prev + key);

  return (
    <>{nav && <Navbar></Navbar>}
    <section className="analyser-section">
    <div className="analyser-container" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="analyser-header">
        <h2 className="analyser-title">{t.title}</h2>
        {/* <button onClick={() => setLanguage(language === "ar" ? "en" : "ar")} className="language-switch">
          {t.switch}
        </button> */}
      </div>

      <p className="analyser-description">{t.description}</p>

      <textarea
        className="analyser-textarea"
        rows={4}
        placeholder={t.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="analyser-actions">
        <button onClick={handlePredict} disabled={!text.length} className="analyser-button">
          {loading ? t.analyzing : t.analyze}
        </button>
        {/* <button onClick={() => setShowKeyboard(!showKeyboard)} className="keyboard-toggle">
          {showKeyboard ? t.hideKeyboard : t.showKeyboard}
        </button> */}
      </div>

      {showKeyboard && (
        <div className="arabic-keyboard">
          {arabicKeys.map((key, i) => (
            <button key={i} onClick={() => addKey(key)} className="key">
              {key}
            </button>
          ))}
          <button onClick={() => setText((prev) => prev.slice(0, -1))} className="delete-key">
            ⌫
          </button>
        </div>
      )}

{prediction && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className={`prediction-box ${prediction === "hate" ? "hate" : "normal"}`}
  >
    {prediction === "hate" ? (
      <>
        {t.hate}
        {hateType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`hate-type-badge ${hateType}`}
          >
            🏷 {hateType.replace("_", " ").toUpperCase()}
          </motion.div>
        )}
      </>
    ) : (
      t.normal
    )}
  </motion.div>
)}

      {!prediction && (<div className="analyser-guidelines">
        <h4>{t.guidelinesTitle}</h4>
        <ul>
          {t.guidelines.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>)}

      {hatePercentage !== null && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="circle-percentage"
  >
    <div
      className="circle"
      style={{
        background: `conic-gradient(
          ${hatePercentage > 50 ? "#e74c3c" : "#27ae60"} ${hatePercentage}%,
          #ccc ${hatePercentage}%
        )`,
      }}
    >
      <span className="percentage-text">{hatePercentage}%</span>
    </div>
    {/* <p>{hatePercentage > 50 ? "Hate speech detected" : "Mostly safe"}</p> */}
  </motion.div>
)}

    </div>
    </section></>
  );
}
