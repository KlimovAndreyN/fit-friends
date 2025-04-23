import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { OnClick } from '../../types/types';

type CertificateCards = {
  title: string;
  filePath: string;
  isEditing: boolean;
  disabled?: boolean;
  onEditClick: OnClick;
  onSaveClick: OnClick;
  onChangeClick: OnClick;
  onDeleteClick: OnClick;
}

function CertificateCard(props: CertificateCards): JSX.Element {
  // скорректировать отображение ПДФ, или при сохранении конвертровать и изображение - сделал embed
  // при клике показать крупнее - сделал ссылку вокруг элемента

  const { title, filePath, isEditing, disabled, onEditClick, onSaveClick, onChangeClick, onDeleteClick } = props;
  const className = classNames('certificate-card', { 'certificate-card--edit': isEditing });
  const isPdf = filePath.endsWith('.pdf');
  const linkStyle = (isPdf) ? { display: 'inline-block' } : {};

  const handleEditButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onEditClick();
  };

  const handleSaveButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSaveClick();
  };

  const handleChangeButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChangeClick();
  };

  const handleDeleteButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDeleteClick();
  };

  const buttonClassName = 'btn-flat btn-flat--underlined certificate-card__button certificate-card__button--';

  return (
    <div className={className}>
      <div className="certificate-card__image">
        <Link to={filePath} target='_blank' style={linkStyle}>
          {
            (isPdf)
              ?
              <embed src={filePath} width="294" height="360" type="application/pdf" style={{ pointerEvents: 'none' }} />
              :
              <picture>
                <img src={filePath} width="294" height="360" alt={title} />
              </picture>
          }
        </Link>
      </div>
      <div className="certificate-card__buttons">
        <button
          className={`${buttonClassName}edit`}
          type="button"
          disabled={disabled}
          onClick={(isEditing) ? undefined : handleEditButtonClick}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>Изменить</span>
        </button>
        <button
          className={`${buttonClassName}save`}
          type="button"
          disabled={disabled}
          onClick={(isEditing) ? handleSaveButtonClick : undefined}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>Сохранить</span>
        </button>
        <div className="certificate-card__controls">
          <button
            className="btn-icon certificate-card__control"
            type="button"
            aria-label="next"
            disabled={disabled}
            onClick={(isEditing) ? handleChangeButtonClick : undefined}
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change" />
            </svg>
          </button>
          <button
            className="btn-icon certificate-card__control"
            type="button"
            aria-label="next"
            disabled={disabled}
            onClick={(isEditing) ? handleDeleteButtonClick : undefined}
          >
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
