import { useState, useEffect, useCallback, useRef } from 'react'
import ParticlesBg from 'particles-bg'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState('forward')
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const audioRef = useRef(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // Client data for Envalior from Ofi Services
  const clientData = {
    companyName: "Envalior",
    year: 2025,
    totalDeliverables: 17,
    totalDomains: 5,
    costSavings: 175000,
    teamGrowth: "6 to 20",
    initialTeam: 6,
    currentTeam: 20,
    commitment: "3 years",
    technologies: ["Celonis OCPM", "AI Agents", "Copilot", "Process Mining", "Analytics"],
    keyAchievements: [
      "OCPM Pilot: Migrated SCM App to production",
      "10 Apps + 1 Agent + 1 Copilot delivered",
      "67% reduction in partial deliveries (746→246)",
      "On-time rate improved by 2.33%",
      "In-full rate improved: 99.7% → 99.8%",
      "Late payments reduced by 3.35%",
      "EUR 175K realized through Tariff App"
    ],
    domains: [
      "TAX: AP Starter Kit",
      "AR: Collection & Disputes",
      "Procurement: Supplier Risk",
      "CPM: Process Management Migration",
      "SCM: 6 Apps + 1 Agent + 1 Copilot",
      "Logistics: 2 Apps + 1 Agent (OBD Transport, Tariff)"
    ]
  }

  const slides = [
    {
      type: 'welcome',
      title: '🎄 Our 2025 Journey',
      subtitle: `${clientData.companyName}, celebrating a year of transformation together!`
    },
    {
      type: 'story',
      title: '💙 Our Love Story',
      subtitle: 'Started with POV in 2024, fell in love with OTIF, and committed for 3 years'
    },
    {
      type: 'deliverables',
      title: `${clientData.totalDeliverables} Deliverables`,
      subtitle: '10 Apps • 2 Agents • 1 Pilot Migration • 4 Starter Kits • 1 Migration • CPM'
    },
    {
      type: 'domains',
      title: `${clientData.totalDomains} Domains Transformed`,
      subtitle: 'SCM • AR • Procurement • Logistics • TAX • CPM',
      list: clientData.domains
    },
    {
      type: 'impact',
      title: '📈 Business Impact',
      subtitle: 'Real results that drive value',
      list: [
        'On-time rate improved by 2.33%',
        'In-full rate: 99.7% → 99.8%',
        'Late payments reduced by 3.35%',
        'Partial deliveries: 746 → 246 (67% drop)'
      ]
    },
    {
      type: 'savings',
      title: `EUR ${(clientData.costSavings / 1000).toFixed(0)}K Realized`,
      subtitle: 'Through Tariff App optimization'
    },
    {
      type: 'team',
      title: `${clientData.teamGrowth} Team Members`,
      subtitle: 'Growing together to serve you better'
    },
    {
      type: 'tech',
      title: 'Technologies Deployed',
      subtitle: 'Powered by Celonis excellence',
      list: clientData.technologies
    },
    {
      type: 'achievements',
      title: '🌟 Key Milestones',
      subtitle: 'What we built together',
      list: clientData.keyAchievements
    },
    {
      type: 'thanks',
      title: 'Thank You! 🎅',
      subtitle: `Here's to an even more successful ${clientData.year + 1}!`,
      footer: 'With warm wishes from the Ofi Services team'
    }
  ]

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setAnimationDirection('forward')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 500)
    }
  }, [currentSlide, slides.length])

  const prevSlide = () => {
    if (currentSlide > 0) {
      setAnimationDirection('backward')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 500)
    }
  }

  // Auto-advance slides (optional)
  useEffect(() => {
    if (isPaused) return
    
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        nextSlide()
      }
    }, 10000) // 10 seconds per slide

    return () => clearTimeout(timer)
  }, [currentSlide, nextSlide, slides.length, isPaused])

  const slide = slides[currentSlide]

  return (
    <div className="app">
      <audio 
        ref={audioRef}
        src="/christmas-music.mp3" 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={toggleMusic}
        className="music-toggle-btn"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
      </button>
      
      <button 
        onClick={togglePause}
        className="pause-toggle-btn"
        aria-label={isPaused ? "Resume slides" : "Pause slides"}
        title={isPaused ? "Resume auto-advance" : "Pause auto-advance"}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
      
      <div className="christmas-bg">
        <div className="top-logos">
          <img src="/ofi-logo.png" alt="Ofi Services" className="company-logo" />
          <span className="plus-sign">+</span>
          <img src="/client-logo.png" alt="Envalior" className="company-logo client-logo" />
        </div>
        <ParticlesBg 
          key={isMobile ? 'mobile' : 'desktop'}
          type="cobweb" 
          num={isMobile ? 25 : 50}
          config={{
            color: "#ffffff",
            connectColor: "#ffffff",
            backgroundColor: "transparent",
            position: "bottom",
            range: [0.5, 1.0]
          }}
          bg={false} 
        />
      </div>
      
      <div className="progress-bar-top">
        <div 
          className="progress-fill-top" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
      
      <div className={`slide ${isAnimating ? 'animating ' + animationDirection : animationDirection === 'backward' ? 'from-left' : 'from-right'}`}>
        <div className="slide-content">
          <div className="slide-header">
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
          
          {slide.list && (
            <div className="slide-list">
              {slide.list.map((item, index) => (
                <div key={index} className="list-item">
                  {item}
                </div>
              ))}
            </div>
          )}
          
          {slide.footer && (
            <div className="slide-footer-text">
              {slide.footer}
            </div>
          )}
        </div>
        

        
        <div className="navigation">
          {currentSlide > 0 && (
            <button 
              className="nav-btn prev" 
              onClick={prevSlide}
            >
              ← Previous
            </button>
          )}
          {currentSlide < slides.length - 1 && (
            <button 
              className="nav-btn next" 
              onClick={nextSlide}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
