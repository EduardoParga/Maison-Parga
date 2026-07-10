import { whatsappUrl } from '../data/content.js';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={whatsappUrl} aria-label="Falar no WhatsApp">
      <WhatsAppIcon size={30} />
    </a>
  );
}
