// Pricing.js
import React from 'react';
import './MembershipComparison.css'; 


const MembershipComparison = () => {
  return (
    <div>
      <div className="promotion-text">
        <h1 className="bold large-text">Stay on top of your life,
        <br/> work, and team tasks</h1>
        <br />
        <h2 className="smaller-text grey-text">Use Todoist for free forever or upgrade 
        <br/> to unlock our most powerful features for work and collaboration.</h2>
      </div>
    <div className="membership-comparison">
      <div className="column">
        <img src= "/images/beginner-img.png" alt="Beginner" />
        <h2>Beginner</h2>
        <h3>Start organizing your life for free</h3>
        <br />
        <br />
        <ul>
          <li className="header">An account with:</li>
          <li>5 personal projects</li>
          <li>3 filter views</li>
          <li>1 week activity history</li>
          <li>Flexible list & board views</li>
          <li>Integrate email, calendar, and more</li>
        </ul>
        <br />
        <br />
        <button>choose</button>
      </div>

      <div className="column">
        <img src="/images/pro-img.png" alt="Pro" />
        <h2>Pro</h2>
        <h3>Stay on top of all your tasks and goals, at work and at home</h3>
        <br />
        <br />
        <ul>
          <li className="header">Everything in Beginner, plus:</li>
          <li>300 personal projects</li>
          <li>150 filter views</li>
          <li>Unlimited activity history</li>
          <li>Task reminders & duration</li>
          <li>Automatic backups</li>
          <li>AI Assistant</li>
        </ul>
        <br />
        <br />
        <button>choose</button>
      </div>

      <div className="column">
        <img src="/images/business-img.png" alt="Business" />
        <h2>Business</h2>
        <h3>Simplify and organize your team's work, too</h3>
        <br />
        <br />
        <ul>
          <li className="header">Everything in Pro, plus:</li>
          <li>A shared team workspace</li>
          <li>500 team projects</li>
          <li>Unlimited team members & guests</li>
          <li>Team roles & permissions</li>
          <li>Centralized team billing</li>
          <li>Restricted projects</li>
        </ul>
        <br />
        <br />
        <button>choose</button>
      </div>
    </div>
    </div>
  );
};

export default MembershipComparison;