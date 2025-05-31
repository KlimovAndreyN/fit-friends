import { JSX } from 'react';
import classNames from 'classnames';

type HashtagsProps = {
  items: string[];
  listClassName: string;
  itemClassName?: string;
  divItemClassName?: string;
}

function Hashtags({ listClassName, itemClassName, divItemClassName, items }: HashtagsProps): JSX.Element {
  return (
    <ul className={listClassName}>
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
