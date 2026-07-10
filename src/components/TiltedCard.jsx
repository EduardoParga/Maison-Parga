import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export function TiltedCard({
  imageSrc,
  altText = 'Foto em cartão interativo',
  captionText = '',
  rotateAmplitude = 12,
  scaleOnHover = 1.035,
  overlayContent = null,
}) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function updateTilt(event) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    rotateX.set(((offsetY / rect.height) * 2 - 1) * -rotateAmplitude);
    rotateY.set(((offsetX / rect.width) * 2 - 1) * rotateAmplitude);
    glowX.set((offsetX / rect.width) * 100);
    glowY.set((offsetY / rect.height) * 100);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  function handlePointerDown(event) {
    ref.current?.setPointerCapture?.(event.pointerId);
    scale.set(scaleOnHover);
    updateTilt(event);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      onPointerDown={handlePointerDown}
      onPointerMove={(event) => {
        if (event.pointerType === 'mouse' || ref.current?.hasPointerCapture?.(event.pointerId)) {
          scale.set(scaleOnHover);
          updateTilt(event);
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') scale.set(scaleOnHover);
      }}
      onPointerLeave={resetTilt}
      onPointerUp={(event) => {
        ref.current?.releasePointerCapture?.(event.pointerId);
        resetTilt();
      }}
      onPointerCancel={resetTilt}
    >
      <motion.div
        className="tilted-card-inner"
        style={{ rotateX, rotateY, scale }}
      >
        <img src={imageSrc} alt={altText} className="tilted-card-img" />
        <motion.div
          className="tilted-card-glow"
          aria-hidden="true"
          style={{ '--glow-x': glowX, '--glow-y': glowY }}
        />
        {overlayContent ? <div className="tilted-card-overlay">{overlayContent}</div> : null}
      </motion.div>
      {captionText ? <figcaption className="tilted-card-caption">{captionText}</figcaption> : null}
    </figure>
  );
}
