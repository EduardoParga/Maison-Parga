import logoDark from '../assets/brand/logo-official-dark-transparent.png';
import logoLight from '../assets/brand/thais-logo-card.webp';

export function BrandMark({ tone = 'dark' }) {
  const logo = tone === 'light' ? logoLight : logoDark;

  return (
    <a className={`brand brand--${tone}`} href="#inicio" aria-label="Thaís Lage Psicologia">
      <img src={logo} alt="" aria-hidden="true" />
    </a>
  );
}
