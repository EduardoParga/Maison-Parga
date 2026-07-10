import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { approachSteps } from '../data/content.js';
import { SectionTitle } from './SectionTitle.jsx';

export function Approach() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="approach section" id="abordagem">
      <div className="container">
        <SectionTitle title="O Caminho da Transformação">
          A psicoterapia é um processo de descoberta e mudança. Juntas, seguimos estas etapas.
        </SectionTitle>
        <div className="approach__cards" data-reveal>
          {approachSteps.map(({ title, summary, detail, icon: Icon }, index) => {
            const isActive = activeStep === index;

            return (
              <button
                className={`approach-card ${isActive ? 'is-active' : ''}`}
                key={title}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                <span className="approach-card__icon">
                  <Icon size={34} />
                </span>
                <span className="approach-card__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="approach-card__title">{title}</span>
                <span className="approach-card__summary">{isActive ? detail : summary}</span>
                <span className="approach-card__arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
