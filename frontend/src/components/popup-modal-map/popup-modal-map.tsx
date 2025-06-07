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

type PopupModalMapProps = {
  title: string;
  address: string;
  onClose: () => void;
}

function PopupModalMap(props: PopupModalMapProps): JSX.Element {
  const { title, address, onClose } = props;
  const mapRef = useRef(null);
  const startLocation: PlaceLocation = { latitude: 59.9275, longitude: 30.2969, zoom: 11 };
  const map = useMap(mapRef, startLocation);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      //const { latitude: lat, longitude: lng } = { latitude: 59.85, longitude: 30.2269 };
      //const { latitude: lat, longitude: lng } = { latitude: 59.85, longitude: 30.469 };
      //const { latitude: lat, longitude: lng } = { latitude: 59.85, longitude: 30.569 };
      //const { latitude: lat, longitude: lng } = { latitude: 59.89, longitude: 30.569 };
      const { latitude: lat, longitude: lng } = { latitude: 59.99, longitude: 30.529 };
      const marker = new Marker({ lat, lng });

      marker.setIcon(defaultCustomIcon).addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map]);

  // height: 623px у картинки img/content/popup/map.jpg
  const content = (
    <div className="popup__map">
      <section ref={mapRef} style={{ height: '623px' }} />
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
