import React, { useState } from 'react';
import './Welcome.css';
import welcomeImage from "../Assets/Welcome0.jpg";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WelcomeModal from './WelcomeChoose';

const Welcome = () => {

    const [start,setStart]=useState(false)

    const navigate=useNavigate()
    const handleStart=()=>{

setStart(true)
    }

    return (<div className="landing-container">
       {/* {!start && <Navbar></Navbar>} */}
        <div className="left-section">


            <div className="logo-section">
                {/* <img src="/path/to/icon.png" alt="logo" className="icon" /> */}
                <h1><span className="bold">Arabic Hate Speech Detection</span></h1>
            </div>
            <h2 className="subtitle">Detect, Analyze, and Combat <br></br>Arabic Hate Speech with AI</h2>
            {/* <button className="get-started-btn" onClick={()=>navigate("/dashboard")}>Get Started</button> */}
            <button className="get-started-btn" onClick={handleStart}>Get Started</button>
            {/* <button className="about-btn" onClick={()=>navigate("/About")}>Read More</button> */}
            {/* <button className="button-92" role="button">Button 92</button> */}
            {/* <button class="button-48" role="button"><span class="text">Get Started</span></button> */}

            <div className='cercle1'></div>
            <div className='cercle2'></div>
            <div className='cercle3'></div>
            <div className='cercle4'></div>

            <div className='cercle11'></div>
            <div className='cercle22'></div>
            <div className='cercle33'></div>
            <div className='cercle44'></div>


        </div>

        <div className="right-section">
            <img src={welcomeImage} alt="Phone 1" className="phone phone-left" />
            {/* <img src="/path/to/phone2.png" alt="Phone 2" className="phone phone-right" /> */}
        </div>
{start && <WelcomeModal></WelcomeModal>}

    </div>


);
}

export default Welcome;