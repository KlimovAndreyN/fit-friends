import { Link } from 'react-router-dom';

type ThumbnailLinkProps = {
  title: string;
  svg: string;
  to: string;
}

function ThumbnailLink({ title, svg, to }: ThumbnailLinkProps): JSX.Element {
  return (
    <Link className="thumbnail-link thumbnail-link--theme-light" to={to}>
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
        <svg width="30" height="26" aria-hidden="true">
          <use xlinkHref={svg}></use>
        </svg>
      </div>
      <span className="thumbnail-link__text">{title}</span>
    </Link >
  );
}

export default ThumbnailLink;
