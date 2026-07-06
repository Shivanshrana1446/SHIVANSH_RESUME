import React from 'react';
import './Modal.css';

type Project = {
  name: string;
  summary: string;
  description?: string;
  technologies?: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

type ModalProps = {
  project: Project | null;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
        {project.description && <p>{project.description}</p>}
        {project.technologies && (
          <div className="chip-list">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </div>
        )}
        <div className="modal-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Site
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer">
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
