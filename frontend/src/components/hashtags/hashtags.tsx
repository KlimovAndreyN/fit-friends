import { JSX } from 'react';
import classNames from 'classnames';

type HashtagsProps = {
  classNamePrefix: string;
  divItemClassNamePrefix?: string;
  items: string[];
  separator?: string;
  isNotNeedSpecialClassName?: boolean;
}

function Hashtags({ classNamePrefix, divItemClassNamePrefix = '', items, separator = '-', isNotNeedSpecialClassName }: HashtagsProps): JSX.Element {
  const specialClassName = (isNotNeedSpecialClassName) ? '' : '__hashtags';
  const classNamePrefixWithSeparator = classNamePrefix + specialClassName + separator;
  const divItemClassName = classNames(
    'hashtag',
    { [`${divItemClassNamePrefix}${(isNotNeedSpecialClassName) ? '' : '__hashtag'}`]: divItemClassNamePrefix });

  return (
    <ul className={`${classNamePrefixWithSeparator}list`}>
      {
        items.map(
          (item) => (
            <li className={`${classNamePrefixWithSeparator}item`} key={item}>
              <div className={divItemClassName}>
                <span>{`#${item}`}</span>
              </div>
            </li>
          )
        )
      }
    </ul>
  );
}

export default Hashtags;
