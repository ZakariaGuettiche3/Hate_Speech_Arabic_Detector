import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./components/HomePage";
import EditProfile from "./pages/EditProfile";
import EditProfileCard from "./pages/EditProfileCard";
import Help from "./pages/Help";
import SocialStats from "./components/SocialStats";
import Welcome from "./components/Welcome";
import Roadmap from "./pages/RoadMap";
import Analyser from "./components/Analyser";
import AboutUs from "./pages/About";
import Protect from "./components/Protectrout";
import Navbar from './components/Navbar';
import SignIn from "./pages/SignIn";
import Form from "./pages/Form";
import "./Styles/root.css";
import "./Styles/generale.css";
import "./Styles/normal.css";
import GuestAnalyser from "./pages/GuestAnalyser";
// import"./Styles/"




function App() {
  return (
    <Router>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="*" element={<Welcome />} />
        <Route path="/Home" element={<Welcome></Welcome>} ></Route>
        <Route element={<Protect/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/Analyser" element={<GuestAnalyser/>}></Route>
            <Route path="/Edit" element={<EditProfileCard></EditProfileCard>} ></Route>
            <Route path="/Map" element={<Roadmap></Roadmap>} ></Route>
            <Route path="/About" element={<AboutUs/>} ></Route>
        </Route>
        {/* <Route path="/FAQ" element={<FAQ/>} ></Route> */}
        <Route path="/Login" element={<Form/>} ></Route>

        {/* <Route path="/Edit" element={<EditProfile/>} ></Route> */}


      </Routes>
    </Router>
  );
}

export default App;
