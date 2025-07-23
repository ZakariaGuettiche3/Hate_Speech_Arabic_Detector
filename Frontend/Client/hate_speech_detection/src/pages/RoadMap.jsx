import React, { useState } from 'react';
import './RoadMap.css';
import { LiaBookmarkSolid } from "react-icons/lia";
import { RiBookmarkFill } from "react-icons/ri";
import { ImBookmark } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import CustomNavbar from '../components/CustomNavbar';

const Roadmap = () => {
  const skillBased = ['PYTHON', 'JAVA SCRIPT', 'FLUTTER', 'DESIGN SYSTEM'];
  const roleBased = ['AI ENGINEER', 'DEVOPS', "ANDROID", 'CYBER SECURITY'];
  const bestPractices = ['BACKEND', 'FRONT END', 'API SECURITY', 'AWS'];
  const [bookmark, setBookmark] = useState({})

  const handleDownload = (label) => {
    const filename = label.toLowerCase().replace(/\s+/g, '-');
    const pdfUrl = `/pdfs/${filename}.pdf`;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const toggleBookmark = (tag) => {
    setBookmark(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));

    handleDownload(tag)
  };

  const renderTags = (tags, startWithColor2 = false) =>
    tags.map((tag, index) => {
     
      const isEven = index % 2 === 0;
      const colorClass = startWithColor2
        ? isEven ? 'color-2' : 'color-1'
        : isEven ? 'color-1' : 'color-2';

      const filename = tag.toLowerCase().replace(/\s+/g, '-');
      const pdfUrl = `/pdfs/${filename}.pdf`;

      return (
        <div
          key={tag}
          className={`roadmap-tag ${colorClass}`}
          onClick={() => window.open(pdfUrl, '_blank')}
        >
          {tag}
          <span
            className="bookmark-icon"
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement('a');
              link.href = pdfUrl;
              link.download = `${filename}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <IoMdDownload size={28} />
          </span>
        </div>
      );
    });


  return (
    <div className="roadmap-container">
      {/* <CustomNavbar></CustomNavbar> */}
      <h2>Developer Roadmaps</h2>

      <div className="roadmap-section">
        <div className="roadmap-section-header">SKILL-BASED ROADMAPS</div>
        <div className="tags">{renderTags(skillBased)}</div>
      </div>

      <div className="roadmap-section">
        <div className="roadmap-section-header">ROLE-BASED ROADMAPS</div>
        <div className="tags">{renderTags(roleBased, true)}</div> 
      </div>

      <div className="roadmap-section">
        <div className="roadmap-section-header">BEST PRACTICES</div>
        <div className="tags">{renderTags(bestPractices)}</div>
      </div>
    </div>

  );
};

export default Roadmap;

