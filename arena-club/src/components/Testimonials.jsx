import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const testimonials = [
  {
    text: 'Mal posso esperar pela abertura! Beach tennis é minha paixão e ter uma estrutura dessas perto de casa é incrível.',
    name: 'Fernanda Oliveira',
    role: 'Professora',
    initials: 'FO',
    color: 'bg-violet-500',
  },
  {
    text: 'Já me cadastrei assim que vi. A ideia de ter tênis, pilates e academia no mesmo lugar é perfeita pra minha rotina.',
    name: 'Rafael Mendes',
    role: 'Engenheiro',
    initials: 'RM',
    color: 'bg-blue-500',
  },
  {
    text: 'O Arena Club vai transformar o esporte na cidade. Estou ansioso pelo pickleball!',
    name: 'Carlos Souza',
    role: 'Empresário',
    initials: 'CS',
    color: 'bg-emerald-600',
  },
]

function Testimonials() {
  const ref    = useSectionReveal()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // auto-avança o destaque a cada 3.5s — pausa ao interagir (WCAG 2.1 SC 2.2.2)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 3500)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section ref={ref} id="depoimentos" className="py-24 md:py-32 bg-[#1a3a2a] relative overflow-hidden">

      {/* aspas gigantes como decoração editorial */}
      <span
        aria-hidden="true"
        className="absolute left-[4%] top-[8%] font-serif text-[22vw] text-white/[0.04] leading-none select-none pointer-events-none"
      >
        &ldquo;
      </span>

      {/* linhas diagonais de textura — padrão editorial */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(132,204,22,0.025) 40px, rgba(132,204,22,0.025) 41px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="fade-in-section text-center mb-14">
          {/* linha decorativa — eyebrow — linha */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
            <span className="font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px]">
              Depoimentos
            </span>
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
          </div>
          <h2 className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl tracking-tight">
            O que dizem nossos <span className="text-[#84cc16] italic">futuros sócios</span>
          </h2>
        </div>

        {/*
          Wrapper .fade-in-section separado do div interativo —
          evita conflito de transform entre o reveal CSS e o scale do Tailwind.
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="fade-in-section"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                onMouseEnter={() => { setPaused(true); setActive(i) }}
                className={`h-full rounded-2xl p-7 flex flex-col gap-5 cursor-default
                            transition-all duration-500
                            ${active === i
                              ? 'bg-white/10 border border-[#84cc16]/40 shadow-xl shadow-black/30 -translate-y-1'
                              : 'bg-white/5 border border-white/10 translate-y-0'
                            }`}
              >
                {/* estrelas */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                <p className="font-body text-white/75 text-base leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className={`${t.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm font-heading font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-sm">{t.name}</p>
                    <p className="font-body text-white/45 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dot indicators — pill ativa / bola inativa */}
        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Depoimentos">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              onClick={() => { setActive(i); setPaused(true) }}
              className={`rounded-full transition-all duration-300 focus:outline-none
                          ${active === i
                            ? 'w-6 h-2 bg-[#84cc16]'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/55'
                          }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
