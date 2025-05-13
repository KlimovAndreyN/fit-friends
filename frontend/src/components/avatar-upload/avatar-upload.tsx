import { Fragment, JSX, MouseEvent, useEffect, useRef, useState } from 'react';

import ImageUploadInput from '../image-upload-input/image-upload-input';

import { OnFileInputChange } from '../../types/types';

type AvatarUploadProps = {
  name: string;
  path?: string;
  onChange?: OnFileInputChange;
  forPersonalAccount?: boolean;
  isShowButtons?: boolean;
  readOnly?: boolean;
}

function AvatarUpload(props: AvatarUploadProps): JSX.Element {
  const { name, path = '', onChange, forPersonalAccount, isShowButtons, readOnly } = props;
  const [avatarFilePath, setAvatarFilePath] = useState<string>(path);
  const imageUploadInputRef = useRef<HTMLInputElement | null>(null);

  const spanClassName = (avatarFilePath) ? 'input-load-avatar__avatar' : 'input-load-avatar__btn';
  const inputName = (avatarFilePath) ? name : undefined;
  const svg = (forPersonalAccount)
    ? <svg aria-hidden="true" width="48" height="54"><use xlinkHref="#icon-user" /></svg>
    : <svg aria-hidden="true" width="20" height="20"><use xlinkHref="#icon-import" /></svg>;
  const image =
    (avatarFilePath)
      ? <img src={avatarFilePath} width="98" height="98" alt="user photo" />
      : svg;

  useEffect(() => {
    setAvatarFilePath(path);

    if (imageUploadInputRef.current) {
      imageUploadInputRef.current.value = '';
    }
  }, [path, readOnly]);

  const handleImageUploadInputChange = (filePath: string, file: File | undefined) => {
    if (onChange) {
      onChange(filePath, file);
    } else {
      setAvatarFilePath(filePath);
    }
  };

  const handleEditButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    imageUploadInputRef.current?.click();
  };

  const handleDeleteButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    if (onChange) {
      onChange('', undefined);
    } else {
      setAvatarFilePath('');
    }

    if (imageUploadInputRef.current) {
      imageUploadInputRef.current.value = '';
    }
  };

  return (
    <Fragment>
      <div className="input-load-avatar">
        <label>
          <ImageUploadInput
            name={inputName}
            className='visually-hidden'
            acceptTypes='image/png, image/jpeg'
            onChange={handleImageUploadInputChange}
            inputRef={imageUploadInputRef}
            readOnly={readOnly}
          />
          <span className={spanClassName}>
            {image}
          </span>
        </label>
      </div>
      {
        isShowButtons &&
        <div className="user-info-edit__controls">
          <button className="user-info-edit__control-btn" aria-label="обновить" onClick={handleEditButtonClick}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change" />
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить" onClick={handleDeleteButtonClick}>
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash" />
            </svg>
          </button>
        </div>
      }
    </Fragment>
  );
}

export default AvatarUpload;
