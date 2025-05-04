import PopupModal from '../popup-modal/popup-modal';

type PopupModalMapProps = {
  title: string;
  address: string;
  onClose: () => void;
}

function PopupModalMap(props: PopupModalMapProps): JSX.Element {
  //! временно картинка

  const { title, address, onClose } = props;
  const content = (
    <div className="popup__map">
      <picture>
        <img src="img/content/popup/map.jpg" width="1160" height="623" alt="" />
      </picture>
      <div className="popup__pin popup__pin--user">
        <svg className="popup__pin-icon" width="40" height="49" aria-hidden="true">
          <use xlinkHref="#icon-pin-user" />
        </svg>
      </div>
    </div>
  );

  return (
    <PopupModal
      title={title}
      additionalHeadElement={
        <p className="popup-head__address">
          <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-location" />
          </svg>
          <span>{address}</span>
        </p>
      }
      wrapperClassNamePostfix='map'
      headClassNamePostfix='address'
      contentClassNamePostfix='map'
      content={content}
      onClose={onClose}
    />
  );
}

export default PopupModalMap;
