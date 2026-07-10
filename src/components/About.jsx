import graduationImage from '../assets/brand/thais-graduation-hq.png';
import { professionalInfo } from '../data/content.js';
import { Lanyard } from './Lanyard.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function About() {
  return (
    <section className="about section" id="sobre">
      <div className="container about__grid">
        <div className="about__media" data-reveal>
          <div className="about__ornament" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Lanyard
            imageSrc={graduationImage}
            altText="Thaís Lage em sua formatura em Psicologia"
          />
        </div>
        <div className="about__copy" data-reveal>
          <SectionTitle title="Prazer! Meu nome é Thaís Lage." align="left" />
          <p>
            Eu sou psicóloga formada pela Universidade Federal Fluminense (UFF), em Campos dos
            Goytacazes/RJ.
          </p>
          <p>
            Ao longo da minha formação, atuei em diferentes áreas da Psicologia — do trabalho em
            grupo ao trabalho individual, da clínica ao cuidado no território — e, em cada uma
            delas, fui entendendo um pouco mais sobre a complexidade de ser humano.
          </p>
          <p>
            Atualmente, sou pós-graduanda em Terapia Cognitivo-Comportamental (TCC), abordagem que
            utilizo na clínica. Mas, antes de tudo, acredito na escuta, na construção de sentido e
            na possibilidade de mudança que nasce quando alguém encontra um espaço seguro para ser
            quem é.
          </p>
          <div className="about__credential">
            <strong>{professionalInfo.crp}</strong>
            <span>{professionalInfo.approach}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
