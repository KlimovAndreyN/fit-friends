import { Link } from 'react-router-dom';
import classNames from 'classnames';

type CertificateCards = {
  title: string;
  filePath: string;
  isEditing: boolean;
  disabled?: boolean;
}

function CertificateCard({ title, filePath, isEditing, disabled }: CertificateCards): JSX.Element {
  //! кнопки можно массивом
  // скорректировать отображение ПДФ, или при сохранении конвертровать и изображение - сделал embed
  // при клике показать крупнее - сделал ссылку вокруг элемента

  const className = classNames('certificate-card', { 'certificate-card--edit': isEditing });
  const isPdf = filePath.endsWith('.pdf');
  const linkStyle = (isPdf) ? { display: 'inline-block' } : {};

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
        <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button" disabled={disabled}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>Изменить</span>
        </button>
        <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button" disabled={disabled}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit" />
          </svg>
          <span>Сохранить</span>
        </button>
        <div className="certificate-card__controls">
          <button className="btn-icon certificate-card__control" type="button" aria-label="next" disabled={disabled}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change" />
            </svg>
          </button>
          <button className="btn-icon certificate-card__control" type="button" aria-label="next" disabled={disabled}>
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
