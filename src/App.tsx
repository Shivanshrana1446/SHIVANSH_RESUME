import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Animation from './components/Animation';

type Stage = {
  title: string;
  subtitle: string;
  summary: string;
  detail: string;
  x: string;
  y: string;
  skills: string[];
};

type Project = {
  name: string;
  summary: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

const journeyStages: Stage[] = [
  {
    title: 'Chitkara University',
    subtitle: 'Foundation level',
    summary: 'B.Tech in Computer Science & Engineering, CGPA 7.7/10 (2026).',
    detail: 'Built the base: algorithms, web development, and problem-solving discipline.',
    x: '10%',
    y: '50%',
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Freelancing',
    subtitle: 'Client work',
    summary: 'Designed, developed, and deployed client websites with practical delivery focus.',
    detail: 'Learned to move fast, ship clean work, and translate ideas into usable products.',
    x: '30%',
    y: '50%',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Internship',
    subtitle: 'Industry exposure',
    summary: 'Worked closer to production workflows, APIs, teamwork, and disciplined execution.',
    detail: 'Sharpened collaboration, version control, and delivery habits that matter in real teams.',
    x: '50%',
    y: '50%',
    skills: ['Git', 'GitLab', 'REST APIs'],
  },
  {
    title: 'SnabbTech',
    subtitle: 'Full stack developer',
    summary: 'Built and maintained production web apps with React.js, Node.js, Express.js, and MongoDB.',
    detail: 'Shipped LLBId, SnabbHealth, Jason, and HRMS with REST APIs and responsive interfaces.',
    x: '70%',
    y: '50%',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: 'Level 5',
    subtitle: 'Future',
    summary: 'The journey continues.',
    detail: 'Ready for new challenges and opportunities.',
    x: '90%',
    y: '50%',
    skills: ['AI', 'Machine Learning', 'Cloud Computing'],
  },
];

const stats = [
  { value: '4', label: 'journey levels' },
  { value: '3', label: 'career jumps' },
  { value: '1', label: 'full-stack path' },
];

const journeyGoals = ['Success', 'Freedom', 'Independence'];

const skills = [
  'C',
  'C++',
  'Java',
  'JavaScript',
  'Python',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MERN',
  'Tailwind CSS',
  'Bootstrap',
  'OpenCV',
];

const experienceBullets = [
  'Developed and maintained production web applications using React.js, Node.js, Express.js, and MongoDB.',
  'Contributed to enterprise applications including LLBId, SnabbHealth, Jason, and HRMS.',
  'Integrated REST APIs and built responsive user interfaces.',
  'Collaborated with developers using Git and GitLab for version control, merge requests, and code management.',
  'Used ChatGPT, Gemini, GitHub Copilot, Claude, and Cursor AI to improve development productivity.',
];

const projects: Project[] = [
  {
    name: 'Modern Riawaz - Full Stack Business Website',
    summary: 'Designed, developed, automated, and deployed a complete business website tailored to client requirements.',
    description:
      'A full-stack business website for a client, built from scratch. The project involved understanding client needs, designing the UI/UX, developing the frontend and backend, and handling the deployment process. The site is fully responsive and includes features like a contact form, a gallery, and a blog.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://www.modernriwaaz.in/',
    sourceUrl: '#',
  },
  {
    name: 'Amazon Clone (MERN Stack)',
    summary: 'Built a full-stack e-commerce platform with authentication, product catalog, shopping cart, and order management.',
    description:
      'A feature-rich clone of the Amazon website. This project includes user authentication (signup and login), a product catalog with search functionality, a shopping cart, and a checkout process. The backend is built with Node.js and Express.js, and it uses MongoDB for the database.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
    sourceUrl: 'https://github.com/Shivanshrana1446/Amazon-Clone',
  },
  {
    name: 'Face Recognition Attendance Management System',
    summary: 'Developed a face recognition attendance system using Python, OpenCV, Tkinter, and real-time attendance tracking.',
    description:
      'A desktop application that uses face recognition to automate the process of taking attendance. The system can detect and recognize faces in real-time, mark attendance, and store the data in a CSV file. The user interface is built with Tkinter.',
    technologies: ['Python', 'OpenCV', 'Tkinter', 'dlib'],
    sourceUrl: 'https://github.com/Shivanshrana1446/Face-Recognition-Based-Attendance-System',
  },
  {
    name: 'Talleflow Clone - Scroll Animation Website',
    summary: 'A clone of Talleflow with smooth scroll-triggered animations built using React, Framer Motion, and Tailwind CSS.',
    description:
      'A visually rich website clone that showcases scroll-driven animations, parallax effects, and modern UI patterns. Built to demonstrate proficiency in animation libraries and engaging frontend experiences.',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://talleflow-clone-animation-bm1k.vercel.app/',
    sourceUrl: '#',
  },
  {
    name: 'Mini Docs - Collaborative Google Docs Clone',
    summary: 'A real-time collaborative document editor built with React, Socket.io, and MongoDB, inspired by Google Docs.',
    description:
      'A full-featured collaborative document editor that supports real-time editing, rich text formatting, and multi-user collaboration. Built with React.js for the frontend, Socket.io and Node.js for real-time communication, and MongoDB for document storage. Deployed on Vercel.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Quill.js'],
    liveUrl: 'https://mini-docs-bslg.vercel.app',
    sourceUrl: 'https://github.com/Shivanshrana1446/mini_docs',
  },
];

