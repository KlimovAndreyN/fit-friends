import { JSX } from 'react';

type UserDetailWrapperGallaryProps = {
  classNamePrefix: string;
  filesPaths: string[];
}

function UserDetailWrapperGallary({ classNamePrefix, filesPaths }: UserDetailWrapperGallaryProps): JSX.Element {
  const mainClassName = `${classNamePrefix}__gallary`;

  return (
    <div className={mainClassName}>
      <ul className={`${mainClassName}-list`}>
        {
          filesPaths.map((filePath, index) => (
            <li className={`${mainClassName}-item`} key={filePath}>
              <img src={filePath} width="334" height="573" alt={`photo${index + 1}`} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default UserDetailWrapperGallary;
