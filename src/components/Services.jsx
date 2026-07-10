import { services, whatsappUrl } from '../data/content.js';
import { SectionTitle } from './SectionTitle.jsx';

export function Services() {
  return (
    <section className="services section" id="servicos">
      <div className="container">
        <SectionTitle title="Como posso te ajudar?">
          Ofereço psicoterapia individual para mulheres que desejam se conhecer melhor, cuidar da
          saúde emocional e viver com mais leveza e propósito.
        </SectionTitle>
        <div className="services__grid" data-reveal>
          {services.map(({ title, description, icon: Icon }) => (
            <article className="service" key={title}>
              <Icon size={40} strokeWidth={1.6} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="services__action" data-reveal>
          <a className="button button--outline" href={whatsappUrl}>
            Entender como funciona o processo
          </a>
        </div>
      </div>
    </section>
  );
}
