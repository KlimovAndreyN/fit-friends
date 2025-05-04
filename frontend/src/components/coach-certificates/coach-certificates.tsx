import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import CertificateCard from '../certificate-card/certificate-card';
import Slider from '../slider/slider';
import SliderButton from '../slider-button/slider-button';
import ImageUploadInput from '../image-upload-input/image-upload-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { createCoachCertificate, deleteCoachCertificate, updateCoachCertificate } from '../../store/actions/account-action';
import { getCoachCertificates, getIsUpdateCoachCertificatesError, getIsUpdateCoachCertificatesExecuting } from '../../store/account-process/selectors';
import { CERTIFICATES_FILE_TYPES } from '../../const';

const SLIDES_COUNT = 3;

type CoachCertificatesProps = {
  classNamePrefix: string;
}

function CoachCertificates({ classNamePrefix }: CoachCertificatesProps): JSX.Element {
  //! иногда на пдф не работает прамая ссылка на файл, при начеле редактирования других сертификатов или добавления нового или комбинация действий

  const dispatch = useAppDispatch();
  const isUpdateCoachCertificatesExecuting = useAppSelector(getIsUpdateCoachCertificatesExecuting);
  const isUpdateCoachCertificatesError = useAppSelector(getIsUpdateCoachCertificatesError);
  const certificates = useAppSelector(getCoachCertificates);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [editingCertificateFileId, setEditingCertificateFileId] = useState('');

  useEffect(() => {
    if (!isUpdateCoachCertificatesExecuting && !isUpdateCoachCertificatesError) {
      setEditingCertificateFileId('');
    }
  }, [isUpdateCoachCertificatesExecuting, isUpdateCoachCertificatesError]);

  const handleLoadCertificateButtonClick = () => {
    inputFileRef.current?.click();
  };

  const handleImageUploadInputChange = (_filePath: string, file: File | undefined) => {
    if (file) {
      dispatch(createCoachCertificate(file));
    }
  };

  const handleSaveClick = (filePath: string, file: File | undefined) => {
    if (file) {
      //! нужен тип
      dispatch(updateCoachCertificate({ fileId: editingCertificateFileId, file }));
    } else if (filePath) {
      setEditingCertificateFileId('');
    } else {
      dispatch(deleteCoachCertificate(editingCertificateFileId));
    }
  };

  const loadCertificateButtonOption = {
    secondTitle: 'Загрузить',
    className: classNames('btn-flat', 'btn-flat--underlined', `${classNamePrefix}__button`),
    disabled: isUpdateCoachCertificatesExecuting,
    onClick: handleLoadCertificateButtonClick,
    xlinkHref: '#icon-import',
    width: 14,
    height: 14
  };

  const childrens: JSX.Element[] = certificates.map(
    ({ fileId, filePath, title }) => {
      const isEditing = fileId === editingCertificateFileId;

      const handleEditClick = () => {
        setEditingCertificateFileId(fileId);
      };

      return (
        <CertificateCard
          key={fileId}
          certificateFilePath={filePath}
          title={title}
          isEditing={isEditing}
          disabled={isUpdateCoachCertificatesExecuting}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
        />
      );
    }
  );

  return (
    <Slider
      title='Дипломы и сертификаты'
      classNamePrefix={classNamePrefix}
      separator='__'
      mainDivClassNamePostfix='additional-info'
      titleDivClassNamePostfix='label-wrapper'
      titleClassNamePostfix='label'
      additionalTitleElement={
        <Fragment>
          <ImageUploadInput
            className='visually-hidden'
            acceptTypes={CERTIFICATES_FILE_TYPES}
            inputRef={inputFileRef}
            onChange={handleImageUploadInputChange}
          />
          <SliderButton {...loadCertificateButtonOption} />
        </Fragment>
      }
      childrens={childrens}
      slidesCount={SLIDES_COUNT}
      textForEmpty='Загрузите свои диполмы и сертификаты'
    />
  );
}

export default CoachCertificates;
