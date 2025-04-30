import { Fragment, useRef, useState } from 'react';
import classNames from 'classnames';

import CertificateCard from '../certificate-card/certificate-card';
import SliderDiv from '../slider-div/slider-div';
import SliderButton from '../slider-button/slider-button';
import ImageUploadInput from '../image-upload-input/image-upload-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { createCoachCertificate, deleteCoachCertificate, updateCoachCertificate } from '../../store/actions/user-profile-action';
import { getCoachCertificates, getIsUpdateCoachCertificatesExecuting } from '../../store/user-profile-process/selectors';
import { CERTIFICATES_FILE_TYPES } from '../../const';

const SLIDERS_COUNT = 3;

type CoachCertificatesProps = {
  classNamePrefix: string;
}

function CoachCertificates({ classNamePrefix }: CoachCertificatesProps): JSX.Element {
  //! при запросе добавления, редактирования и удаления блокировать кнопки! isUpdateCoachCertificatesExecuting
  //! при изменении и удалении на короткое врямя рисуется старый элемент - нужно попртавить
  //! иногда на пдф не работает прамая ссылка на файл, при начеле редактирования других сертификатов или добавления нового или комбинация действий

  const dispatch = useAppDispatch();
  const isUpdateCoachCertificatesExecuting = useAppSelector(getIsUpdateCoachCertificatesExecuting);
  const certificates = useAppSelector(getCoachCertificates);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [editingCertificateFileId, setEditingCertificateFileId] = useState('');

  const handleLoadCertificateButtonClick = () => {
    inputFileRef.current?.click();
  };

  const handleImageUploadInputChange = (_filePath: string, file: File | undefined) => {
    if (file) {
      dispatch(createCoachCertificate(file));
    }
  };

  const handleSaveClick = (_filePath: string, file: File | undefined) => {
    if (file) {
      //! нужен тип
      dispatch(updateCoachCertificate({ fileId: editingCertificateFileId, file }));
    } else {
      dispatch(deleteCoachCertificate(editingCertificateFileId));
    }

    //! врменно, потом через обновление данных
    setEditingCertificateFileId('');
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
    <SliderDiv
      title='Дипломы и сертификаты'
      isLabel
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
      classNamePrefix={classNamePrefix}
      divClassName={`${classNamePrefix}__additional-info`}
      slidesCount={SLIDERS_COUNT}
    />
  );
}

export default CoachCertificates;
