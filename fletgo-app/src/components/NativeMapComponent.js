import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const NativeMapComponent = ({ style, location }) => {
  if (!location) return null;

  return (
    <MapView
      style={style}
      initialRegion={location}
      provider="google"
      apiKey="AIzaSyAqy_G2t4hBh83VyH6UDaXUYeSnLS-v0ng"
    >
      <Marker coordinate={location} />
    </MapView>
  );
};

export default NativeMapComponent;
