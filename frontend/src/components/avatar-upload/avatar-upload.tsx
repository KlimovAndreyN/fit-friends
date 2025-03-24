import { useState } from 'react';

import ImageUploadInput from '../image-upload-input/image-upload-input';

type AvatarUploadProps = {
  name: string;
  path?: string;
  forPersonalAccount?: boolean;
  disabled?: boolean;
}

function AvatarUpload({ name, path = '', forPersonalAccount, disabled }: AvatarUploadProps): JSX.Element {
  const [avatarPath, setAvatarPath] = useState<string>(path);
  const spanClassName = (avatarPath) ? 'input-load-avatar__avatar' : 'input-load-avatar__btn';
  const inputName = (avatarPath) ? name : undefined;
  const svg = (forPersonalAccount)
    ? <svg aria-hidden="true" width="48" height="54"><use xlinkHref="#icon-user" /></svg>
    : <svg aria-hidden="true" width="20" height="20"><use xlinkHref="#icon-import" /></svg>;
  const image =
    (avatarPath)
      ? <img src={avatarPath} width="98" height="98" alt="user photo" />
      : svg;

  const handleImageUploadInputChange = (filePath: string) => {
    setAvatarPath(filePath);
  };

  return (
    <div className="input-load-avatar">
      <label>
        <ImageUploadInput
          name={inputName}
          className='visually-hidden'
          acceptTypes='image/png, image/jpeg'
          onChange={handleImageUploadInputChange}
          disabled={disabled}
        />
        <span className={spanClassName}>
          {image}
        </span>
      </label>
    </div>
  );
}

export default AvatarUpload;
