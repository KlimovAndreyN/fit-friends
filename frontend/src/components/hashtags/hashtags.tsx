import classNames from 'classnames';

type HashtagsProps = {
  classNamePrefix: string;
  divItemClassNamePrefix: string;
  items: string[];
  separator?: string;
}

function Hashtags({ classNamePrefix, divItemClassNamePrefix, items, separator = '-' }: HashtagsProps): JSX.Element {
  const classNamePrefixWithSeparator = `${classNamePrefix}__hashtags${separator}`;

  return (
    <ul className={`${classNamePrefixWithSeparator}list`}>
      {
        items.map(
          (item) => (
            <li className={`${classNamePrefixWithSeparator}item`} key={item}>
              <div className={classNames('hashtag', `${divItemClassNamePrefix}__hashtag`)}>
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
