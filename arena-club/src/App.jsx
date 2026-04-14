import { useRef, useEffect } from 'react'
import Header       from './components/Header'
import Hero         from './components/Hero'
import Activities   from './components/Activities'
import Quiz         from './components/Quiz'
import About        from './components/About'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

const BAND_ITEMS = [
  'Tênis', 'Beach Tennis', 'Futevôlei', 'Pickleball',
  'Pilates', 'Academia', 'Massagem',
  '500+ sócios', '7 modalidades', '1.000m² de área',
]

function MarqueeBand() {
  const doubled = [...BAND_ITEMS, ...BAND_ITEMS]
  return (
    <div className="marquee-wrap overflow-hidden bg-[#84cc16] py-[14px] border-y-2 border-[#1a3a2a]/10">
      <div className="marquee-track flex whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-heading font-bold text-[#0f2218] text-[13px] uppercase tracking-[4px] px-7">
              {item}
            </span>
            <span className="text-[#1a3a2a]/25 text-[10px]" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const rafId   = useRef(null)

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      const { x, y } = mouse.current
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      ringPos.current.x += (x - ringPos.current.x) * 0.12
      ringPos.current.y += (y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden lg:block">
        <span className="block w-[7px] h-[7px] rounded-full bg-[#84cc16] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div ref={ringRef} aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform hidden lg:block">
        <span className="block w-[30px] h-[30px] rounded-full border border-[#84cc16]/55 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeBand />
        <Activities />
        <Quiz />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </>
  )
}

export default App
