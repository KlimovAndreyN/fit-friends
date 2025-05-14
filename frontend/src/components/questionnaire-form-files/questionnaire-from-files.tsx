import { JSX, FormEvent, Fragment, RefObject, useState } from 'react';

import { CERTIFICATES_FILE_TYPES } from '../../const';

type QuestionnaireFormFilesProps = {
  name: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

function QuestionnaireFormFiles({ name, inputRef }: QuestionnaireFormFilesProps): JSX.Element | null {
  const [filesCaption, setFilesCaption] = useState<string | JSX.Element>('Загрузите сюда файлы формата PDF, JPG или PNG');

  const handleFilesInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files) {
      setFilesCaption(
        <Fragment>
          Количество выбранных файлов: {files.length}
          <br />
          {Array.from(files).map(({ name: filename }) =>
            (<Fragment key={filename}>{filename}<br /></Fragment>)
          )}
        </Fragment>
      );
    }
  };

  return (
    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>
          {filesCaption}
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-import" />
          </svg>
        </span>
        <input
          type="file"
          name={name}
          tabIndex={-1}
          accept={CERTIFICATES_FILE_TYPES}
          multiple
          ref={inputRef}
          onChange={handleFilesInputChange}
        />
      </label>
    </div>
  );
}

export default QuestionnaireFormFiles;
