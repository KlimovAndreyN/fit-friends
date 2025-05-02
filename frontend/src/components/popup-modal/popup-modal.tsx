import { FormEvent, useEffect } from 'react';

import useEscapeKey from '../../hooks/use-escape-key';

import { OnClick } from '../../types/types';

type PopupFormProps = {
  title: string;
  hiddenTitle: string;
  classNamePostfix: string;
  content: JSX.Element;
  onClose: OnClick;
}

function PopupModal({ title, hiddenTitle, classNamePostfix, content, onClose }: PopupFormProps): JSX.Element {
  useEscapeKey(onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  const handleCloseButtonClick = (event: FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="popup-container" style={{ position: 'fixed', inset: 0, zIndex: 10 }}>
      <section className="popup">
        <h2 className="visually-hidden">{hiddenTitle}</h2>
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">{title}</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={handleCloseButtonClick}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross" />
              </svg>
            </button>
          </div>
          <div className={`popup__content popup__content--${classNamePostfix}`}>
            {content}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupModal;
