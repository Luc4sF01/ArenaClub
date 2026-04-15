import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import Header       from './components/Header'
import Hero         from './components/Hero'
import Activities   from './components/Activities'
import Quiz         from './components/Quiz'
import About        from './components/About'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

/* ─── Faixa de esportes com scroll infinito ─── */
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

/*
  ─── Tela de introdução ───
  Cobre a página inteira até o site carregar.
  Estado: 'visible' → 'hiding' (fade out) → 'gone' (desmonta o DOM).
  Zero libraries — só useState + useEffect + CSS transition.
*/
function IntroScreen() {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    // aguarda a barra de progresso (~2.2s) e então inicia o fade de saída
    const t1 = setTimeout(() => setPhase('hiding'), 2300)
    // após o fade (700ms) remove o elemento do DOM completamente
    const t2 = setTimeout(() => setPhase('gone'),   3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0f2218] flex flex-col items-center justify-center
                  transition-all duration-700 ease-in-out
                  ${phase === 'hiding' ? 'opacity-0 scale-[1.04]' : 'opacity-100 scale-100'}`}
    >
      {/* grade decorativa — mesma do Hero */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(132,204,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative flex flex-col items-center gap-3">
        {/* ícone */}
        <Zap
          size={54}
          className="text-[#84cc16] mb-1"
          strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 24px rgba(132,204,22,0.5))' }}
        />

        {/* logotipo */}
        <p className="font-heading font-extrabold text-white tracking-wide"
           style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
          Arena <span className="text-[#84cc16]">Club</span>
        </p>

        {/* tagline */}
        <p className="font-body text-white/35 text-xs tracking-[5px] uppercase mt-1">
          Inauguração 2026
        </p>

        {/* barra de progresso */}
        <div className="w-44 h-[2px] bg-white/10 rounded-full overflow-hidden mt-8">
          <div className="intro-progress h-full bg-[#84cc16] rounded-full" />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <IntroScreen />
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
    </>
  )
}

export default App
