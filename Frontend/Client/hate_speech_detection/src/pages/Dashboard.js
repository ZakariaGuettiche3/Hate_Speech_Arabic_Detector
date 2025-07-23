// import React from "react";
// import { motion } from "framer-motion";
// import HateSpeechTrends from "../components/HateSpeechTrends";
// import PlatformDistribution from "../components/PlatformDistribution";
// import TopicTrends from "../components/TopicTrends";

// const Dashboard = () => {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-900 text-white p-5">
//         <h2 className="text-2xl font-bold mb-6">Hate Speech Dashboard</h2>
//         <nav>
//           <ul>
//             <li className="mb-3"><a href="#" className="hover:text-gray-300">📊 Dashboard</a></li>
//             <li className="mb-3"><a href="#" className="hover:text-gray-300">📂 Rapports</a></li>
//             <li className="mb-3"><a href="#" className="hover:text-gray-300">⚙ Paramètres</a></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-md p-4 mb-6 rounded-lg flex justify-between"
//         >
//           <h1 className="text-2xl font-semibold">Tableau de bord</h1>
//           <select className="border p-2 rounded">
//             <option>Toutes les plateformes</option>
//             <option>Twitter</option>
//             <option>Facebook</option>
//             <option>YouTube</option>
//           </select>
//         </motion.div>

//         {/* Graphs Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//             <HateSpeechTrends />
//           </motion.div>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
//             <PlatformDistribution />
//           </motion.div>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
//             <TopicTrends />
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import HateSpeechTrends from "../components/HateSpeechTrends";
import TopicTrends from "../components/TopicTrends";
import WorldMap from "../components/WorldMap";
import SocialStats from "../components/SocialStats";
import Analyser from "../components/Analyser";

const Dashboard = () => {
  return (
    <div>
      {/* <h1>Tableau de bord</h1> */}
      {/* <HateSpeechTrends /> */}
      {/* <TopicTrends/> */}
      {/* <WorldMap></WorldMap> */}
      <SocialStats></SocialStats>
      {/* <Analyser></Analyser> */}
    </div>
  );
};

export default Dashboard;
