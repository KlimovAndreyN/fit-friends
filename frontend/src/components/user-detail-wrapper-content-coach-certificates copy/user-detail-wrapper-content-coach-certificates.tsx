import { JSX, Fragment, MouseEvent, useState } from 'react';

import './user-detail-wrapper-content-coach-certificates.css';

import { ICertificateRdo } from '@backend/shared/core';

import CoachCertificatesPopupModalSlider from '../coach-certificates-popup-modal-slider/coach-certificates-popup-modal-slider';


type UserDetailWrapperContentCoachCertificatesProps = {
  classNamePrefix: string;
  certificates: ICertificateRdo[];
}

function UserDetailWrapperContentCoachCertificates({ classNamePrefix, certificates }: UserDetailWrapperContentCoachCertificatesProps): JSX.Element {
  // кнопке Показать сертификаты добавил outline-none-on-focus, т.к. была рамка на кнопке при закрытии окна

  const [showCertificates, setShowCertificates] = useState(false);

  const handleShowCertificatesButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowCertificates(true);
  };

  const handleCertificatesPopupModalClose = () => {
    setShowCertificates(false);
  };

  return (
    <Fragment>
      <button
        className={`btn-flat ${classNamePrefix}__sertificate outline-none-on-focus`}
        type="button"
        onClick={handleShowCertificatesButtonClick}
      >
        <svg width="12" height="13" aria-hidden="true">
          <use xlinkHref="#icon-teacher"></use>
        </svg>
        <span>Посмотреть сертификаты</span>
      </button>
      {
        showCertificates &&
        <CoachCertificatesPopupModalSlider
          certificates={certificates}
          onClose={handleCertificatesPopupModalClose}
        />
      }
    </Fragment>
  );
}

export default UserDetailWrapperContentCoachCertificates;
