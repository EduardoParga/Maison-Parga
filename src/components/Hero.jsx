import { CalendarHeart } from 'lucide-react';
import portraitImage from '../assets/brand/thais-portrait-garden.webp';
import { professionalInfo, trustPoints, whatsappUrl } from '../data/content.js';
import { TiltedCard } from './TiltedCard.jsx';

export function Hero() {
  return (
    <section className="hero section" id="inicio">
      <div className="container hero__grid">
        <div className="hero__content" data-reveal>
          <h1>Cuidar de si é um ato de coragem.</h1>
          <p>
            Psicologia Clínica para mulheres. Um espaço acolhedor, humano e transformador para
            o seu autoconhecimento e saúde mental.
          </p>
          <div className="hero__meta" aria-label="Informações profissionais">
            <span>{professionalInfo.crp}</span>
            <span>{professionalInfo.approach}</span>
          </div>
          <div className="hero__actions">
            <a className="button button--primary" href={whatsappUrl}>
              <CalendarHeart size={20} />
              Agendar minha primeira sessão
            </a>
          </div>
          <ul className="trust-list" aria-label="Diferenciais do atendimento">
            {trustPoints.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon size={18} />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero__media" data-reveal>
          <TiltedCard
            imageSrc={portraitImage}
            altText="Thaís Lage sorrindo em um ambiente natural com plantas"
            overlayContent={
              <>
                <small>{professionalInfo.crp}</small>
                <strong>Thaís Lage</strong>
                <span>{professionalInfo.approach}</span>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
