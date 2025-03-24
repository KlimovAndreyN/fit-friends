import { ChangeEvent } from 'react';

type ImageUploadInputProps = {
  name?: string;
  className?: string;
  acceptTypes?: string;
  onChange: (filePath: string, file: File) => void;
  disabled?: boolean;
}

function ImageUploadInput({ name, className, acceptTypes = 'image/*', onChange, disabled }: ImageUploadInputProps): JSX.Element {
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
      disabled={disabled}
    />
  );
}

export default ImageUploadInput;
