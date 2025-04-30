import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import CountryFlag from '../components/CountryFlag';
import { useUser } from '../context/UserContext';
import { updateUserProfile } from '../services/api';

export function EditProfileScreen({ navigation }) {
  const { userData, updateUserData } = useUser();
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: '94738547',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateUserProfile({
        ...formData,
        userId: userData.id
      });

      if (success) {
        updateUserData(formData);
        Alert.alert(
          'Éxito',
          'Perfil actualizado correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert(
          'Error',
          'No se pudo actualizar el perfil. Por favor, intente nuevamente.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Ocurrió un error al actualizar el perfil'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>

      {/* Profile Photo */}
      <TouchableOpacity 
        style={styles.photoContainer}
        onPress={() => {
          Alert.alert(
            'Foto de Perfil',
            'Esta funcionalidad estará disponible próximamente',
            [{ text: 'OK' }]
          );
        }}
      >
        <Image 
          source={{ uri: userData.photo || 'https://www.fletgohn.com/backend/default-avatar.png' }}
          style={styles.profilePhoto}
        />
        <View style={styles.flag}>
          <CountryFlag code="HN" size={16} />
        </View>
        <View style={styles.editPhotoButton}>
          <MaterialCommunityIcons 
            name="camera" 
            size={20} 
            color={colors.secondary}
          />
        </View>
      </TouchableOpacity>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="Said"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="said@a.com"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
            keyboardType="phone-pad"
          />
        </View>

        <CustomButton
          title="GUARDAR"
          onPress={handleSave}
          style={styles.saveButton}
          loading={isLoading}
          disabled={isLoading}
        />

        <TouchableOpacity style={styles.paymentMethodsButton}>
          <Text style={styles.paymentMethodsText}>Lista de Metodos de Pago</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
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
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
    backgroundColor: colors.background,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.inputBg,
  },
  flag: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: colors.background,
    padding: 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.background,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.inputBg,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    marginVertical: 20,
  },
  paymentMethodsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.inputBg,
  },
  paymentMethodsText: {
    fontSize: 16,
    color: colors.text,
  },
});
