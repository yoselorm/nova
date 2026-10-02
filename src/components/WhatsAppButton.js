import React from 'react';

const WHATSAPP_NUMBER = '233544030436';

// lucide-react ships no brand glyphs, so the WhatsApp mark is a raw inline SVG
const WhatsAppIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.876.52 3.63 1.42 5.13L2.05 22l4.99-1.31A9.94 9.94 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.06c-1.66 0-3.2-.49-4.494-1.33l-.322-.19-2.965.778.79-2.888-.21-.297A8.06 8.06 0 013.94 12c0-4.446 3.616-8.06 8.061-8.06 4.446 0 8.06 3.614 8.06 8.06 0 4.446-3.614 8.06-8.06 8.06z" />
  </svg>
);

// Floating site-wide link straight into a WhatsApp chat with the front desk
const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-black/20 hover:scale-110 active:scale-95 transition-transform duration-300 animate-fade-in"
  >
    <WhatsAppIcon size={28} />
  </a>
);

export default WhatsAppButton;
