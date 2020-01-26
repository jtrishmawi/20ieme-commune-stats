import React from 'react';
import { Map as Leaflet, TileLayer } from 'react-leaflet';

import { useData } from '../state';

import Offices from '../components/Offices';
import Sectors from '../components/Sectors';

const Map = () => {
  const [{ results, sectors, offices }] = useData();
  
  return (
    <Leaflet
      center={{ lat: 48.8649161, lon: 2.3984708 }}
      zoom={14}
      style={{ width: '100%', height: '100%', }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution='&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright'
      />
      <Offices offices={offices} results={results} />
      <Sectors sectors={sectors} />
    </Leaflet>
  );
};

export default Map;