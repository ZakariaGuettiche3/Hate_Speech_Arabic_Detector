// import React, { useState } from "react";
// import "../Styles/SocialStats.css";
// import { AiFillTikTok } from "react-icons/ai";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import { IoStatsChart } from "react-icons/io5";
// import { FaYoutube } from "react-icons/fa";
// const SocialStats = () => {
//     const [activeTab, setActiveTab] = useState("X (Twitter)");
//     const [selectedSideBtn, setSelectedSideBtn] = useState("General")
//     const [selectedPeriod, setSelectedPeriod] = useState("4 dernières semaines");
//     const periods = [
//         "4 dernières semaines", "Août 2024", "Juillet 2024", "Juin 2024", "Mai 2024", "Avril 2024", "Mars 2024"
//     ];
//     const tab = ['X (Twitter)', 'Tiktok', 'Youtube'];

//     return (
//         <section className="dash-section">
//             <div className="dash-sidebar">

//                     <div className="dash-sidebar-list">

//                     </div>

//                 </div>

//             <div className="dash-container">
//                 <nav className="navbar_tyt">
//                     {/* {tab.map(tab => (
//                     <button
//                         key={tab}
//                         className={`tab ${activeTab === tab ? 'active' : ''}`}
//                         onClick={() => setActiveTab(tab)}
//                     >

//                         <FaSquareXTwitter color="black" size={30} />
//                         {tab}
//                     </button>
//                 ))} */}

//                     <div className="navbar-container">

//                         <button
//                             className={`tab ${activeTab === tab[0] ? 'active' : ''}`}
//                             onClick={() => setActiveTab(tab[0])}
//                         >
//                             <FaSquareXTwitter color="black" size={30} />
//                             {tab[0]}
//                         </button>

//                         <button
//                             className={`tab ${activeTab === tab[1] ? 'active' : ''}`}
//                             onClick={() => setActiveTab(tab[1])}
//                         >
//                             <AiFillTikTok color="black" size={30} />
//                             {tab[1]}
//                         </button>

//                         <button
//                             className={`tab ${activeTab === tab[2] ? 'active' : ''}`}
//                             onClick={() => setActiveTab(tab[2])}
//                         >
//                             <FaYoutube color="black" size={30} />
//                             {tab[2]}
//                         </button>

//                     </div>

//                     <div className="dropdown">
//                         <button className="dropbtn">{selectedPeriod} ▼</button>
//                         <div className="dropdown-content">
//                             {periods.map(period => (
//                                 <a key={period} href="#" onClick={(e) => { e.preventDefault(); setSelectedPeriod(period); }}>
//                                     {period}
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </nav>
//                 <div className="content">

//                     {/* <div className="box"></div>
//                 <div className="box"></div>
//                 <div className="box"></div>
//                 <div className="box"></div> */}



//                     <h1>{activeTab} : Statistiques, performances et tendances du mois</h1>
//                     {/* <p>Découvrez les dernières tendances {activeTab} en France...</p> */}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SocialStats;

import Cookies from 'js-cookie';
import React, { useState } from "react";
import "../Styles/SocialStats.css";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineTextFields } from "react-icons/md";
import Analyser from "./Analyser";
import HateSpeechChart from "./HateSpeechChart";
import TiktokAnalyzer from "./TiktokAnalyser";
import { FaTiktok } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import Navbar from "./Navbar";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import History from "./History";

const dummyStats = {
  "X (Twitter)": [
    { label: "Analyzed Tweets", value: 1245 },
    { label: "Detected Hate Speech", value: 234 },
    { label: "Hate rate", value: "18.8%" },
  ],
  Tiktok: [
    { label: "Analyzed Videos", value: 983 },
    { label: "Hate Comments", value: 104 },
    { label: "Hate Rate", value: "10.6%" },
  ],
  Youtube: [
    { label: "Commentaires analysés", value: 1583 },
    { label: "Discours haineux détectés", value: 308 },
    { label: "Taux de haine", value: "19.5%" },
  ]
};

