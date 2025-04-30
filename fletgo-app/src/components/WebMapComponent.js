import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const WebMapComponent = ({ style }) => {
  return (
    <View style={[style, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
      <Ionicons name="map-outline" size={100} color={colors.text} />
    </View>
  );
};

export default WebMapComponent;
