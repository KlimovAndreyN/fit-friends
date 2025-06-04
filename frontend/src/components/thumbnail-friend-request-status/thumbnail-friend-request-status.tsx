import { JSX } from 'react';

type ThumbnailFriendRequestStatusProps = {
  texts: string[];
  classNamePrefix: string;
  isShowButtons: boolean;
  onAcceptButtonClick: () => void;
  onRejectButtonClick: () => void;
}

function ThumbnailFriendRequestStatus({ texts, classNamePrefix, isShowButtons, onAcceptButtonClick, onRejectButtonClick }: ThumbnailFriendRequestStatusProps): JSX.Element {
  const divRequestClassName = `${classNamePrefix}__request-status`;

  const handleAcceptButtonClick = () => {
    onAcceptButtonClick();
  };

  const handleRejectButtonClick = () => {
    onRejectButtonClick();
  };

  return (
    <div className={`${divRequestClassName} ${divRequestClassName}--role-user`}>
      {
        texts.map((text, index) => {
          const key = `text-${index}`;

          return (<p className="thumbnail-friend__request-text" key={key}>{text}</p>);
        })
      }
      {
        isShowButtons &&
        <div className="thumbnail-friend__button-wrapper">
          <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button" onClick={handleAcceptButtonClick}>Принять</button>
          <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button" onClick={handleRejectButtonClick}>Отклонить</button>
        </div>
      }
    </div>
  );
}

export default ThumbnailFriendRequestStatus;
