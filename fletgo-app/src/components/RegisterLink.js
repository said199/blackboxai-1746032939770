import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const RegisterLink = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        <Text>¿No tienes cuenta?</Text>
        {' '}
        <Text style={styles.highlight}>Regístrate aquí</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 14,
  },
  highlight: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default RegisterLink;
