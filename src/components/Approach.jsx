import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { approachSteps } from '../data/content.js';
import CircularGallery from './CircularGallery.jsx';
import { SectionTitle } from './SectionTitle.jsx';

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
}

function createInfoArtwork(step, index) {
  const wrapText = (text, maxLength) => {
    const lines = [];
    let line = '';
    text.split(' ').forEach((word) => {
      if (`${line} ${word}`.trim().length > maxLength) {
        lines.push(line);
        line = word;
      } else line = `${line} ${word}`.trim();
    });
    if (line) lines.push(line);
    return lines;
  };
  const titleLines = wrapText(step.title, 18).slice(0, 2).map((item, lineIndex) =>
    `<tspan x="52" dy="${lineIndex ? 62 : 0}">${escapeXml(item)}</tspan>`
  ).join('');
  const summaryLines = wrapText(step.summary, 29).slice(0, 4).map((item, lineIndex) =>
    `<tspan x="52" dy="${lineIndex ? 39 : 0}">${escapeXml(item)}</tspan>`
  ).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2400" viewBox="0 0 600 800">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffdf8"/><stop offset="1" stop-color="#e5ddce"/></linearGradient></defs>
    <rect width="600" height="800" rx="32" fill="url(#bg)"/>
    <rect x="18" y="18" width="564" height="764" rx="24" fill="none" stroke="#4a5a43" stroke-width="1.5" opacity=".2"/>
    <circle cx="528" cy="96" r="132" fill="none" stroke="#aebc9d" stroke-width="2" opacity=".72"/>
    <circle cx="528" cy="96" r="94" fill="#aebc9d" opacity=".16"/>
    <path d="M440 720c34-104 70-164 116-218M478 632c-32-5-54-25-67-59 36-1 61 15 77 46M510 578c34-9 57-31 68-66-37 3-62 21-75 51" fill="none" stroke="#4a5a43" stroke-width="3" opacity=".28"/>
    <text x="52" y="84" fill="#a1613b" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="4">ETAPA ${String(index + 1).padStart(2, '0')}</text>
    <text x="52" y="260" fill="#4a5a43" font-family="Georgia,serif" font-size="56" font-weight="600">${titleLines}</text>
    <text x="52" y="425" fill="#596752" font-family="Arial,sans-serif" font-size="29">${summaryLines}</text>
    <line x1="52" y1="690" x2="184" y2="690" stroke="#a1613b" stroke-width="3"/>
    <text x="52" y="730" fill="#a1613b" font-family="Arial,sans-serif" font-size="21" font-weight="700" letter-spacing="1.2">CLIQUE PARA EXPLORAR</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const galleryItems = approachSteps.map((step, index) => ({ image: createInfoArtwork(step, index), text: '' }));

export function Approach() {
  const [activeStep, setActiveStep] = useState(null);
  const selectStep = useCallback((index) => setActiveStep({ ...approachSteps[index], index }), []);

  useEffect(() => {
    if (!activeStep) return undefined;
    const handleKeyDown = (event) => event.key === 'Escape' && setActiveStep(null);
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [activeStep]);

  return (
    <section className="approach section" id="abordagem">
      <div className="container">
        <SectionTitle title="O Caminho da Transformação">
          A psicoterapia é um processo de descoberta e mudança. Arraste a galeria e explore cada etapa.
        </SectionTitle>
      </div>
      <div className="approach__circular-gallery" data-reveal>
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#4a5a43"
          borderRadius={0.045}
          font="600 30px Poppins"
          scrollSpeed={2}
          scrollEase={0.055}
          onSelect={selectStep}
        />
      </div>
      {activeStep ? (
        <div className="approach-modal" role="presentation" onMouseDown={() => setActiveStep(null)}>
          <article className="approach-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="approach-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="approach-modal__close" type="button" aria-label="Fechar explicação" onClick={() => setActiveStep(null)}><X size={21} /></button>
            <span className="approach-modal__eyebrow">Etapa {String(activeStep.index + 1).padStart(2, '0')}</span>
            <span className="approach-modal__icon" aria-hidden="true"><activeStep.icon size={34} strokeWidth={1.5} /></span>
            <h3 id="approach-modal-title">{activeStep.title}</h3>
            <p>{activeStep.detail}</p>
            <div className="approach-modal__note">Um processo construído no seu ritmo, com acolhimento e segurança.</div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
