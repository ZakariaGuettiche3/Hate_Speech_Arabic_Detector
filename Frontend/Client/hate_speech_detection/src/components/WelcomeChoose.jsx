// import React from "react";
// import "../Styles/WelcomeChoose.css";

// export default function WelcomeModal({ onContinue, onSignup }) {
//   return (
//     <div className="welcome-overlay">
//       <div className="welcome-modal">
//         <h2>👋 Welcome!</h2>
    
// <p>
//   Create a free account to unlock full access: analyze hate speech across more social media content, get detailed reports, save your history, and more.
// </p>
// <p>
//   You can also continue without signing up, but some features will be limited.
// </p>

//         <div className="welcome-buttons">
//           <button className="signup-btn" onClick={onSignup}>Sign Up</button>
//           <button className="guest-btn" onClick={onContinue}>Continue as Guest</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import "../Styles/WelcomeChoose.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, Sparkles } from "lucide-react";

export default function WelcomeModal({ onContinue, onSignup }) {

    const navigate=useNavigate()
  return (
    <div className="welcome-overlay">
      <motion.div
        className="welcome-modal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="modal-title">
          <Sparkles size={24} style={{ marginRight: "8px" }} />
          Ready to Dive In?
        </h2>
        <p className="modal-highlight">
          <strong>Unlock powerful features</strong> by creating a free account:
        </p>
        <ul className="modal-features">
          <li>🔍  Analyze content from more social media platforms</li>
          <li>📊 Access monthly summaries of hate speech on X (Twitter)</li>
          <li>💾  Save your analysis history</li>
        </ul>
        <p className="modal-secondary">
          Or continue as a guest with limited access.
        </p>
        <div className="welcome-buttons">
          <button className="signup-btn" onClick={()=>navigate("/Login")}>
            <UserPlus size={16} /> Sign Up
          </button>
          <button className="guest-btn" onClick={()=>navigate("/Analyser")}>
            <LogIn size={16} /> Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
}
