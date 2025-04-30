import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { verifyOTP } from '../services/api';
import { useUser } from '../context/UserContext';

export default function VerificationScreen({ navigation, route }) {
  const { updateUserData } = useUser();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email, isLogin, nombre } = route.params || {};

  const inputRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Limpiar mensaje de error si existe
    if (error) setError('');

    // Si se ingresó un número y no es el último campo, mover al siguiente
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Si se presiona borrar y el campo está vacío, mover al anterior
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerification = async () => {
    // Validar que todos los dígitos estén completos
    if (otp.some(digit => digit === '')) {
      setError('Por favor ingresa el código completo');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'No se pudo obtener el correo electrónico');
      return;
    }

    setIsLoading(true);
    try {
      const success = await verifyOTP(email, otp);
      
      if (success) {
        // Ensure user data is set in context
        updateUserData({
          name: nombre,
          email: email,
          isVerified: true
        });

        if (isLogin) {
          // Si es login, mostrar mensaje de bienvenida
          Alert.alert(
            'Bienvenido',
            'Has iniciado sesión correctamente',
            [
              { 
                text: 'OK',
                onPress: () => navigation.replace('Home')
              }
            ]
          );
        } else {
          // Si es registro, mostrar mensaje de cuenta creada
          Alert.alert(
            'Cuenta Verificada',
            'Tu cuenta ha sido verificada exitosamente',
            [
              { 
                text: 'OK',
                onPress: () => navigation.replace('Home')
              }
            ]
          );
        }
      } else {
        setError('Código de verificación incorrecto');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Error al verificar el código. Por favor, intente nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    Alert.alert('Reenviar código', 'Se ha reenviado el código a tu WhatsApp');
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
        <Text style={styles.headerTitle}>Verificación</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Ingresa el código de verificación</Text>
        <Text style={styles.subtitle}>
          {isLogin 
            ? `Hola ${nombre}, ingresa el código que recibiste en tu WhatsApp para iniciar sesión`
            : 'Enviamos un código de 4 dígitos a tu WhatsApp para verificar tu cuenta'}
        </Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.otpInput,
                error && styles.otpInputError
              ]}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              editable={!isLoading}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>¿No recibiste el código? </Text>
          <TouchableOpacity onPress={handleResend} disabled={isLoading}>
            <Text style={[styles.resendLink, isLoading && styles.resendLinkDisabled]}>
              Reenviar
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Continuar"
          onPress={handleVerification}
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
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderColor: colors.secondary,
    fontSize: 24,
    textAlign: 'center',
    color: colors.primary,
  },
  otpInputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: colors.text,
    fontSize: 14,
  },
  resendLink: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  resendLinkDisabled: {
    opacity: 0.5,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    width: '100%',
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
