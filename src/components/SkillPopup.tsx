import React from 'react';
import './SkillPopup.css';

interface SkillPopupProps {
  skills: string[];
}

const SkillPopup: React.FC<SkillPopupProps> = ({ skills }) => {
  return (
    <div className="skill-popup">
      <div className="skill-popup-content">
        <h3>Level Complete!</h3>
        <p>Skills Unlocked:</p>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillPopup;
