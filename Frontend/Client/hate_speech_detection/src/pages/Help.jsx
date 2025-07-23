import React from 'react';
import './Help.css';
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaChevronDown, FaChevronLeft, FaChevronRight, FaSearch, FaPlus } from 'react-icons/fa';

const Help = () => {
  return (
    <div className="help-wrapper">
      <h1 className="header-title">Looking for help ?</h1>

      <div className="content-section">
        <div className="left-section">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button><FaSearch /></button>
            <button className="plus-button"><FaPlus /></button>
          </div>

          {[1, 2].map((_, idx) => (
            <div className="post-card" key={idx}>
              <img
                src="https://i.pinimg.com/736x/0b/db/c7/0bdbc7e1f21b705d25b7f81873810086.jpg"
                alt="User"
                className="avatar"
              />
              <div className="post-content">
                <div className="post-header">
                  <h2>Add a subheading</h2>
                  <span>2 min ago</span>
                </div>
                <p>Add a little bit of body text</p>
              </div>
              <div className="post-actions">
                <div><span>10</span><FaThumbsUp /></div>
                <div><span>0</span><FaThumbsDown /></div>
                <div><span>2</span><FaCommentDots /></div>
              </div>
            </div>
          ))}

          <div className="pagination">
            <button><FaChevronLeft /></button>
            <button>1</button>
            <button className="active">1</button>
            <button>1</button>
            <button>...</button>
            <button><FaChevronRight /></button>
          </div>
        </div>

        <div className="filter-section">
          <h2>Filter</h2>
          <div className="filter-option">
            <span>Date</span>
            <FaChevronDown />
          </div>
          <div className="filter-option">
            <span>Popularity</span>
            <FaChevronDown />
          </div>
          <div className="filter-option">
            <span>Comments</span>
            <FaChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
