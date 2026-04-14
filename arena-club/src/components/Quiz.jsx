import { useState } from 'react'
import {
  Check, ArrowRight, Share2,
  CircleDot, Waves, Wind, Zap,
  PersonStanding, Dumbbell, HandHeart,
} from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const QUESTIONS = [
  {
    text: 'Como você prefere se exercitar?',
    options: [
      { id: 'A', text: 'Sozinho, no meu ritmo' },
      { id: 'B', text: 'Em dupla ou pequenos grupos' },
      { id: 'C', text: 'Em equipe, com muita energia' },
      { id: 'D', text: 'Com foco em corpo e mente' },
    ],
  },
  {
    text: 'O que mais te motiva?',
    options: [
      { id: 'A', text: 'Superar meus próprios limites' },
      { id: 'B', text: 'Competir e evoluir tecnicamente' },
      { id: 'C', text: 'Me divertir e socializar' },
      { id: 'D', text: 'Relaxar e cuidar do corpo' },
    ],
  },
  {
    text: 'Qual ambiente você prefere?',
    options: [
      { id: 'A', text: 'Academia completa com equipamentos' },
      { id: 'B', text: 'Quadra fechada, ambiente profissional' },
      { id: 'C', text: 'Área aberta, contato com a areia' },
      { id: 'D', text: 'Espaço calmo e silencioso' },
    ],
  },
  {
    text: 'Quanto tempo disponível por sessão?',
    options: [
      { id: 'A', text: '30 a 45 minutos' },
      { id: 'B', text: '1 hora' },
      { id: 'C', text: '1h30 ou mais' },
      { id: 'D', text: 'Não importa, quero relaxar' },
    ],
  },
]

const RESULTS = {
  A: {
    icon: Dumbbell,
    name: 'Academia',
    desc: 'Focado e disciplinado, você vai adorar a musculação completa e equipamentos de última geração do Arena Club.',
  },
  B_quadra: {
    icon: CircleDot,
    name: 'Tênis',
    desc: 'Competitivo e técnico, você vai evoluir muito nas quadras profissionais com professores certificados.',
  },
  B_areia: {
    icon: Zap,
    name: 'Pickleball',
    desc: 'O esporte que mais cresce no mundo. Rápido, social e viciante — perfeito para o seu perfil.',
  },
  C_areia: {
    icon: Waves,
    name: 'Beach Tennis',
    desc: 'Você ama o ar livre e a energia da areia. As quadras de beach tennis do Arena Club são para você.',
  },
  C_grama: {
    icon: Wind,
    name: 'Futevôlei',
    desc: 'Energia, habilidade e muita diversão. O futevôlei combina tudo que você busca em um esporte.',
  },
  D_calmo: {
    icon: PersonStanding,
    name: 'Pilates',
    desc: 'Equilíbrio entre corpo e mente. O Pilates vai transformar sua postura, força e qualidade de vida.',
  },
  D_massagem: {
    icon: HandHeart,
    name: 'Massagem',
    desc: 'Você merece descanso e recuperação. Nossas sessões de massagem são sob agendamento e disponibilidade.',
  },
  tie: {
    icon: Waves,
    name: 'Beach Tennis',
    desc: 'Versátil e cheio de energia — o Beach Tennis é o esporte ideal para quem quer diversão garantida.',
  },
}

function calculateResult(answers) {
  const count = { A: 0, B: 0, C: 0, D: 0 }
  answers.forEach((a) => { count[a]++ })

  const sorted = Object.entries(count).sort(([, a], [, b]) => b - a)
  const isTie  = sorted[0][1] === sorted[1]?.[1]
  if (isTie) return RESULTS.tie

  const winner  = sorted[0][0]
  const q3Answer = answers[2] // pergunta sobre ambiente

  if (winner === 'A') return RESULTS.A
  if (winner === 'B') return q3Answer === 'C' ? RESULTS.B_areia : RESULTS.B_quadra
  if (winner === 'C') return q3Answer === 'C' ? RESULTS.C_areia : RESULTS.C_grama
  if (winner === 'D') return q3Answer === 'D' ? RESULTS.D_massagem : RESULTS.D_calmo
  return RESULTS.tie
}