const SocialStats = () => {
  const [activeTab, setActiveTab] = useState("X (Twitter)");
  const [selectedPeriod, setSelectedPeriod] = useState("4 last weeks");
  const [selectedSideBtn, setSelectedSideBtn] = useState("General");
  const [showAnalyser, setShowAnalyser] = useState(false)
  const navigate = useNavigate()

  const periods = [
    "4 last weeks", "April 2025", "March 2025",
    "February 2025", , "January 2025"
  ];

  const tab = ['X (Twitter)', 'Tiktok', 'Youtube'];

  const handleLogout = () => {
     const allCookies = Cookies.get();
     for (let cookieName in allCookies) {
    Cookies.remove(cookieName);
    }
   window.location.replace("/Login");
  
  }
  return (
    <>
      <Navbar></Navbar>


      <section className="dash-section">
        <div className="dash-sidebar">
          <div className="dash-sidebar-list">
            <button
              className={`side-btn ${selectedSideBtn === "General" ? "active" : ""}`}
              onClick={() => { setSelectedSideBtn("General"); setShowAnalyser(false) }}
            >
              <RiDashboardFill size={22} />
              <p>General</p>
            </button>

            {/* <button
            className={`side-btn ${selectedSideBtn === "Statistiques" ? "active" : ""}`}
            onClick={() => setSelectedSideBtn("Statistiques")}
          >
            <IoStatsChart size={22} />
            <p>Statistics</p>
          </button> */}

            <button
              className={`side-btn ${selectedSideBtn === "Analyser" ? "active" : ""}`}
              onClick={() => { setSelectedSideBtn("Analyser"); setShowAnalyser(!showAnalyser) }}
              onMouseEnter={() => setShowAnalyser(true)}
            // onMouseLeave={()=>setShowAnalyser(false)}
            >
              <FaSearch size={20}></FaSearch>
              Analyser

              {/* <FaChevronDown size={20} color="black" /> */}
            </button>

            {showAnalyser && <>

              <button
                className={`Side-btn ${selectedSideBtn === "Text" ? "active" : ""}`}
                onClick={() => { setSelectedSideBtn("Text") }}
              >

                <MdOutlineTextFields size={25} />
                Text Analyser

              </button>

              <button
                className={`Side-btn ${selectedSideBtn === "Tiktok" ? "active" : ""}`}
                onClick={() => setSelectedSideBtn("Tiktok")}
              >
                <FaTiktok size={22}></FaTiktok>
                Tiktok Analyser

              </button>

            </>}

            <button
              className={`side-btn ${selectedSideBtn === "History" ? "active" : ""}`}
              onClick={() => { setSelectedSideBtn("History"); setShowAnalyser(false) }}
            >

              <FaHistory size={20} />
              History
            </button>

            <button
              className={`Logout-btn ${selectedSideBtn === "Logout" ? "active" : ""}`}
              onClick={handleLogout}
            >

              <MdLogout size={25} />
              Logout
            </button>



          </div>


        </div>

        <div className="dash-container">
          {selectedSideBtn === "Text" ? (
            <Analyser nav={false}></Analyser>
          ) : selectedSideBtn === "Tiktok" ? (
            <TiktokAnalyzer></TiktokAnalyzer>
          ) : selectedSideBtn === "History" ? (  
            <History/>
          ) : (
            <>
              <nav className="navbar_tyt">
                <div className="navbar-container">
                  <button
                    className={`tab ${activeTab === tab[0] ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab[0])}
                  >
                    <FaSquareXTwitter color="black" size={30} />
                    {tab[0]}
                  </button>

                  <button
                    className={`tab ${activeTab === tab[1] ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab[1])}
                  >
                    <AiFillTikTok color="black" size={30} />
                    {tab[1]}
                  </button>

                  <button
                    className={`tab ${activeTab === tab[2] ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab[2])}
                  >
                    <FaYoutube color="red" size={30} />
                    {tab[2]}
                  </button>
                </div>

                <div className="dropdown">
                  <button className="dropbtn">{selectedPeriod} ▼</button>
                  <div className="dropdown-content">
                    {periods.map(period => (
                      <a
                        key={period}
                        href="#"
                        onClick={(e) => { e.preventDefault(); setSelectedPeriod(period); }}
                      >
                        {period}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="content">
                <h1 style={{ gridColumn: "1 / -1" }}>Monthly Summary of Hate Speech on X (Twitter)</h1>
                {dummyStats[activeTab].map((stat, i) => (
                  <div className="box" key={i}>
                    <h2>{stat.value}</h2>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <HateSpeechChart></HateSpeechChart>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SocialStats;
