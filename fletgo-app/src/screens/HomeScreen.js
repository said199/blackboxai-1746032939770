import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../theme/colors';
import MapComponent from '../components/MapComponent';
import TopBar from '../components/TopBar';
import DestinationModal from '../components/DestinationModal';

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [pointACoords, setPointACoords] = useState(null);
  const [pointBCoords, setPointBCoords] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const getCurrentLocation = useCallback(async () => {
    if (Platform.OS === 'web') {
      setCurrentLocation({
        latitude: 14.0650,
        longitude: -87.1715,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const handleSelectDestination = (description, coords) => {
    setPointB(description);
    setPointBCoords(coords);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <MapComponent
        style={styles.map}
        location={currentLocation}
        pointA={pointACoords}
        pointB={pointBCoords}
      />
      
      <TopBar 
        pointA={pointA} 
        setPointA={setPointA} 
        setPointACoords={setPointACoords}
        navigation={navigation} 
      />

      <DestinationModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectDestination={handleSelectDestination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
