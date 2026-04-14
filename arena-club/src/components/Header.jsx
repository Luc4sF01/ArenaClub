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
  const [solid, setSolid] = useState(false)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#1a3a2a] shadow-xl shadow-black/20'
          : 'bg-[#1a3a2a]/55 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[72px]">

        <a href="#inicio" className="flex items-center gap-2 group" aria-label="Arena Club">
          <Zap
            size={22}
            className="text-[#84cc16] group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.5}
          />
          <span className="font-heading font-bold text-white text-[19px] tracking-wide">
            Arena <span className="text-[#84cc16]">Club</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-[13px] font-medium text-white/70 hover:text-[#84cc16] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className="hidden md:inline-flex items-center bg-[#84cc16] hover:bg-[#a3e635] active:scale-95
                       text-[#0f2218] font-heading font-semibold text-[13px] px-5 py-2.5 rounded-lg
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
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#1a3a2a] border-t border-white/10 px-5 py-4 flex flex-col gap-1">
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
