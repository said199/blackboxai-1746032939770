import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function BasicInfoScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');

  const validateDate = (text) => {
    // Permitir solo números y /
    const cleaned = text.replace(/[^\d/]/g, '');

    // Formatear automáticamente como DD/MM/AAAA
    let formatted = cleaned;
    if (cleaned.length >= 2 && !cleaned.includes('/')) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 5 && cleaned.split('/').length === 2) {
      const parts = cleaned.split('/');
      formatted = parts[0] + '/' + parts[1].slice(0, 2) + '/' + parts[1].slice(2);
    }

    setBirthDate(formatted);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (!fullName.trim() || !birthDate.trim() || !email.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    // Validar formato de fecha DD/MM/AAAA
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(birthDate)) {
      Alert.alert('Error', 'Por favor ingrese una fecha válida en formato DD/MM/AAAA');
      return;
    }

    // Validar correo electrónico
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
      return;
    }

    Alert.alert('Guardado', 'Información básica guardada correctamente.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Información Básica</Text>
      </View>

      <MaterialIcons name="person" size={64} color={colors.primary} style={styles.icon} />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre completo"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={birthDate}
          onChangeText={validateDate}
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>

      <Text style={styles.helpText}>
        Si tiene preguntas, por favor, contacte servicio de asistencia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpText: {
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
});
