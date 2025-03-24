import { ChangeEvent } from 'react';

type ImageUploadInputProps = {
  name?: string;
  className?: string;
  acceptTypes?: string;
  onChange: (filePath: string, file: File) => void;
  readonly?: boolean;
}

function ImageUploadInput({ name, className, acceptTypes = 'image/*', onChange, readonly }: ImageUploadInputProps): JSX.Element {
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
    />
  );
}

export default ImageUploadInput;
