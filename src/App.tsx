import { useEffect, useState } from 'react'
import './App.css'

type Stage = {
  title: string
  subtitle: string
  summary: string
  detail: string
  x: string
  y: string
}

const journeyStages: Stage[] = [
  {
    title: 'Chitkara University',
    subtitle: 'Foundation level',
    summary: 'B.Tech in Computer Science & Engineering, CGPA 7.7/10 (2026).',
    detail: 'Built the base: algorithms, web development, and problem-solving discipline.',
    x: '10%',
    y: '72%',
  },
  {
    title: 'Freelancing',
    subtitle: 'Client work',
    summary: 'Designed, developed, and deployed client websites with practical delivery focus.',
    detail: 'Learned to move fast, ship clean work, and translate ideas into usable products.',
    x: '35%',
    y: '54%',
  },
  {
    title: 'Internship',
    subtitle: 'Industry exposure',
    summary: 'Worked closer to production workflows, APIs, teamwork, and disciplined execution.',
    detail: 'Sharpened collaboration, version control, and delivery habits that matter in real teams.',
    x: '60%',
    y: '38%',
  },
  {
    title: 'SnabbTech',
    subtitle: 'Full stack developer',
    summary: 'Built and maintained production web apps with React.js, Node.js, Express.js, and MongoDB.',
    detail: 'Shipped LLBId, SnabbHealth, Jason, and HRMS with REST APIs and responsive interfaces.',
    x: '84%',
    y: '56%',
  },
]

const stats = [
  { value: '4', label: 'journey levels' },
  { value: '3', label: 'career jumps' },
  { value: '1', label: 'full-stack path' },
]

const journeyGoals = ['Success', 'Freedom', 'Independence']

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
  'Tailwind CSS',
  'Bootstrap',
  'OpenCV',
]

const experienceBullets = [
  'Developed and maintained production web applications using React.js, Node.js, Express.js, and MongoDB.',
  'Contributed to enterprise applications including LLBId, SnabbHealth, Jason, and HRMS.',
  'Integrated REST APIs and built responsive user interfaces.',
  'Collaborated with developers using Git and GitLab for version control, merge requests, and code management.',
  'Used ChatGPT, Gemini, GitHub Copilot, Claude, and Cursor AI to improve development productivity.',
]

const projects = [
  {
    name: 'Modern Riawaz - Full Stack Business Website',
    summary: 'Designed, developed, automated, and deployed a complete business website tailored to client requirements.',
  },
  {
    name: 'Amazon Clone (MERN Stack)',
    summary: 'Built a full-stack e-commerce platform with authentication, product catalog, shopping cart, and order management.',
  },
  {
    name: 'Face Recognition Attendance Management System',
    summary: 'Developed a face recognition attendance system using Python, OpenCV, Tkinter, and real-time attendance tracking.',
  },
]

const educationNotes = [
  'B.Tech in Computer Science & Engineering, Chitkara University',
  'CGPA: 7.7/10 (2026)',
  'Class XII (CBSE): 71%',
  'Class X (CBSE): 83%',
]

const extracurricular = [
  'Content creator specializing in product marketing and travel reels.',
  'Completed Himalayan treks including Hampta Pass, Kauri Pass, Churdhar, Triund, and Manimahesh (Off-Season).',
  'Fitness enthusiast, strength training practitioner, and regular gym-goer.',
]

const hudStats = [
  { label: 'LEVEL', value: '04' },
  { label: 'XP', value: '100 / 100' },
  { label: 'COINS', value: '500' },
  { label: 'GEMS', value: '50' },
]

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
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % journeyStages.length)
    }, 2800)

    return () => window.clearInterval(timer)
  }, [])

  const activeStage = journeyStages[activeIndex]
  const activePoint = journeyStages[activeIndex]

    return (
    <main className="journey-app">
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
          This page is designed like a game map, with the runner moving forward toward success,
          freedom, and independence while the milestones show each stage of the journey.
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

      <section className="journey-map" id="journey">
        <div className="journey-map__sky" />
        <div className="journey-map__mist journey-map__mist--left" />
        <div className="journey-map__mist journey-map__mist--right" />
        <div className="journey-map__track" />
        <div className="journey-map__glow journey-map__glow--start" />
        <div className="journey-map__glow journey-map__glow--end" />

        <div
          className="runner"
          style={{
            ['--x' as string]: activePoint.x,
            ['--y' as string]: activePoint.y,
          }}
        >
          <span className="runner__shadow" />
          <span className="runner__body">
            <span className="runner__head" />
            <span className="runner__pack" />
            <span className="runner__legs runner__legs--left" />
            <span className="runner__legs runner__legs--right" />
          </span>
        </div>

        {journeyStages.map((stage, index) => (
          <button
            key={stage.title}
            type="button"
            className={`stage-node ${index === activeIndex ? 'stage-node--active' : ''}`}
            style={{
              ['--x' as string]: stage.x,
              ['--y' as string]: stage.y,
            }}
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
            aria-label={`Focus ${stage.title}`}
          >
            <span className="stage-node__level">{index}</span>
            <span className="stage-node__tag">{stage.subtitle}</span>
            <span className="stage-node__title">{stage.title}</span>
            <span className="stage-node__summary">{stage.summary}</span>
            <span className="stage-node__detail">{stage.detail}</span>
          </button>
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
          <div className="timeline">
            {projects.map((project) => (
              <div key={project.name}>
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
            <a
              href="https://www.linkedin.com/in/shivansh-rana-81051b249"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://github.com/Shivanshrana1446" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
