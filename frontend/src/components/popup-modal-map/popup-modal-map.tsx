import { JSX, useEffect, useRef } from 'react';
import { Icon, layerGroup, Marker } from 'leaflet';

import PopupModal from '../popup-modal/popup-modal';

import useMap from '../../hooks/use-map';
import { PlaceLocation } from '../../types/types';

const defaultCustomIcon = new Icon({
  iconUrl: '/img/sprite/icon-pin-user.svg',
  iconSize: [40, 49],
  iconAnchor: [40, 49]
});

// height: 623px у картинки img/content/popup/map.jpg
const MAP_HEIGHT = '623px';

type PopupModalMapProps = {
  title: string;
  address: string;
  startPlaceLocation: PlaceLocation;
  startZomm: number;
  placeLocation: PlaceLocation;
  onClose: () => void;
}

function PopupModalMap(props: PopupModalMapProps): JSX.Element {
  const { title, address, startPlaceLocation, startZomm, placeLocation, onClose } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, startPlaceLocation, startZomm);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const { latitude: lat, longitude: lng } = placeLocation;
      const marker = new Marker({ lat, lng });

      marker.setIcon(defaultCustomIcon).addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, placeLocation]);

  const content = (
    <div className="popup__map">
      <section ref={mapRef} style={{ height: MAP_HEIGHT }} />
    </div>
  );

  return (
    <PopupModal
      title={title}
      additionalHeadElement={
        <p className="popup-head__address">
          <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-location" />
          </svg>
          <span>{address}</span>
        </p>
      }
      wrapperClassNamePostfix='map'
      headClassNamePostfix='address'
      contentClassNamePostfix='map'
      content={content}
      onClose={onClose}
    />
  );
}

export default PopupModalMap;
