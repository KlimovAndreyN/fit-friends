import classNames from 'classnames';

type CertificateCards = {
  title: string;
  filePath: string;
  isEditing: boolean;
}

function CertificateCard({ title, filePath, isEditing }: CertificateCards): JSX.Element {
  //! только набросок
  //! кнопки можно массивом

  const className = classNames('certificate-card', { 'certificate-card--edit': isEditing });

  return (
    <div className={className}>
      <div className="certificate-card__image">
        <picture>
          <img src={filePath} width="294" height="360" alt={title} />
        </picture>
      </div>
      <div className="certificate-card__buttons">
        <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"/>
          </svg>
          <span>Изменить</span>
        </button>
        <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"/>
          </svg>
          <span>Сохранить</span>
        </button>
        <div className="certificate-card__controls">
          <button className="btn-icon certificate-card__control" type="button" aria-label="next">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"/>
            </svg>
          </button>
          <button className="btn-icon certificate-card__control" type="button" aria-label="next">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
