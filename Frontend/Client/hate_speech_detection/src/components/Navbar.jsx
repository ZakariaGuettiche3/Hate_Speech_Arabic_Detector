// import React from 'react';
// import '../Styles/Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <img src="/logo.png" alt="Logo" />
//       </div>
//       <ul className="navbar-links">
//         <li><a href="#analyser">Analyser</a></li>
//         <li><a href="#statistics">Statistics</a></li>
//         <li><a href="#about">About</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import "../Styles/Navbar.css";
import logo from "../Assets/logo1.png"
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Cookies from 'js-cookie';
import { FiLogIn } from "react-icons/fi";




const Navbar = () => {
  const [userName, setUserName] = useState()

  useEffect(() => {
    const userID = Cookies.get('id');
    const storedUserName = Cookies.get('userName');
    if (userID && storedUserName) {
      setUserName(storedUserName);
    } else {
      console.log("le nom n'existe pas")
    }
  }, []);

  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <div className="account-bar-container">

        <div className="account-bar">
          {userName ? (<> 
            <FaUserCircle className="profile-img-bar" />

            <div className="username-bar-container" >
              <p className="hi-username">Hi</p>
              <p className="username-bar">{userName}</p>

            </div>

          </>) : <div className="nav-login" onClick={()=>navigate('/login')}>
          <FiLogIn color="#398399" size={25}/>
            <p>Login</p>
          </div>
      
}

        </div>


      </div>
      {/* <ul className="navbar-links">
        <li><a href="/Home">Home</a></li>
        <li><a href="/analyser">Analyze</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/faq">FAQ</a></li> 
      </ul> */}
    </nav>
  );
};

export default Navbar;
