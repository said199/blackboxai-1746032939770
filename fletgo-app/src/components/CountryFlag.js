import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { flags } from '../assets/flags';

const CountryFlag = ({ code, size = 24 }) => {
  const flagUrl = flags[code];

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: flagUrl }}
        style={[styles.flag, { width: size * 1.5, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    borderRadius: 2,
  },
});

export default CountryFlag;
