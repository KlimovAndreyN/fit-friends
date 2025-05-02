import { FormEvent } from 'react';

import { OnClick } from '../../types/types';

type PopupFormProps = {
  title: string;
  hiddenTitle: string;
  content: JSX.Element;
  onClose: OnClick;
}

function PopupModal({ title, hiddenTitle, content, onClose }: PopupFormProps): JSX.Element {
  const handleCloseButtonClick = (event: FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="popup-container">
      <section className="popup">
        <h2 className="visually-hidden">{hiddenTitle}</h2>
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">{title}</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleCloseButtonClick}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross" />
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--certificates">
            {content}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupModal;
