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
  const ref = useSectionReveal()

  return (
    <section ref={ref} id="depoimentos" className="py-24 md:py-32 bg-[#1a3a2a] relative overflow-hidden">

      {/* aspas gigantes como decoração editorial */}
      <span
        aria-hidden="true"
        className="absolute left-[4%] top-[8%] font-serif text-[22vw] text-white/[0.04] leading-none select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="fade-in-section text-center mb-14">
          <span className="inline-block font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px] mb-4">
            Depoimentos
          </span>
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl">
            O que dizem nossos futuros sócios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="fade-in-section bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-5"
              style={{ transitionDelay: `${i * 120}ms` }}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
