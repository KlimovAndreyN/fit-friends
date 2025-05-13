import { JSX, FormEvent, useEffect } from 'react';

import useEscapeKey from '../../hooks/use-escape-key';

import classNames from 'classnames';

type PopupModalProps = {
  title: string;
  hiddenTitle?: string;
  additionalHeadElement?: JSX.Element;
  wrapperClassNamePostfix?: string;
  headClassNamePostfix?: string;
  contentClassNamePostfix?: string;
  content: JSX.Element;
  isIndividualContent?: boolean;
  onClose: () => void;
}

function PopupModal(props: PopupModalProps): JSX.Element {
  const {
    title,
    hiddenTitle = '',
    additionalHeadElement,
    wrapperClassNamePostfix = '',
    headClassNamePostfix = '',
    contentClassNamePostfix = '',
    content,
    isIndividualContent,
    onClose
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

  const wrapperClassName = classNames('popup__wrapper', { [`popup__wrapper--${wrapperClassNamePostfix}`]: wrapperClassNamePostfix });
  const headClassName = classNames('popup-head', { [`popup-head--${headClassNamePostfix}`]: headClassNamePostfix });
  const currentContent = (isIndividualContent) ? content : (
    <div className={classNames({ 'popup__content': !contentClassNamePostfix, [`popup__content-${contentClassNamePostfix}`]: contentClassNamePostfix })}>
      {content}
    </div>
  );

  return (
    <div className="popup-container" style={{ position: 'fixed', inset: 0, zIndex: 10 }}>
      <section className="popup">
        {hiddenTitle && <h2 className="visually-hidden">{hiddenTitle}</h2>}
        <div className={wrapperClassName}>
          <div className={headClassName}>
            <h2 className="popup-head__header">{title}</h2>
            {additionalHeadElement}
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
