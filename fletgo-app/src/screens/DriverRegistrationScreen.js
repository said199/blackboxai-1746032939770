import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { useUser } from '../context/UserContext';
import { useUserMode } from '../context/UserModeContext';

const items = [
  { label: 'Información básica', icon: 'cloud-upload-outline', screen: 'BasicInfo' },
  { label: 'Tarjeta de identificación', icon: 'cloud-upload-outline', screen: 'IDCard' },
  { label: 'Licencia de conducir', icon: 'cloud-upload-outline', screen: 'DriverLicense' },
  { label: 'Carta de antecedentes Penales/Policiales', icon: 'cloud-upload-outline', screen: 'CriminalRecord' },
  { label: 'Información acerca del vehículo', icon: 'cloud-upload-outline', screen: 'VehicleInfo' },
  { label: 'Cuenta Bancaria', icon: 'cloud-upload-outline', screen: 'BankAccount' },
];

export default function DriverRegistrationScreen({ navigation }) {
  const { updateUserData } = useUser();
  const { toggleDriverMode } = useUserMode();

  const handleAccept = () => {
    // Update user context to mark driver as registered
    updateUserData({ isDriverRegistered: true });
    // Enable driver mode
    toggleDriverMode();
    // Navigate to Home screen
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verificación</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {items.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate(item.screen)}>
            <MaterialCommunityIcons name={item.icon} size={24} color={colors.secondary} />
            <Text style={styles.itemLabel}>{item.label}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
        ))}
        <CustomButton
          title="ACEPTAR"
          onPress={handleAccept}
          style={styles.acceptButton}
          textStyle={styles.acceptButtonText}
        />
        <Text style={styles.termsText}>
          Al tocar «Enviar», acepto los Términos y condiciones, así como reconozco y acepto el procesamiento y la transferencia de datos personales de acuerdo con la Política de privacidad
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  itemLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: colors.primary,
  },
  acceptButton: {
    backgroundColor: colors.secondary,
    marginTop: 30,
    borderRadius: 4,
    height: 50,
  },
  acceptButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  termsText: {
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
});
