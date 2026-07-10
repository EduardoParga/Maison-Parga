import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, whatsappUrl } from '../data/content.js';
import { BrandMark } from './BrandMark.jsx';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container header__inner">
        <BrandMark />
        <button
          className="header__toggle"
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`header__nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button--small button--primary" href={whatsappUrl} onClick={closeMenu}>
            Agendar sessão
          </a>
        </nav>
      </div>
    </header>
  );
}
