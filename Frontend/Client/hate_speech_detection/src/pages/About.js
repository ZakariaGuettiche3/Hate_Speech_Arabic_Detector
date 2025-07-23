import React from "react";
import "../Styles/AboutUs.css";
import { Users, ShieldCheck, Brain } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
   
    
    <><Navbar></Navbar>
    <div className="about-container">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About Us</h1>
        <p>
          Empowering safe conversations online by detecting and analyzing hate speech across Arabic social media content.
        </p>
      </motion.div>

      <div className="about-cards">
        <motion.div
          className="about-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Users size={32} />
          <h3>Who We Are</h3>
          <p>
            We are a team of passionate researchers and developers committed to fighting harmful speech online using AI and natural language processing.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Brain size={32} />
          <h3>What We Do</h3>
          <p>
            Our platform leverages cutting-edge machine learning models trained on Arabic language data to identify hate speech with precision.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <ShieldCheck size={32} />
          <h3>Our Mission</h3>
          <p>
            To promote respectful communication and protect online communities by making hate speech detection accessible and reliable.
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}
