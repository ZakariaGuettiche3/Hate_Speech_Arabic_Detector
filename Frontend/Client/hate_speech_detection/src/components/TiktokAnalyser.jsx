import React, { useState } from "react";
import "./TiktokAnalyser.css";
import axios from 'axios';

// const TiktokAnalyzer = () => {
//   const [link, setLink] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleAnalyze = async () => {
//     if (!link.trim()) return;
//     setLoading(true);
//     setResult(null);

//     try {
//       // Simulate an API call – replace this with your actual logic
//       setTimeout(() => {
//         setResult({
//           commentsAnalyzed: 156,
//           hateDetected: 23,
//           hateRate: "14.7%",
//         });
//         setLoading(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Analysis failed", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="tiktok-analyzer-container">
//       <h2 className="title">🎵 TikTok Comment Analyzer</h2>

//       <input
//         type="text"
//         className="input"
//         placeholder="Paste a TikTok video link here..."
//         value={link}
//         onChange={(e) => setLink(e.target.value)}
//       />

//       <input
//         type="text"
//         className="input"
//         placeholder="..."
//         // value={link}
//         // onChange={(e) => setLink(e.target.value)}
//       />

//       <button className="analyze-button" onClick={handleAnalyze}>
//         {loading ? "Analyzing..." : "Analyze Comments"}
//       </button>

//       <div className="analyser-guidelines">
//         <h4> Guidelines :</h4>
//         <ul>
//           <li>Use a <strong>public</strong> TikTok video link.</li>
//           <li>Ensure the video has <strong>comments</strong>.</li>
//           <li>Comments should be written in <strong>Arabic</strong>.</li>
//           <li>Avoid <strong>Arabizi</strong>, slang, or cryptic abbreviations.</li>
//           <li>Do not submit the same link multiple times in a row.</li>
//         </ul>
//       </div>

//       {result && (
//         <div className="result-box">
//           <h4>📊 Analysis Result:</h4>
//           <p><strong>Total Comments Analyzed:</strong> {result.commentsAnalyzed}</p>
//           <p><strong>Hateful Comments:</strong> {result.hateDetected}</p>
//           <p><strong>Hate Rate:</strong> {result.hateRate}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TiktokAnalyzer;


// import React, { useState } from "react";
// import "./TiktokAnalyzer.css";

const TiktokAnalyzer = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [info, setinfo] = useState("");
  const [final, setfinal] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    console.log(link);
    try {
        await axios.post(
            'http://127.0.0.1:8000/TikTok/', 
            {
                "st": info,
                "url": link
              }
        ).then(reponse => {
          setResult(reponse.data.comment)
          console.log(reponse.data.comment)
          return axios.post("http://127.0.0.1:8000/alltiktoke/", { text: reponse.data.comment });
        }).then(response2 => {
          setfinal(response2.data.prediction)
               console.log(response2.data.prediction)
        }
               
        ).catch(error => {
          console.error("Erreur :", error);
        })
        .finally(() => {
          console.log('za')
          console.log(final)
        });;
       
    } catch (error) {
        

        console.error('Login failed:', error);
    }
};

  const dummyComments = [
    { text: "هذا تعليق سلبي", hate: "Yes", category: "Racism" },
    { text: "هذا تعليق جيد", hate: "No", category: "-" },
    { text: "كلام يحض على العنف", hate: "Yes", category: "Violence" },
    // Ajoute autant de données fictives que tu veux
  ];

  const handleAnalyze = async () => {
    if (!link.trim()) return;
    setLoading(true);
    setResult(null);
    setShowDetails(false);

    try {
      // Simulate an API call – replace this with your actual logic
      setTimeout(() => {
        setResult({
          commentsAnalyzed: 156,
          hateDetected: 23,
          hateRate: 14.7, // Change to number instead of string
          comments: dummyComments,
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Analysis failed", error);
      setLoading(false);
    }
  };

  return (
    <div className="tiktok-analyzer-container">
      <h2 className="title">🎵 TikTok Comment Analyzer</h2>

      <input
        type="text"
        className="input"
        placeholder="Paste a TikTok video link here..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="..."
        onChange={(e) => setinfo(e.target.value)}
      />

      <button className="analyze-button" onClick={handleSubmit}>
        {loading ? "Analyzing..." : "Analyze Comments"}
      </button>

    {!final &&  <div className="analyser-guidelines">
        <h4>Guidelines :</h4>
        <ul>
          <li>Use a <strong>public</strong> TikTok video link.</li>
          <li>Ensure the video has <strong>comments</strong>.</li>
          <li>Comments should be written in <strong>Arabic</strong>.</li>
          <li>Avoid <strong>Arabizi</strong>, slang, or cryptic abbreviations.</li>
          <li>Do not submit the same link multiple times in a row.</li>
        </ul>
      </div>}

      {final && (
        <div className="result-section">
          

          

          {final && (
            <div className="details-table">
              <table>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>Hate</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {final.map((comment, index) => (
                    <tr key={index}>
                      <td>{comment.text}</td>
                      <td>{comment.ishate}</td>
                      <td>{comment.categories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TiktokAnalyzer;
