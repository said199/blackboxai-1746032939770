import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { SvgXml } from 'react-native-svg';
import { LogoSvg } from '../assets/images/logo';
import { registerUser } from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    identity: '',
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    identity: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRegister = async () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Ingresa un teléfono válido';
    }

    if (!formData.identity.trim()) {
      newErrors.identity = 'El número de identidad es requerido';
    } else if (formData.identity.length < 13) {
      newErrors.identity = 'El número de identidad debe tener 13 dígitos';
    }

    setErrors(newErrors);

    // Si no hay errores, proceder con el registro
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await registerUser(formData);
        
      if (response.estado) {
        // Registro exitoso, navegar a verificación con el email
        navigation.navigate('Verification', { email: formData.email });
        } else {
          // Error del servidor
          Alert.alert(
            'Error',
            response.descripcion || 'Error al registrar usuario',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Error de conexión. Por favor, intente nuevamente.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar</Text>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <SvgXml xml={LogoSvg} width={280} height={100} />
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Nombre Completo"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Correo"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.identity && styles.inputError]}
            placeholder="Número de Identidad"
            value={formData.identity}
            onChangeText={(text) => handleInputChange('identity', text)}
            keyboardType="number-pad"
            maxLength={13}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
          {errors.identity ? <Text style={styles.errorText}>{errors.identity}</Text> : null}
        </View>

        <CustomButton
          title="CONTINUE"
          onPress={handleRegister}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
          loading={isLoading}
          disabled={isLoading}
        />
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
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 30,
    marginBottom: 40,
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: colors.primary,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    width: '100%',
    marginTop: 45,
    borderRadius: 4,
    height: 50,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
