import { Link } from 'react-router-dom';

import { ICertificateRdo } from '@backend/shared/core';

import PopupModalSlider from '../popup-modal-slider/popup-modal-slider';

type UserDetailCoachCertificatesProps = {
  certificates: ICertificateRdo[];
  onClose: () => void;
}

function UserDetailCoachCertificates({ certificates, onClose }: UserDetailCoachCertificatesProps): JSX.Element {
  // добавил ссылку на сам файл, есть небольшое повторение кода с CertificateCard, но там код с редактированием...
  //   почему-то выравнивание картинок по содежимому, поискать что в css отличается от CoachCertificates и CertificateCard
  const childrens =
    certificates.map(
      ({ fileId, filePath, title }) => {
        const isPdf = filePath.endsWith('.pdf');
        const linkStyle = (isPdf) ? { display: 'inline-block' } : {};
        const certificateContent = (isPdf)
          ? (<embed src={filePath} width="294" height="360" type="application/pdf" style={{ pointerEvents: 'none' }} />)
          : (<picture><img src={filePath} width="294" height="360" alt={title} /></picture>);

        return (
          <div className="popup__slide-img" key={fileId} >
            <Link to={filePath} target='_blank' style={linkStyle}>
              {certificateContent}
            </Link>
          </div>
        );
      });

  return (
    <PopupModalSlider
      title='Сертификаты'
      hiddenTitle='Слайдер с сертификатами.'
      sliderMainDivClassNamePostfix='certificates'
      childrens={childrens}
      textForEmpty='У тренера нет сертификатов'
      onClose={onClose}
    />
  );
}

export default UserDetailCoachCertificates;
