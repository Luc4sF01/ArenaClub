import { useSectionReveal } from '../hooks/useSectionReveal'
import {
  CircleDot, Waves, Wind, Zap,
  PersonStanding, Dumbbell, HandHeart,
} from 'lucide-react'

const activities = [
  { icon: CircleDot,      name: 'Tênis',        desc: 'Quadras profissionais com aulas para todos os níveis' },
  { icon: Waves,          name: 'Beach Tennis', desc: 'Quadras de areia com professores certificados' },
  { icon: Wind,           name: 'Futevôlei',    desc: 'Esporte que une futebol e vôlei na areia' },
  { icon: Zap,            name: 'Pickleball',   desc: 'O esporte que mais cresce no mundo' },
  { icon: PersonStanding, name: 'Pilates',      desc: 'Aulas com equipamentos modernos e instrutores especializados' },
  { icon: Dumbbell,       name: 'Academia',     desc: 'Musculação completa com equipamentos de última geração' },
  { icon: HandHeart,      name: 'Massagem',     desc: 'Sessões sob consulta e disponibilidade (serviço avulso)' },
]

function Activities() {
  const ref = useSectionReveal()

  return (
    <section ref={ref} id="atividades" className="py-24 md:py-32 bg-[#f8fafc] relative overflow-hidden">

      {/* toque editorial: número gigante como decoração */}
      <span
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[28vw] font-extrabold text-gray-900/[0.025] leading-none select-none pointer-events-none"
      >
        07
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="fade-in-section text-center mb-14">
          <span className="inline-block font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px] mb-4">
            O que oferecemos
          </span>
          <h2 className="font-heading font-bold text-[#1a3a2a] text-3xl sm:text-4xl md:text-5xl">
            Modalidades disponíveis
          </h2>
          <p className="mt-4 font-body text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Escolha a sua favorita ou experimente todas — no Arena Club há espaço para todo perfil.
          </p>
        </div>

        {/*
          Desktop: grid 4 colunas | Tablet: 2 colunas
          Mobile: scroll horizontal com snap para melhor UX
        */}
        <div className="fade-in-section delay-200 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-no-bar pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {activities.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="activity-card group relative flex-shrink-0 w-64 snap-start sm:w-auto
                           bg-white border border-gray-100 rounded-2xl p-6
                           flex flex-col gap-4 overflow-hidden
                           hover:scale-[1.03] hover:shadow-xl hover:shadow-[#84cc16]/10 hover:border-[#84cc16]/25
                           transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="p-3 bg-[#1a3a2a]/5 rounded-xl w-fit group-hover:bg-[#84cc16]/12 transition-colors duration-300">
                  <Icon size={30} className="text-[#84cc16]" strokeWidth={1.75} />
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-[#1a3a2a] text-lg mb-1.5">
                    {item.name}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* linha decorativa que expande no hover */}
                <div className="activity-line" />
              </div>
            )
          })}
        </div>

        <p className="mt-5 text-center text-gray-400 text-xs font-body sm:hidden">
          Deslize para ver todas as modalidades
        </p>
      </div>
    </section>
  )
}

export default Activities
