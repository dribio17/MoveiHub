// components/PlayerModal.jsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function PlayerModal({ isOpen, onClose, src, title = 'Player' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen || !src) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    (
      <div className="fixed inset-0 z-[9999] bg-black">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] bg-black/70 hover:bg-black/90 text-white rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full h-full">
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    ),
    modalRoot
  );
}
