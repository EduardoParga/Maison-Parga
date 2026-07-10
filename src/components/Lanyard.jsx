import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './Lanyard.css';

const spring = { stiffness: 125, damping: 12, mass: 1.15 };

export function Lanyard({ imageSrc, altText }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const rotate = useTransform(smoothX, [-160, 0, 160], [-13, 0, 13]);
  const cordPath = useTransform(
    [smoothX, smoothY],
    ([currentX, currentY]) =>
      `M 250 0 C 250 90, ${250 + currentX * 0.22} ${128 + currentY * 0.2}, ${250 + currentX} ${198 + currentY}`,
  );

  return (
    <div className="lanyard" aria-label="Crachá interativo com foto da formatura de Thaís Lage">
      <svg className="lanyard__cord" viewBox="0 0 500 700" aria-hidden="true">
        <motion.path d={cordPath} />
      </svg>
      <motion.div
        className="lanyard__card"
        drag
        dragConstraints={{ top: -105, right: 145, bottom: 105, left: -145 }}
        dragElastic={0.28}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 145, bounceDamping: 11, power: 0.28, timeConstant: 260 }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ cursor: 'grabbing', scale: 1.015 }}
        style={{ x: smoothX, y: smoothY, rotate }}
      >
        <span className="lanyard__clip" aria-hidden="true" />
        <img src={imageSrc} alt={altText} draggable="false" />
        <div className="lanyard__label">
          <strong>Thaís Lage Carneiro</strong>
          <span>Psicóloga Clínica · CRP/MG 04/85600</span>
        </div>
      </motion.div>
    </div>
  );
}
