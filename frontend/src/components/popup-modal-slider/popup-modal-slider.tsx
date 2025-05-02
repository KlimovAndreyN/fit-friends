import { FormEvent, useEffect } from 'react';

import useEscapeKey from '../../hooks/use-escape-key';

import { OnClick } from '../../types/types';

type PopupFormProps = {
  title: string;
  hiddenTitle: string;
  classNamePostfix: string;
  onClose: OnClick;
}

function PopupModalSlider({ title, hiddenTitle, classNamePostfix, onClose }: PopupFormProps): JSX.Element {
  //! объеденить с PopupModal, возможно сделать PopupModalBase

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

  /*      <Slider
          title='Сертификаты'
          classNamePrefix={'popup__content'}
          titleDivClassNamePostfix='head'
          titleClassNamePostfix='title'
          //controlsClassNamePostfix='bts'
          //controlClassNamePostfix='btn'
          childrens={[
            (//! временно
              <li className="popup__slide popup__slide--current" key={1}>
                <div className="popup__slide-img">
                  <picture>
                    <img src="img/content/popup/popup-slide01.jpg" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу." />
                  </picture>
                </div>
              </li>
            )
          ]}
          slidesCount={1}//!
          textForEmpty='У тренера нет сертификатов'
        /> */

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
          <div className={`popup__content popup__content--${classNamePostfix}`} >
            <div className="popup__slider-buttons">
              <button className="btn-icon popup__slider-btn popup__slider-btn--prev" type="button" aria-label="prev">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon popup__slider-btn popup__slider-btn--next" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
            <ul className="popup__slider-list">
              <li className="popup__slide popup__slide--current">
                <div className="popup__slide-img">
                  <picture>
                    <img src="img/content/popup/popup-slide01.jpg" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу." />
                  </picture>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupModalSlider;
