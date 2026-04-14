import { Zap, Camera, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Atividades', href: '#atividades' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

const socialLinks = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

function Footer() {
  return (
    <footer className="bg-[#0f2018] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* logo + tagline */}
          <div className="flex flex-col gap-4">
            <a
              href="#inicio"
              className="flex items-center gap-2 group w-fit"
              aria-label="Arena Club"
            >
              <Zap
                size={22}
                className="text-[#84cc16] group-hover:scale-110 transition-transform duration-300"
                strokeWidth={2.5}
              />
              <span className="font-heading font-bold text-white text-xl tracking-wide">
                Arena <span className="text-[#84cc16]">Club</span>
              </span>
            </a>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              Seu novo clube esportivo favorito. Tênis, Beach Tennis, Pilates,
              Academia e muito mais em um único lugar.
            </p>
          </div>

          {/* links */}
          <div>
            <h3 className="font-heading font-semibold text-white/70 text-[11px] uppercase tracking-[4px] mb-5">
              Links rápidos
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-body text-white/40 hover:text-[#84cc16] text-sm transition-colors duration-200 w-fit"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* redes sociais */}
          <div>
            <h3 className="font-heading font-semibold text-white/70 text-[11px] uppercase tracking-[4px] mb-5">
              Siga-nos
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/8
                             hover:bg-[#84cc16] text-white/55 hover:text-[#0f2218]
                             transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/30 text-sm">
            &copy; 2026 Arena Club. Todos os direitos reservados.
          </p>
          <p className="font-body text-white/18 text-xs">
            Arena Club é uma marca registrada. Qualquer uso não autorizado do
            nome ou logotipo é estritamente proibido.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
