import { JSX } from 'react';
import classNames from 'classnames';

type PersonalAccountBlockProps = {
  mainClassNamePrefix: string;
  extraClassNamePrefix?: string;
  extraClassNameForDiv?: boolean;
  title: string;
  children: JSX.Element;
}

function PersonalAccountBlock({ mainClassNamePrefix, extraClassNamePrefix = '', extraClassNameForDiv, title, children }: PersonalAccountBlockProps): JSX.Element {
  const divMainClassName = `${mainClassNamePrefix}__section`;
  const h2MainClassName = `${mainClassNamePrefix}__title`;
  const divClassName = classNames(divMainClassName, { [`${divMainClassName}--${extraClassNamePrefix}`]: extraClassNamePrefix && extraClassNameForDiv });
  const h2ClassName = classNames(h2MainClassName, { [`${h2MainClassName}--${extraClassNamePrefix}`]: extraClassNamePrefix });

  return (
    <div className={divClassName}>
      <h2 className={h2ClassName}>{title}</h2>
      {children}
    </div>
  );
}

export default PersonalAccountBlock;
