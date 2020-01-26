import React from 'react';
import { GeoJSON } from 'react-leaflet';

import Popup from './Popup';
import ReactLeafletPopup from './Popup/ReactLeafletPopup';

const Offices = ({ offices, results }) => {
  const handleOfficePopup = ({ properties: office }, layer) => {
    const data = results.filter(result => result.num_bv === Number(office.num_bv));

    layer.bindPopup(new ReactLeafletPopup({
      reactComponent: Popup,
      reactComponentProps: {
        office,
        data
      }
    }));
  }

  return <GeoJSON data={offices} onEachFeature={handleOfficePopup} />;
};

export default Offices;