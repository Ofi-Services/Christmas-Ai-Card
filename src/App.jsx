import { useState, useEffect, useCallback, useRef } from 'react'
import ParticlesBg from 'particles-bg'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
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

  // Client data for AkzoNobel from Ofi Services
  const clientData = {
    companyName: "AkzoNobel",
    year: 2025,
    totalProjects: 12,
    successRate: 98,
    costSavings: 250000,
    efficiency: 35,
    teamSize: 8,
    technologies: ["React", "Node.js", "AWS", "Python", "AI/ML"],
    keyAchievements: [
      "Launched 3 major products",
      "Reduced processing time by 60%", 
      "Implemented AI automation",
      "Expanded to 2 new markets"
    ]
  }

  const slides = [
    {
      type: 'welcome',
      title: '🎄 Our 2025 Wrapped',
      subtitle: `${clientData.companyName}, let's celebrate an amazing year together!`
    },
    {
      type: 'projects',
      title: `${clientData.totalProjects} Projects Delivered`,
      subtitle: 'Every single one crafted with excellence'
    },
    {
      type: 'success',
      title: `${clientData.successRate}% Success Rate`,
      subtitle: 'Exceeding expectations, every time'
    },
    {
      type: 'savings',
      title: `$${clientData.costSavings.toLocaleString()} Saved`,
      subtitle: 'Smart solutions that maximize your ROI'
    },
    {
      type: 'efficiency',
      title: `+${clientData.efficiency}% Efficiency`,
      subtitle: 'Streamlined processes for better results'
    },
    {
      type: 'team',
      title: `${clientData.teamSize} Dedicated Experts`,
      subtitle: 'Your success is our mission'
    },
    {
      type: 'tech',
      title: 'Technologies Mastered',
      subtitle: 'Cutting-edge tools for modern solutions',
      list: clientData.technologies
    },
    {
      type: 'achievements',
      title: 'Key Achievements',
      subtitle: 'Milestones we reached together',
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
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 500)
    }
  }, [currentSlide, slides.length])

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 500)
    }
  }

  // Auto-advance slides (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        nextSlide()
      }
    }, 4000) // 4 seconds per slide

    return () => clearTimeout(timer)
  }, [currentSlide, nextSlide, slides.length])

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
      
      <div className="christmas-bg">
        <div className="top-logos">
          <img src="/ofi-logo.png" alt="Ofi Services" className="company-logo" />
          <span className="plus-sign">+</span>
          <img src="/client-logo.png" alt="AkzoNobel" className="company-logo" />
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
      
      <div className={`slide ${isAnimating ? 'animating' : ''}`}>
        <div className="slide-content">
          <div className="slide-header">
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
          
          {slide.list && (
            <div className="slide-list">
              {slide.list.map((item, index) => (
                <div key={index} className="list-item">
                  <span className="list-bullet">✨</span>
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
