import { ChangeEvent, MutableRefObject } from 'react';

import { onFileInputChange } from '../../types/types';

type ImageUploadInputProps = {
  name?: string;
  className?: string;
  acceptTypes?: string;
  onChange: onFileInputChange;
  readonly?: boolean;
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

function ImageUploadInput(props: ImageUploadInputProps): JSX.Element {
  const { name, className, acceptTypes = 'image/*', onChange, readonly, inputRef } = props;

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
      disabled={readonly}
      ref={inputRef}
    />
  );
}

export default ImageUploadInput;
