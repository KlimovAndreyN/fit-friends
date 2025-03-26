import { Fragment, useState } from 'react';

import ImageUploadInput from '../image-upload-input/image-upload-input';

type AvatarUploadProps = {
  name: string;
  path?: string;
  forPersonalAccount?: boolean;
  isShowButtons?: boolean;
  readonly?: boolean;
}

function AvatarUpload({ name, path = '', forPersonalAccount, isShowButtons, readonly }: AvatarUploadProps): JSX.Element {
  const [avatarFilePath, setAvatarFilePath] = useState<string>(path);
  const spanClassName = (avatarFilePath) ? 'input-load-avatar__avatar' : 'input-load-avatar__btn';
  const inputName = (avatarFilePath) ? name : undefined;
  const svg = (forPersonalAccount)
    ? <svg aria-hidden="true" width="48" height="54"><use xlinkHref="#icon-user" /></svg>
    : <svg aria-hidden="true" width="20" height="20"><use xlinkHref="#icon-import" /></svg>;
  const image =
    (avatarFilePath)
      ? <img src={avatarFilePath} width="98" height="98" alt="user photo" />
      : svg;

  const handleImageUploadInputChange = (filePath: string) => {
    setAvatarFilePath(filePath);
    //! нужно прокинуть на верх файл, он вторым параметром
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
            readonly={readonly}
          />
          <span className={spanClassName}>
            {image}
          </span>
        </label>
      </div>
      {
        //! нужны обработчики на кнопки
        (isShowButtons)
          ?
          <div className="user-info-edit__controls">
            <button className="user-info-edit__control-btn" aria-label="обновить">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button className="user-info-edit__control-btn" aria-label="удалить">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
          :
          null
      }
    </Fragment>
  );
}

export default AvatarUpload;
