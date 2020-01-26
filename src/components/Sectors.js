import React from 'react';
import { GeoJSON } from 'react-leaflet';

const Sectors = ({ sectors }) => {
  const styleSectors = feature => {
    return {
      color: `hsla(${(((feature.properties.num_bv + 20) % 100) / 100) * 360}, 100%, 50%, 1)`,
    }
  }

  return <GeoJSON data={sectors} style={styleSectors} />;
};

export default Sectors;