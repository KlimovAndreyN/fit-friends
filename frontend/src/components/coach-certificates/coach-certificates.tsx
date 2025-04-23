import { Fragment, useRef } from 'react';
import classNames from 'classnames';

import { ICertificateRdo } from '@backend/shared/core';

import CertificateCard from '../certificate-card/certificate-card';
import Slider from '../slider/slider';
import SliderButton from '../slider-button/slider-button';
import ImageUploadInput from '../image-upload-input/image-upload-input';

import { useAppDispatch } from '../../hooks';
import { createCoachCertificate } from '../../store/actions/user-profile-action';
import { CERTIFICATES_FILE_TYPES } from '../../const';

const SLIDERS_COUNT = 3;

type CoachCertificatesProps = {
  certificates?: ICertificateRdo[];
  classNamePrefix: string;
}

function CoachCertificates({ certificates = [], classNamePrefix }: CoachCertificatesProps): JSX.Element {
  //! реализовать логику
  //! при выполении добавления, обновления и удаления блокировать остальное
  //! на редактирвоание можно только одну сделать, если не сложно то можно запретить несколько начинать редактировать, а если не будет ошибок то можно и несколько

  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleLoadCertificateButtonClick = () => {
    inputFileRef.current?.click();
  };

  const handleImageUploadInputChange = (_filePath: string, file: File | undefined) => {
    if (file) {
      dispatch(createCoachCertificate(file));
    }
  };

  const loadCertificateButtonOption = {
    secondTitle: 'Загрузить',
    className: classNames('btn-flat', 'btn-flat--underlined', `${classNamePrefix}__button`),
    onClick: handleLoadCertificateButtonClick,
    xlinkHref: '#icon-import',
    width: 14,
    height: 14
  };

  const childrens: JSX.Element[] = certificates.map(
    ({ fileId, filePath, title }) => (
      <CertificateCard {...{ filePath, title, isEditing: false }} key={fileId} />
    )
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
