import { useState, useEffect, useCallback, useRef } from 'react'
import ParticlesBg from 'particles-bg'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState('forward')
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [playGif, setPlayGif] = useState(false)
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false)
  const audioRef = useRef(null)
  const gifRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hide intro screen after animation
  useEffect(() => {
    // Start playing gif after 1 second pause
    const playTimer = setTimeout(() => {
      setPlayGif(true)
    }, 1000)
    
    // Hide intro after 6 seconds total
    const hideTimer = setTimeout(() => {
      setShowIntro(false)
    }, 6000)
    
    return () => {
      clearTimeout(playTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50
    
    if (Math.abs(distance) > minSwipeDistance) {
      setHasSwipedOnce(true)
      if (distance > 0) {
        // Swiped left - go to next slide
        nextSlide()
      } else {
        // Swiped right - go to previous slide
        prevSlide()
      }
    }
    
    touchStartX.current = null
    touchEndX.current = null
  }

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
    technologies: ["Celonis OCPM", "AI Agents", "Copilot", "Process Mining", "Analytics", "CPM", "PAM", "Orchestration Engine"],
    keyAchievements: [
      "OCPM Pilot: Migrated SCM App to production",
      "10 Apps + 1 Agent + 1 Copilot delivered",
      "67,00% reduction in partial deliveries (746→246)",
      "On-time rate improved by 2,33%",
      "In-full rate improved: 99,70% → 99,80%",
      "Late payments reduced by 3,35%",
      "EUR 175K realized through Tariff App"
    ],
    domains: [

      "AP: 1 Starter Kit",
      "AR: 1 App + 1 Starter Kit",
      
      "Logistics: 2 Apps + 1 Agent",
      "CPM: Migration & Configuration",
      "Procurement: 1 App + 1 Starter Kit",
      "SCM: 6 Apps + 1 Agent + 1 Copilot",
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
      title: `18 Deliverables`,
      subtitle: '10 Apps • 2 Agents • 1 Pilot Migration • 4 Starter Kits • CPM'
    },
    {
      type: 'domains',
      title: `Building the Future Together: Our impacted Domains.`,
      subtitle: 'SCM • AR • Procurement • Logistics • AP • CPM',
      list: clientData.domains
    },
    {
      type: 'impact',
      title: ' Business Impact',
      subtitle: 'Real results that drive value',
      list: [
        'On-time rate improved by 2,33%',
        'In-full rate: 99,70% → 99,80%',
        'Late payments reduced by 3,35%',
        'Partial deliveries: 746 → 246 (67% drop)'
      ]
    },
    {
      type: 'savings',
      title: `Together, we have realized €2.58M in value this year`,
      subtitle: 'Apps have been tracked value since September',
      list: [
        'TARIFF: €175k value realized',
        'CCS: €484k value realized',
        'OTIF: €718k value realized',
        'SAILFIN: €1,2M value realized'
      ]
    },
    {
      type: 'team',
      title: `We initiated our journey with a team of ${clientData.initialTeam} and have now grown to more than ${clientData.currentTeam} experts!`,
      subtitle: 'Growing together to serve you better'
    },
    {
      type: 'userGrowth',
      title: ' Growing Together',
      subtitle: 'Not just our team - Your engagement has skyrocketed!',
      stats: {
        year2024: { users: 140, logins: 12411 },
        year2025: { users: 352, logins: 42391 },
        trends: { logins: '246,8%', users: '151,1%' }
      }
    },
    {
      type: 'tech',
      title: 'Technologies Deployed',
      subtitle: '',
      list: clientData.technologies
    },
    {
      type: 'thanks',
      title: 'Thank you for your trust and partnership this year. ',
      subtitle: `🎄✨We look forward to reaching new heights together in ${clientData.year + 1}!🎄✨`,
      footer: 'With warm wishes from your OFI team'
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

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setAnimationDirection('backward')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 500)
    }
  }, [currentSlide])

  const slide = slides[currentSlide]

  return (
    <div className="app">
      {showIntro && (
        <div className="intro-screen" onClick={() => setShowIntro(false)}>
          <img 
            ref={gifRef}
            src="/intro.gif" 
            alt="Welcome" 
            className="intro-gif"
          />
          <p className="intro-skip">Click to skip</p>
        </div>
      )}
      
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
      
      {isPlaying && (
        <div className="snowfall">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                fontSize: `${10 + Math.random() * 20}px`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}
      
      <div className="progress-bar-top">
        <div 
          className="progress-fill-top" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
      
      {isMobile && !hasSwipedOnce && (
        <div className="mobile-swipe-hint">
          👆 Swipe to navigate
        </div>
      )}
      
      <div 
        className={`slide ${isAnimating ? 'animating ' + animationDirection : animationDirection === 'backward' ? 'from-left' : 'from-right'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slide-content">
          <div className="slide-header">
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
          
          {slide.type === 'team' && (
            <div className="growth-graph-container">
              <svg className="growth-graph" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#cca23f', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#e6c466', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                
                {/* Graph line */}
                <path
                  className="graph-line"
                  d="M 50 120 Q 150 100, 200 60 T 350 30"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Start point - 6 */}
                <circle cx="50" cy="120" r="5" fill="#cca23f" className="graph-point start-point" />
                <text x="50" y="145" textAnchor="middle" fill="#cca23f" fontSize="18" fontWeight="bold" className="graph-label">6</text>
                
                {/* End point - 20 */}
                <circle cx="350" cy="30" r="5" fill="#e6c466" className="graph-point end-point" />
                <text x="350" y="55" textAnchor="middle" fill="#e6c466" fontSize="18" fontWeight="bold" className="graph-label">+20</text>
                
                {/* Sparkle at end */}
                <g className="sparkle" transform="translate(350, 30)">
                  <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#FFD700" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="2s" repeatCount="3" />
                  </polygon>
                </g>
              </svg>
            </div>
          )}
          
          {slide.type === 'userGrowth' && slide.stats && (
            <div className="user-growth-container">
              <div className="stats-comparison">
                <div className="stat-card year-2024">
                  <div className="stat-year">2024</div>
                  <div className="stat-item">
                    <div className="stat-value">{slide.stats.year2024.users}</div>
                    <div className="stat-label">Users</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{slide.stats.year2024.logins.toLocaleString()}</div>
                    <div className="stat-label">Logins</div>
                  </div>
                </div>
                
                <div className="arrow-separator">→</div>
                
                <div className="stat-card year-2025">
                  <div className="stat-year">2025</div>
                  <div className="stat-item">
                    <div className="stat-value">{slide.stats.year2025.users}</div>
                    <div className="stat-label">Users</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{slide.stats.year2025.logins.toLocaleString()}</div>
                    <div className="stat-label">Logins</div>
                  </div>
                </div>
              </div>
              
              <div className="trends-container">
                <div className="trend-title">Growth This Year</div>
                <div className="trends-grid">
                  <div className="trend-item">
                    <div className="trend-value">{slide.stats.trends.logins}↑</div>
                    <div className="trend-label">Login Growth</div>
                  </div>
                  <div className="trend-item">
                    <div className="trend-value">{slide.stats.trends.users}↑</div>
                    <div className="trend-label">User Growth</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {slide.list && (
            <div className="slide-list">
              {slide.list.map((item, index) => (
                <div 
                  key={index} 
                  className="list-item"
                  style={{
                    animationDelay: `${0.8 + index * 0.4}s`
                  }}
                >
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
              {currentSlide === 0 ? 'Start →' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
