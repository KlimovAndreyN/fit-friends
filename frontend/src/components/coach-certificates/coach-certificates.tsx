import { Fragment, useRef, useState } from 'react';
import classNames from 'classnames';

import CertificateCard from '../certificate-card/certificate-card';
import Slider from '../slider/slider';
import SliderButton from '../slider-button/slider-button';
import ImageUploadInput from '../image-upload-input/image-upload-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { createCoachCertificate } from '../../store/actions/user-profile-action';
import { getCoachCertificates, getIsUpdateCoachCertificatesExecuting } from '../../store/user-profile-process/selectors';
import { CERTIFICATES_FILE_TYPES } from '../../const';

const SLIDERS_COUNT = 3;

type CoachCertificatesProps = {
  classNamePrefix: string;
}

function CoachCertificates({ classNamePrefix }: CoachCertificatesProps): JSX.Element {
  //! реализовать логику
  //! при выполении добавления, обновления и удаления блокировать остальное
  //! на редактирвоание можно только одну сделать, если не сложно то можно запретить несколько начинать редактировать, а если не будет ошибок то можно и несколько
  //! при забросе добавления, редактирования и удаления блокировать кнопки! isUpdateCoachCertificatesExecuting

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

  const handleSaveButtonClick = () => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleSaveButtonClick', editingCertificateFileId);
    setEditingCertificateFileId(''); //! врменно, потом через обновление данных
  };

  const handleChangeButtonClick = () => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleChangeButtonClick', editingCertificateFileId);
  };

  const handleDeleteButtonClick = () => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleDeleteButtonClick', editingCertificateFileId);
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
      const disabled = isUpdateCoachCertificatesExecuting;

      const handleEditButtonClick = () => {
        setEditingCertificateFileId(fileId);
      };

      return (
        <CertificateCard
          key={fileId}
          filePath={filePath}
          title={title}
          isEditing={isEditing}
          disabled={disabled}
          onEditClick={handleEditButtonClick}
          onSaveClick={handleSaveButtonClick}
          onChangeClick={handleChangeButtonClick}
          onDeleteClick={handleDeleteButtonClick}
        />
      );
    }
  );

  return (
    <Slider
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
