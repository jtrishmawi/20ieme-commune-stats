import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapProvider from '@bootstrap-styled/provider';
import L from 'leaflet';

import App from './App';

import theme from './theme';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

ReactDOM.render(
  <BootstrapProvider reset injectGlobal theme={theme}>
    <App />
  </BootstrapProvider>
  , document.getElementById('root'));
