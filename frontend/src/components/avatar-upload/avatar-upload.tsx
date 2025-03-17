import { useState } from 'react';

import ImageUploadInput from '../image-upload-input/image-upload-input';

type AvatarUploadProps = {
  name?: string;
}

function AvatarUpload({ name }: AvatarUploadProps): JSX.Element {
  const [avatarSrc, setAvatarSrc] = useState<string>();
  const spanClassName = (avatarSrc) ? 'input-load-avatar__avatar' : 'input-load-avatar__btn';
  const inputName = (avatarSrc) ? name : undefined;
  const image =
    (avatarSrc)
      ? <img src={avatarSrc} width="98" height="98" alt="user photo" />
      : <svg width="20" height="20" aria-hidden="true"><use xlinkHref="#icon-import" /></svg>;

  const handleImageUploadInputChange = (filePath: string) => {
    setAvatarSrc(filePath);
  };

  return (
    <div className="sign-up__load-photo">
      <div className="input-load-avatar">
        <label>
          <ImageUploadInput
            name={inputName}
            className='visually-hidden'
            acceptTypes='image/png, image/jpeg'
            onChange={handleImageUploadInputChange}
          />
          <span className={spanClassName}>
            {image}
          </span>
        </label>
      </div>
      <div className="sign-up__description">
        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
        <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
      </div>
    </div>

  );
}

export default AvatarUpload;
