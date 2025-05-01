import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';

export default function IDCardScreen({ navigation }) {
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState(null); // 'front' or 'back'

  const openModal = (photoType) => {
    setCurrentPhotoType(photoType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentPhotoType(null);
  };

  const askCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log('Camera permission status:', status);
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara.');
      return false;
    }
    return true;
  };

  const askGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Gallery permission status:', status);
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await askCameraPermission();
      if (!hasPermission) return;

      console.log('Launching camera...');
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      console.log('Camera result:', result);

      if (!result.cancelled) {
        if (currentPhotoType === 'front') {
          setFrontPhoto(result.uri);
        } else if (currentPhotoType === 'back') {
          setBackPhoto(result.uri);
        }
        closeModal();
      }
    } catch (error) {
      console.error('Error launching camera:', error);
      Alert.alert('Error', 'No se pudo abrir la cámara. Intenta nuevamente.');
    }
  };

  const pickImage = async () => {
    const hasPermission = await askGalleryPermission();
    if (!hasPermission) return;

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.cancelled) {
      if (currentPhotoType === 'front') {
        setFrontPhoto(result.uri);
      } else if (currentPhotoType === 'back') {
        setBackPhoto(result.uri);
      }
      closeModal();
    }
  };

  const handleSave = () => {
    if (!frontPhoto || !backPhoto) {
      Alert.alert('Error', 'Por favor agregue ambas fotos antes de guardar.');
      return;
    }
    Alert.alert('Guardado', 'Tarjetas de identificación guardadas correctamente.');
    navigation.goBack();
  };

  const isSaveDisabled = !frontPhoto || !backPhoto;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Identificación</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tarjeta de Identificación (frente)</Text>
        <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openModal('front')}>
          {frontPhoto ? (
            <Image source={{ uri: frontPhoto }} style={styles.photo} resizeMode="contain" />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
              <Text style={styles.photoText}>Toca para agregar foto</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tarjeta de Identificación (parte trasera)</Text>
        <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openModal('back')}>
          {backPhoto ? (
            <Image source={{ uri: backPhoto }} style={styles.photo} resizeMode="contain" />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
              <Text style={styles.photoText}>Toca para agregar foto</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSaveDisabled && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaveDisabled}
      >
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>

      <Text style={styles.helpText}>
        Si tiene preguntas, por favor, contacte servicio de asistencia.
      </Text>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} activeOpacity={1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona la fuente de la imagen</Text>
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <Text style={styles.modalOptionText}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Text style={styles.modalOptionText}>Seleccionar de la Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={closeModal}>
              <Text style={[styles.modalOptionText, styles.modalCancelText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  photoPlaceholder: {
    height: 150,
    borderWidth: 2,
    borderColor: colors.inputBg,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    marginTop: 10,
    color: colors.text,
    fontSize: 14,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 15,
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.primary,
  },
  modalCancelText: {
    color: 'red',
  },
});
