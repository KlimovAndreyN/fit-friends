import classNames from 'classnames';

type HashtagsProps = {
  classNamePrefix: string;
  divItemClassName: string;
  items: string[];
  separator?: string;
}

function Hashtags({ classNamePrefix, divItemClassName, items, separator = '-' }: HashtagsProps): JSX.Element {
  const classNamePrefixWithSeparator = classNamePrefix + separator;

  return (
    <ul className={`${classNamePrefixWithSeparator}list`}>
      {
        items.map(
          (item) => (
            <li className={`${classNamePrefixWithSeparator}item`} key={item}>
              <div className={classNames('hashtag', divItemClassName)}>
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
