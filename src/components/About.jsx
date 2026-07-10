import graduationImage from '../assets/brand/thais-graduation.webp';
import windowImage from '../assets/brand/thais-window.webp';
import { professionalInfo } from '../data/content.js';
import { SectionTitle } from './SectionTitle.jsx';

export function About() {
  return (
    <section className="about section" id="sobre">
      <div className="container about__grid">
        <div className="about__media" data-reveal>
          <figure className="about__portrait about__portrait--main">
            <img src={windowImage} alt="Thaís Lage sorrindo em uma janela azul" />
          </figure>
          <figure className="about__portrait about__portrait--credential">
            <img src={graduationImage} alt="Thaís Lage em sua formatura em Psicologia" />
          </figure>
        </div>
        <div className="about__copy" data-reveal>
          <SectionTitle title="Muito prazer, sou Thaís Lage." align="left" />
          <p>
            Sou psicóloga clínica e acredito que cada mulher carrega uma história única, cheia de
            significados e possibilidades. Meu propósito é caminhar ao seu lado, oferecendo um
            espaço seguro para você se ouvir, se compreender e se fortalecer.
          </p>
          <p>
            Aqui, você pode ser quem é, no seu tempo, sem julgamentos. Juntas, vamos transformar
            dores em aprendizados e construir uma vida mais leve, com sentido e autenticidade.
          </p>
          <div className="about__credential">
            <strong>{professionalInfo.crp}</strong>
            <span>{professionalInfo.approach}</span>
            <span>{professionalInfo.tagline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
