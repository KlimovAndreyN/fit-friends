import { JSX } from 'react';

import { Location } from '@backend/shared/core';

import { LocationTitle } from '../../const';

type ThumbnailUserProps = {
  location: Location;
  extraClassName: string;
}

function UserLocation({ location, extraClassName }: ThumbnailUserProps): JSX.Element {
  return (
    <div className={`${extraClassName}__location`}>
      <svg width="14" height="16" aria-hidden="true">
        <use xlinkHref="#icon-location"></use>
      </svg>
      <address className={`${extraClassName}__location-address`}>
        {LocationTitle[location]}
      </address>
    </div>
  );
}

export default UserLocation;
