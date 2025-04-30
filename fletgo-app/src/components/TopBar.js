import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import AutocompleteInput from './AutocompleteInput';

const TopBar = ({ pointA, setPointA, setPointACoords, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.locationIcon}>
          <Ionicons name="location-sharp" size={20} color={colors.primary} />
        </View>
        <View style={styles.autocompleteWrapper}>
          <AutocompleteInput
            placeholder="¿Origen mercadería?"
            value={pointA}
            onChangeText={setPointA}
            onSelect={({ description, latitude, longitude }) => {
              setPointA(description);
              if (latitude && longitude) {
                setPointACoords({ latitude, longitude });
              }
            }}
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingVertical: 5,
  },
  menuButton: {
    padding: 10,
    zIndex: 1,
  },
  locationIcon: {
    padding: 5,
    zIndex: 1,
  },
  searchButton: {
    padding: 10,
    zIndex: 1,
  },
  autocompleteWrapper: {
    flex: 1,
    zIndex: 9999,
  },
  autocompleteContainer: {
    flex: 0,
  },
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: colors.primary,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
  listView: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: 4,
    elevation: 3,
    zIndex: 9999,
  },
  row: {
    padding: 13,
    height: 44,
    fontSize: 14,
  },
  description: {
    color: colors.primary,
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inputBg,
  },
});

export default TopBar;
