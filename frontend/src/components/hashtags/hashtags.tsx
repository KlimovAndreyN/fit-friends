import { CSSProperties, JSX } from 'react';
import classNames from 'classnames';

type HashtagsProps = {
  items: string[];
  listClassName: string;
  itemClassName?: string;
  divItemClassName?: string;
  style?: CSSProperties;
}

function Hashtags({ items, listClassName, itemClassName, divItemClassName, style }: HashtagsProps): JSX.Element {
  return (
    <ul className={listClassName} style={style}>
      {
        items.map(
          (item) => (
            <li className={itemClassName} key={item}>
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
