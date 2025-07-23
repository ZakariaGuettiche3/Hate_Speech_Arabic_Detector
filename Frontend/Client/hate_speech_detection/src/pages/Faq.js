import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/FAQ.css";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";

const faqs = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "Our platform is designed to detect and analyze hate speech in Arabic texts from social media, forums, and online articles using NLP and AI technologies.",
  },
  {
    question: "Do I need to create an account to use the features?",
    answer:
      "No, you can use the main features without signing up. However, registering gives you access to more insights, history tracking, and customization options.",
  },
  {
    question: "Which types of hate speech are detected?",
    answer:
      "The system identifies categories like racism, discrimination, incitement to violence, and more, depending on context and tone.",
  },
  {
    question: "How accurate is the detection?",
    answer:
      "We use advanced NLP models and continuous fine-tuning to provide high accuracy, though no system is perfect. User feedback helps improve it over time.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>  
        <Navbar></Navbar>

    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggle(index)}>
              <span>{faq.question}</span>
              <ChevronDown
                size={20}
                className={openIndex === index ? "rotate" : ""}
              />
            </button>
            {openIndex === index && (
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
    
    </>
  );
}
