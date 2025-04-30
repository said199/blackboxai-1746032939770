import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { colors } from '../theme/colors';

const PhoneInput = ({ value, onChangeText, error }) => {
  const [countryCode, setCountryCode] = useState('HN');
  const [callingCode, setCallingCode] = useState('504');

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          withAlphaFilter
          withCallingCodeButton
          withEmoji
          onSelect={onSelect}
          containerButtonStyle={styles.countryPicker}
          visible={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          maxLength={8}
          placeholderTextColor={colors.text}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: colors.primary,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
});

export default PhoneInput;
