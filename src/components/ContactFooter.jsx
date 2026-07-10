import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import logoCard from '../assets/brand/thais-logo-card.webp';
import { contactInfo, professionalInfo, whatsappUrl } from '../data/content.js';
import { BrandMark } from './BrandMark.jsx';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export function ContactFooter() {
  return (
    <section className="contact" id="contato">
      <div className="contact__cta">
        <div className="container contact__grid">
          <div className="contact__copy" data-reveal>
            <h2>Vamos conversar?</h2>
            <p>Estou aqui para te ouvir.</p>
            <span>
              Agendar sua primeira sessão é um passo importante para o seu bem-estar. Será um
              prazer caminhar com você nessa jornada com escuta, acolhimento e cuidado.
            </span>
            <a className="button button--primary button--dark" href={whatsappUrl}>
              <WhatsAppIcon size={20} />
              Falar comigo no WhatsApp
            </a>
          </div>
          <div className="contact__brand-card" data-reveal>
            <img src={logoCard} alt="Thaís Lage Psicóloga Clínica" />
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container footer__grid">
          <BrandMark tone="light" />
          <p>
            {professionalInfo.approach}. {professionalInfo.tagline}.
          </p>
          <address>
            <a href={contactInfo.phoneHref}>
              <Phone size={18} />
              {contactInfo.phoneLabel}
            </a>
            <a href="mailto:contato@thaislagepsicologia.com.br">
              <Mail size={18} />
              contato@thaislagepsicologia.com.br
            </a>
            <span>
              <MapPin size={18} />
              Atendimento online ou presencial
            </span>
          </address>
          <div className="footer__social" aria-label="Redes sociais">
            <a href={contactInfo.instagramUrl} aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href={whatsappUrl} aria-label="WhatsApp">
              <WhatsAppIcon size={22} />
            </a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© 2026 Thaís Lage Psicologia. {professionalInfo.crp}.</span>
          <a href="#inicio">Voltar ao topo</a>
        </div>
      </footer>
    </section>
  );
}
