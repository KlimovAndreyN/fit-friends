import { JSX, ChangeEvent, MutableRefObject } from 'react';

import { OnFileInputChange } from '../../types/types';

type ImageUploadInputProps = {
  name?: string;
  className?: string;
  acceptTypes?: string;
  onChange: OnFileInputChange;
  readOnly?: boolean;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

function ImageUploadInput(props: ImageUploadInputProps): JSX.Element {
  const { name, className, acceptTypes = 'image/*', onChange, readOnly, inputRef } = props;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const file = files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          onChange(reader.result as string, file);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <input
      className={className}
      type="file"
      name={name}
      accept={acceptTypes}
      onChange={handleImageChange}
      disabled={readOnly}
      ref={inputRef}
    />
  );
}

export default ImageUploadInput;
