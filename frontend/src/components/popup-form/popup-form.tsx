import { JSX, FormEvent } from 'react';
import classNames from 'classnames';

import { getPageTitle } from '../../utils/common';

type PopupFormProps = {
  title: string;
  caption?: string;
  extraClass: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: JSX.Element;
}

function PopupForm(props: PopupFormProps): JSX.Element {
  //! выделить отдельно форму, и если нужно с содержимым

  const { title, caption, extraClass, onSubmit, children } = props;
  const className = classNames('popup-form', extraClass);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(event);
  };

  return (
    <main>
      <title>{getPageTitle(title)}</title>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big" />
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype" />
        </svg>
      </div>
      <div className={className}>
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            {
              (caption)
                ?
                <div className="popup-form__title-wrapper">
                  <h1 className="popup-form__title">{caption}</h1>
                </div>
                :
                ''
            }
            <div className="popup-form__form">
              <form method="post" onSubmit={handleFormSubmit}>
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PopupForm;
