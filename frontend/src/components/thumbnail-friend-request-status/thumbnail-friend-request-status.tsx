import { JSX, MouseEvent } from 'react';

type ThumbnailFriendRequestStatusProps = {
  classNamePrefix: string;
  outStatusText: string;
  inStatusText: string;
  isShowButtons: boolean;
  isDisabledButtons?: boolean;
  onAcceptButtonClick: () => void;
  onRejectButtonClick: () => void;
}

function ThumbnailFriendRequestStatus(props: ThumbnailFriendRequestStatusProps): JSX.Element {
  const { classNamePrefix, outStatusText, inStatusText, isShowButtons, isDisabledButtons, onAcceptButtonClick, onRejectButtonClick } = props;
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
        //! попробовать обеъденить кнопки
        isShowButtons &&
        <div className="thumbnail-friend__button-wrapper">
          {
            [{
              caption: 'Принять',
              className: 'btn btn--medium btn--dark-bg thumbnail-friend__button',
              onClick: handleAcceptButtonClick
            },
            {
              caption: 'Отклонить',
              className: 'btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button',
              onClick: handleRejectButtonClick
            }].map(({ caption, className, onClick }) => (
              <button key={caption} className={className} type="button" onClick={onClick} disabled={isDisabledButtons}>{caption}</button>
            ))
          }
        </div>
      }
    </div>
  );
}

export default ThumbnailFriendRequestStatus;