function Quiz() {
  const ref = useSectionReveal()

  // localStorage: inicializa o estado com resultado salvo (se houver)
  const [step, setStep] = useState(() => {
    try { return localStorage.getItem('arena-quiz-answers') ? 4 : 0 } catch { return 0 }
  })
  const [selected, setSelected] = useState(null)
  const [answers,  setAnswers]  = useState(() => {
    try {
      const saved = localStorage.getItem('arena-quiz-answers')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const current = QUESTIONS[step]

  const handleNext = () => {
    const next = [...answers, selected]
    if (step < 3) {
      setAnswers(next)
      setSelected(null)
      setStep(step + 1)
    } else {
      setAnswers(next)
      setStep(4)
      // persiste resultado na Web Storage API para a próxima visita
      try { localStorage.setItem('arena-quiz-answers', JSON.stringify(next)) } catch {}
    }
  }

  const handleReset = () => {
    setStep(0)
    setSelected(null)
    setAnswers([])
    try { localStorage.removeItem('arena-quiz-answers') } catch {}
  }

  const result = step === 4 ? calculateResult(answers) : null

  // Web Share API — compartilha o resultado se o browser suportar
  const handleShare = () => {
    if (!result || typeof navigator.share !== 'function') return
    navigator.share({
      title: 'Arena Club — Quiz de modalidades',
      text: `Minha modalidade ideal no Arena Club é ${result.name}! Descubra a sua:`,
      url: window.location.href,
    }).catch(() => {})
  }

  return (
    <section ref={ref} id="quiz" className="py-24 md:py-32 bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="fade-in-section text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
            <span className="font-body text-[11px] font-semibold text-[#84cc16] uppercase tracking-[5px]">
              Descubra a sua
            </span>
            <span aria-hidden="true" className="w-8 h-px bg-[#84cc16]" />
          </div>
          <h2 className="font-heading font-extrabold text-[#1a3a2a] text-3xl sm:text-5xl md:text-6xl tracking-tight">
            Qual modalidade <span className="text-[#84cc16] italic">combina com você?</span>
          </h2>
          <p className="mt-4 font-body text-gray-500 text-lg sm:text-xl max-w-xl mx-auto">
            Responda 4 perguntas rápidas e descubra o esporte ideal para o seu perfil.
          </p>
        </div>

        <div className="fade-in-section delay-200 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/70 p-6 sm:p-10">

          {step < 4 ? (
            <div key={step} className="quiz-step">
              {/* barra de progresso */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-body text-gray-400 text-sm">
                  Pergunta <span className="text-[#1a3a2a] font-semibold">{step + 1}</span> de 4
                </span>
                <div className="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#84cc16] rounded-full transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>
                <span className="font-body text-gray-400 text-sm">{Math.round(((step + 1) / 4) * 100)}%</span>
              </div>

              <h3 className="font-heading font-bold text-[#1a3a2a] text-xl sm:text-2xl mb-7 leading-snug">
                {current.text}
              </h3>

              <div className="flex flex-col gap-3 mb-8">
                {current.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected(opt.id)}
                    className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                      selected === opt.id
                        ? 'border-[#84cc16] bg-[#84cc16]/8 text-[#1a3a2a]'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600 hover:text-[#1a3a2a]'
                    }`}
                  >
                    <span className="font-body text-sm font-medium">{opt.text}</span>
                    {selected === opt.id && (
                      <Check size={16} className="text-[#84cc16] flex-shrink-0 ml-3" strokeWidth={2.5} />
                    )}
                  </button>
                ))}
              </div>

              {selected && (
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#2a5a3f]
                             text-white font-heading font-semibold text-base py-4 rounded-xl
                             transition-all duration-300 hover:shadow-lg hover:shadow-[#1a3a2a]/20"
                >
                  {step < 3 ? 'Próxima pergunta' : 'Ver meu resultado'}
                  <ArrowRight size={18} strokeWidth={2} />
                </button>
              )}
            </div>
          ) : (
            <div key="result" className="result-pop text-center py-4">
              {(() => {
                const Icon = result.icon
                return (
                  <>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#84cc16]/12 rounded-2xl mb-5">
                      <Icon size={40} className="text-[#84cc16]" strokeWidth={1.5} />
                    </div>
                    <p className="font-body text-gray-400 text-sm mb-2">Sua modalidade ideal é...</p>
                    <h3 className="font-heading font-extrabold text-[#1a3a2a] text-3xl mb-3">
                      {result.name}
                    </h3>
                    <p className="font-body text-gray-500 text-base max-w-sm mx-auto leading-relaxed mb-9">
                      {result.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="#atividades"
                        className="flex-1 flex justify-center items-center bg-[#84cc16] hover:bg-[#a3e635]
                                   text-[#0f2218] font-heading font-semibold py-3.5 rounded-xl
                                   transition-all duration-300"
                      >
                        Conhecer a modalidade
                      </a>
                      <button
                        onClick={handleReset}
                        className="flex-1 flex justify-center items-center border border-gray-200
                                   hover:border-gray-300 text-gray-500 hover:text-gray-700 font-body
                                   font-medium py-3.5 rounded-xl transition-all duration-300"
                      >
                        Refazer o quiz
                      </button>
                    </div>

                    {/* Web Share API — botão só aparece se o browser suportar */}
                    {typeof navigator.share === 'function' && (
                      <button
                        onClick={handleShare}
                        className="mt-2 inline-flex items-center gap-2 text-sm font-body text-gray-400
                                   hover:text-[#84cc16] transition-colors duration-200 mx-auto"
                      >
                        <Share2 size={14} strokeWidth={2} />
                        Compartilhar resultado
                      </button>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Quiz