const educationNotes = [
  'B.Tech in Computer Science & Engineering, Chitkara University',
  'CGPA: 7.7/10 (2026)',
  'Class XII (CBSE): 71%',
  'Class X (CBSE): 83%',
];

const extracurricular = [
  'Content creator specializing in product marketing and travel reels.',
  'Completed Himalayan treks including Hampta Pass, Kauri Pass, Churdhar, Triund, and Manimahesh (Off-Season).',
  'Fitness enthusiast, strength training practitioner, and regular gym-goer.',
];

const hudStats = [
  { label: 'LEVEL', value: '04' },
  { label: 'XP', value: '100 / 100' },
  { label: 'COINS', value: '500' },
  { label: 'GEMS', value: '50' },
];

const missionCards = [
  {
    title: 'Target',
    copy: 'Run from foundations to freedom, then into real client work and industry experience.',
  },
  {
    title: 'Reward',
    copy: 'Each level unlocks stronger problem-solving, speed, and confidence in shipping work.',
  },
  {
    title: 'Keep Going',
    copy: 'The path is Chitkara to freelancing to internship to SnabbTech full stack developer.',
  },
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const activeStage = journeyStages[activeStageIndex];

  return (
    <main className="journey-app">
      <div className="main-content">
        <section className="hud-bar" aria-label="Game status">
          <div className="player-panel">
            <div className="player-panel__avatar">SR</div>
            <div>
              <p className="player-panel__name">PLAYER 1</p>
              <strong>Shivansh Rana</strong>
              <div className="player-panel__xp">
                <span>LV. 04</span>
                <div className="player-panel__meter">
                  <span />
                </div>
                <span>100 / 100</span>
              </div>
            </div>
          </div>

          <div className="resource-strip">
            {hudStats.map((item) => (
              <div key={item.label} className="resource-chip">
                <span className="resource-chip__value">{item.value}</span>
                <span className="resource-chip__label">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="journey-hero">
          <p className="eyebrow">The adventure begins</p>
          <h1>From Chitkara to freelancing, internship, and SnabbTech</h1>
          <p className="lede">
            This page is designed like a game map, with the runner moving forward toward success, freedom, and independence while the milestones show each stage of the journey.
          </p>
        </section>

        <section className="stats-row" aria-label="Journey highlights">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="mission-strip" aria-label="Journey goals">
          {missionCards.map((card) => (
            <article key={card.title} className="mission-card">
              <p>{card.title}</p>
              <strong>{card.copy}</strong>
            </article>
          ))}
        </section>

        <Animation
          setActiveStageIndex={setActiveStageIndex}
          journeyStages={journeyStages}
        />

        <section className="story-grid">
          <article className="story-card story-card--wide">
            <p className="eyebrow">Current checkpoint</p>
            <h2>{activeStage.title}</h2>
            <p>{activeStage.summary}</p>
            <div className="story-card__detail">{activeStage.detail}</div>
            <div className="journey-goals" aria-label="Resume goals">
              {journeyGoals.map((goal) => (
                <span key={goal}>{goal}</span>
              ))}
            </div>
          </article>

          <article className="story-card">
            <p className="eyebrow">Skills</p>
            <ul className="chip-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>

          <article className="story-card">
            <p className="eyebrow">Experience</p>
            <div className="timeline">
              {experienceBullets.map((item, index) => (
                <div key={item}>
                  <strong>{index === 0 ? 'SnabbTech' : `Key point ${index + 1}`}</strong>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="story-card">
            <p className="eyebrow">Projects</p>
            <p className="story-card__hint">Click on any project to view the live site</p>
            <div className="timeline">
              {projects.map((project) => (
                <div key={project.name} onClick={() => openModal(project)} className="clickable">
                  <strong>{project.name}</strong>
                  <span>{project.summary}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="story-card">
            <p className="eyebrow">Education</p>
            <div className="timeline">
              {educationNotes.map((note) => (
                <div key={note}>
                  <strong>{note}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="story-card">
            <p className="eyebrow">Extracurricular</p>
            <div className="timeline">
              {extracurricular.map((item) => (
                <div key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="story-card story-card--wide" id="contact">
            <p className="eyebrow">Contact</p>
            <h2>Reach the end of the level with me</h2>
            <div className="contact-row">
              <a href="mailto:ranashivansh70@gmail.com">ranashivansh70@gmail.com</a>
              <a href="tel:+919786076809">+91 79860 78609</a>
              <a href="https://www.linkedin.com/in/shivansh-rana-81051b249" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/Shivanshrana1446" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </article>
        </section>
        {isModalOpen && <Modal project={selectedProject} onClose={closeModal} />}
        <Footer />
      </div>
    </main>
  );
}

export default App;
