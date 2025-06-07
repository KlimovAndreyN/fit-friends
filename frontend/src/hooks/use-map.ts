import { useEffect, useState, RefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { LeafletOption } from '../const';
import { PlaceLocation } from '../types/types';

function useMap(
  mapRef: RefObject<HTMLElement | null>,
  startLocation: PlaceLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    const { latitude: lat, longitude: lng, zoom } = startLocation;
    const center = { lat, lng };

    if (mapRef.current && !isRenderedRef.current) {
      const { URL_TEMPLATE, OPTIONS } = LeafletOption;
      const instance = new Map(mapRef.current, { center, zoom });
      const layer = new TileLayer(URL_TEMPLATE, OPTIONS);

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.setView(center, zoom);
    }
  }, [map, mapRef, startLocation]);

  return map;
}

export default useMap;
