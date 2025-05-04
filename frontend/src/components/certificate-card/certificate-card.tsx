import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ImageUploadInput from '../image-upload-input/image-upload-input';

import { OnFileInputChange } from '../../types/types';
import { CERTIFICATES_FILE_TYPES } from '../../const';

type CertificateCards = {
  title: string;
  certificateFilePath: string;
  isEditing: boolean;
  disabled?: boolean;
  onEditClick: () => void;
  onSaveClick: OnFileInputChange;
}

function CertificateCard(props: CertificateCards): JSX.Element {
  //! обработка кнопок похожа на обработку аватарки пользовалеля, может объединить?
  //! embed не может через base64, нужно отдать URL.createObjectURL(blob); - "html embed src base64 pdf"
  // скорректировать отображение ПДФ, или при сохранении конвертровать и изображение - сделал embed
  // при клике показать крупнее - сделал ссылку вокруг элемента

  const { title, certificateFilePath, isEditing, disabled, onEditClick, onSaveClick } = props;
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [currentFilePath, setCurrentFilePath] = useState<string>(certificateFilePath);
  const [currentFile, setCurrentFile] = useState<File>();
  const filename = (currentFile) ? currentFile.name : currentFilePath;
  const isPdf = filename.endsWith('.pdf');

  useEffect(() => {
    setCurrentFilePath(certificateFilePath);
    setCurrentFile(undefined);

    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [certificateFilePath, isEditing]);

  const handleImageUploadInputChange = (filePath: string, file: File | undefined) => {
    setCurrentFilePath(filePath);
    setCurrentFile(file);
  };

  const handleEditButtonClick = (event: FormEvent) => {
    event.preventDefault();

    onEditClick();
  };

  const handleSaveButtonClick = (event: FormEvent) => {
    event.preventDefault();

    onSaveClick(currentFilePath, currentFile);
  };

  const handleDivContentClick = (event: FormEvent) => {
    event.preventDefault();

    inputFileRef.current?.click();
  };

  const handleChangeButtonClick = (event: FormEvent) => {
    event.preventDefault();

    inputFileRef.current?.click();
  };

  const handleDeleteButtonClick = (event: FormEvent) => {
    event.preventDefault();

    setCurrentFilePath('');
    setCurrentFile(undefined);
  };

  const className = classNames('certificate-card', { 'certificate-card--edit': isEditing });
  const linkStyle = (isPdf) ? { display: 'inline-block' } : {};
  const buttonClassName = 'btn-flat btn-flat--underlined certificate-card__button certificate-card__button--';
  const image = (currentFilePath)
    ? (<picture><img src={currentFilePath} width="294" height="360" alt={title} /></picture>)
    : <svg width="40" height="40" aria-hidden="true"><use xlinkHref="#icon-change" /></svg>;
  const content = (isPdf)
    ? (<embed src={currentFilePath} width="294" height="360" type="application/pdf" style={{ pointerEvents: 'none' }} />)
    : image;

  return (
    <div className={className}>
      <div className="certificate-card__image">
        {
          (isEditing)
            ?
            <Fragment>
              <ImageUploadInput
                className='visually-hidden'
                acceptTypes={CERTIFICATES_FILE_TYPES}
                inputRef={inputFileRef}
                onChange={handleImageUploadInputChange}
              />
              <div
                onClick={handleDivContentClick}
                className="certificate-card__image"
                style={(currentFilePath) ? {} : { textAlign: 'center', alignContent: 'center' }}
              >
                {content}
              </div>
            </Fragment>
            :
            <Link to={certificateFilePath} target='_blank' style={linkStyle}>
              {content}
            </Link>
        }
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
