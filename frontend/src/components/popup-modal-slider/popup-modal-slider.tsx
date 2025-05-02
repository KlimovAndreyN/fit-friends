import { FormEvent, useEffect } from 'react';

import useEscapeKey from '../../hooks/use-escape-key';
import Slider from '../slider/slider';

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
          <Slider
            classNamePrefix='popup__slider'
            mainDivClassName={`popup__content popup__content--${classNamePostfix}`}
            titleDivClassNamePostfix='head'
            titleClassNamePostfix='title'
            controlsClassNamePostfix='buttons'
            controlClassNamePostfix='btn'
            previousAriaLabel='prev'
            isIndividualControlClassName
            swiperSlideItemClassName='popup__slide popup__slide--current'
            childrens={[
              (//! временно
                <div className="popup__slide-img" key={1}>
                  <picture>
                    <img src="img/content/popup/popup-slide01.jpg" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу." />
                  </picture>
                </div>
              ),
              (//! временно
                <div className="popup__slide-img" key={2}>
                  <picture>
                    <img src="img/content/popup/popup-slide01.jpg" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу." />
                  </picture>
                </div>
              )
            ]}
            slidesCount={1}//!
            marginRight={0}
            textForEmpty='У тренера нет сертификатов'
          />
        </div>
      </section>
    </div>
  );
}

export default PopupModalSlider;
