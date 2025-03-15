import { useState } from 'react';

import ImageUploadInput from '../image-upload-input/image-upload-input';

/*
<div class="input-load-avatar">
                  <label>
                    <input class="visually-hidden" type="file" accept="image/png, image/jpeg">
                    <span class="input-load-avatar__btn">
                      <svg width="20" height="20" aria-hidden="true">
                                             <use xlink:href="#icon-import"></use>
                                                                  </svg>
                                                                  </span>
                  </label>
                </div>

<div class="input-load-avatar">
                  <label>
                    <input class="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg">
                      <span class="input-load-avatar__avatar">
                        <img src="img/content/user-photo-1.png" srcset="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo">
                      </span>
                  </label>
                </div>
*/

type AvatarLoadInputProps = {
  path?: string;
  onChange: (file: File) => void;
}

function AvatarLoadInput({ path = '', onChange }: AvatarLoadInputProps): JSX.Element {
  const [avatarSrc, setAvatarSrc] = useState<string>(path);

  const handleImageUploadInputChange = (filePath: string, file: File) => {
    setAvatarSrc(filePath);

    console.log('filePath', filePath);
    console.log('file', file);
    onChange(file);
  };

  return (
    <div className="input-load-avatar">
      <label>
        <ImageUploadInput name={(avatarSrc) ? 'user-photo-1' : undefined} className='visually-hidden' acceptTypes='image/png, image/jpeg' onChange={handleImageUploadInputChange} />
        {
          (avatarSrc)
            ?
            <span className="input-load-avatar__avatar">
              <img src={avatarSrc} width="98" height="98" alt="user photo" />
            </span>
            :
            <span className="input-load-avatar__btn">
              <svg width="20" height="20" aria-hidden="true"><use xlinkHref="#icon-import" /></svg>
            </span>
        }
      </label>
    </div>
  );
}

export default AvatarLoadInput;
