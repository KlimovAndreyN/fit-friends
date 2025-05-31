import { JSX } from 'react';

const DEFAULT_USER_PHOTO_SIZE = 64;
const DEFAULT_SVG_RATIO = 3 / 5;

type UserPhotoProps = {
  path?: string;
  className: string;
  size?: number;
  imageInfo?: string;
}

function UserPhoto({ path, className, size, imageInfo = '' }: UserPhotoProps): JSX.Element {
  const imgSize = size ?? DEFAULT_USER_PHOTO_SIZE;
  const svgSize = imgSize * DEFAULT_SVG_RATIO;

  return (
    <div className={className}>
      {
        (path)
          ?
          <img src={path} width={imgSize} height={imgSize} alt={imageInfo} />
          /* //! закоментировано в маркапах у друзей <!--<div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>--> */
          :
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            width: imgSize,
            height: imgSize,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            border: '1px solid #333'
          }}
          >
            <svg aria-hidden="true" width={svgSize} height={svgSize}><use xlinkHref="#icon-user" /></svg>
          </div>
      }
    </div>
  );
}

export default UserPhoto;
