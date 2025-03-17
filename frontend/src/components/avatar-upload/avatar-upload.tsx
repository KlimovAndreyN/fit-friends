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
  );
}

export default AvatarUpload;
