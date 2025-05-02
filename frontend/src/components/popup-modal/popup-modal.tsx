import { FormEvent, useEffect } from 'react';

import useEscapeKey from '../../hooks/use-escape-key';

import { OnClick } from '../../types/types';
import classNames from 'classnames';

type PopupModalProps = {
  title: string;
  hiddenTitle: string;
  classNamePostfix?: string;
  content: JSX.Element;
  isIndividualContent?: boolean;
  onClose: OnClick;
}

function PopupModal(props: PopupModalProps): JSX.Element {
  const { title, hiddenTitle, classNamePostfix = '', content, isIndividualContent, onClose
  } = props;

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

  const currentContent = (isIndividualContent) ? content : (
    <div className={classNames('popup__content', { [`popup__content--${classNamePostfix}`]: classNamePostfix })}>
      {content}
    </div>
  );

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
          {currentContent}
        </div>
      </section>
    </div>
  );
}

export default PopupModal;
