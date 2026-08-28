import React, { useEffect } from 'react';

const BlockInfoModal = ({ info, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!info) return null;

  return (
    <div className='info-modal-backdrop' onClick={onClose} role='presentation'>
      <div
        className='info-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='info-modal-title'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='info-modal-header'>
          <h2 id='info-modal-title'>{info.title}</h2>
          <button type='button' className='info-modal-close' onClick={onClose} aria-label='Close'>
            ×
          </button>
        </div>
        <div className='info-modal-body'>
          {(info.sections || []).map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockInfoModal;
