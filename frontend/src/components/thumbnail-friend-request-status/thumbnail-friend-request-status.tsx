import { JSX, MouseEvent } from 'react';

type ThumbnailFriendRequestStatusProps = {
  classNamePrefix: string;
  outStatusText: string;
  inStatusText: string;
  isShowButtons: boolean;
  onAcceptButtonClick: () => void;
  onRejectButtonClick: () => void;
}

function ThumbnailFriendRequestStatus(props: ThumbnailFriendRequestStatusProps): JSX.Element {
  const { classNamePrefix, outStatusText, inStatusText, isShowButtons, onAcceptButtonClick, onRejectButtonClick } = props;
  const divRequestClassName = `${classNamePrefix}__request-status`;

  const handleAcceptButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    onAcceptButtonClick();
  };

  const handleRejectButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    onRejectButtonClick();
  };

  return (
    <div className={`${divRequestClassName} ${divRequestClassName}--role-user`}>
      {
        [outStatusText, inStatusText].map((text, index) => {
          if (!text) {
            return null;
          }

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
