import { useState, useEffect } from 'react'
import { Zap, Menu, X } from 'lucide-react'

const links = [
  { label: 'Início',     href: '#inicio' },
  { label: 'Atividades', href: '#atividades' },
  { label: 'Quiz',       href: '#quiz' },
  { label: 'Sobre',      href: '#sobre' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'Contato',    href: '#contato' },
]

function Header() {
  const [solid,    setSolid]    = useState(false)
  const [open,     setOpen]     = useState(false)
  const [progress, setProgress] = useState(0)
  const [active,   setActive]   = useState('inicio')

  useEffect(() => {
    const handler = () => {
      setSolid(window.scrollY > 60)
      const el       = document.documentElement
      const scrolled = window.scrollY / (el.scrollHeight - el.clientHeight)
      setProgress(Math.min(scrolled * 100, 100))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // IntersectionObserver detecta qual seção ocupa o centro da viewport
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#1a3a2a] shadow-xl shadow-black/20'
          : 'bg-[#1a3a2a]/55 backdrop-blur-lg'
      }`}
    >
      {/* barra de progresso de leitura */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#84cc16] transition-[width] duration-75 ease-out rounded-full"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px] md:h-[78px]">

        <a href="#inicio" className="flex items-center gap-2.5 group" aria-label="Arena Club">
          <Zap
            size={24}
            className="text-[#84cc16] group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.5}
          />
          <span className="font-heading font-bold text-white text-[22px] tracking-wide">
            Arena <span className="text-[#84cc16]">Club</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {links.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative font-body text-[15px] font-medium transition-colors duration-300
                            ${isActive ? 'text-[#84cc16]' : 'text-white/75 hover:text-[#84cc16]'}`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#84cc16] rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className="hidden md:inline-flex items-center bg-[#84cc16] hover:bg-[#a3e635] active:scale-95
                       text-[#0f2218] font-heading font-semibold text-[15px] px-6 py-2.5 rounded-lg
                       transition-all duration-300 hover:shadow-lg hover:shadow-[#84cc16]/25"
          >
            Quero conhecer
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* drawer mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#1a3a2a] border-t border-white/10 px-5 pt-4 pb-6 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-base font-medium text-white/75 hover:text-[#84cc16] px-3 py-3 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-3 flex justify-center bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2218] font-heading font-semibold text-sm px-5 py-3 rounded-lg transition-all duration-300"
          >
            Quero conhecer
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
