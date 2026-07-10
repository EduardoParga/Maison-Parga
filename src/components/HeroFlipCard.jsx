import { useState } from 'react';
import coverLogo from '../assets/brand/thais-logo-card.webp';
import portraitImage from '../assets/brand/thais-portrait-garden.webp';
import { professionalInfo } from '../data/content.js';

export function HeroFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`hero-flip-card ${isFlipped ? 'is-flipped' : ''}`}
      tabIndex={0}
      aria-label="Cartão interativo com logo e foto de Thaís Lage"
      onBlur={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(true)}
      onFocus={() => setIsFlipped(true)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="hero-flip-card__content">
        <div className="hero-flip-card__face hero-flip-card__cover">
          <div className="hero-flip-card__cover-inner">
            <img src={coverLogo} alt="Thaís Lage Psicóloga Clínica" />
            <strong>Conheça a Thaís</strong>
          </div>
        </div>
        <div className="hero-flip-card__face hero-flip-card__photo">
          <div className="hero-flip-card__glow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <img src={portraitImage} alt="Thaís Lage sorrindo em um ambiente natural com plantas" />
          <div className="hero-flip-card__info">
            <small>{professionalInfo.crp}</small>
            <div>
              <strong>Thaís Lage</strong>
              <span>{professionalInfo.approach}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
