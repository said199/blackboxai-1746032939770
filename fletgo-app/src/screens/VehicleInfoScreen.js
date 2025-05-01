import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';

const vehicleTypes = ['camión', 'volqueta', 'rastra'];
const geographicAreas = ['Centro América', 'Nacional', 'Departamental', 'Municipio'];
const volumeTypes = ['Kilómetros cúbicos', 'Hectómetros cúbicos', 'Metros cúbicos'];
const cargoTypes = ['Carga general', 'Carga pesada', 'Carga frágil'];

export default function VehicleInfoScreen({ navigation }) {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [brand, setBrand] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const [rightPhoto, setRightPhoto] = useState(null);
  const [leftPhoto, setLeftPhoto] = useState(null);
  const [geographicArea, setGeographicArea] = useState(null);
  const [cargoCapacity, setCargoCapacity] = useState('');
  const [volumeType, setVolumeType] = useState(null);
  const [volumeCapacity, setVolumeCapacity] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [cargoType, setCargoType] = useState(null);
  const [hasLoad, setHasLoad] = useState(false);
  const [hasUnload, setHasUnload] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState(null); // to know which field is being selected

  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState(null);

  // Modal for dropdown selections
  const openDropdownModal = (type) => {
    setModalType(type);
    switch (type) {
      case 'vehicleType':
        setModalOptions(vehicleTypes);
        setModalTitle('Selecciona un tipo de vehículo');
        break;
      case 'geographicArea':
        setModalOptions(geographicAreas);
        setModalTitle('Selecciona nivel geográfico');
        break;
      case 'volumeType':
        setModalOptions(volumeTypes);
        setModalTitle('Selecciona tipo de volumen');
        break;
      case 'cargoType':
        setModalOptions(cargoTypes);
        setModalTitle('Selecciona tipo de carga');
        break;
      default:
        setModalOptions([]);
        setModalTitle('');
    }
    setModalVisible(true);
  };

  const closeDropdownModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const selectOption = (option) => {
    switch (modalType) {
      case 'vehicleType':
        setSelectedVehicleType(option);
        break;
      case 'geographicArea':
        setGeographicArea(option);
        break;
      case 'volumeType':
        setVolumeType(option);
        break;
      case 'cargoType':
        setCargoType(option);
        break;
      default:
        break;
    }
    closeDropdownModal();
  };

  // Photo modal
  const openPhotoModal = (photoType) => {
    setCurrentPhotoType(photoType);
    setPhotoModalVisible(true);
  };

  const closePhotoModal = () => {
    setPhotoModalVisible(false);
    setCurrentPhotoType(null);
  };

  const askCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara.');
      return false;
    }
    return true;
  };

  const askGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        switch (currentPhotoType) {
          case 'front':
            setFrontPhoto(result.uri);
            break;
          case 'back':
            setBackPhoto(result.uri);
            break;
          case 'right':
            setRightPhoto(result.uri);
            break;
          case 'left':
            setLeftPhoto(result.uri);
            break;
          default:
            break;
        }
        closePhotoModal();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la cámara. Intenta nuevamente.');
    }
  };

  const pickImage = async () => {
    try {
      const hasPermission = await askGalleryPermission();
      if (!hasPermission) return;

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        switch (currentPhotoType) {
          case 'front':
            setFrontPhoto(result.uri);
            break;
          case 'back':
            setBackPhoto(result.uri);
            break;
          case 'right':
            setRightPhoto(result.uri);
            break;
          case 'left':
            setLeftPhoto(result.uri);
            break;
          default:
            break;
        }
        closePhotoModal();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo acceder a la galería. Intenta nuevamente.');
    }
  };

  const validateInputs = () => {
    if (!selectedVehicleType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de vehículo.');
      return false;
    }
    if (!brand.trim()) {
      Alert.alert('Error', 'Por favor ingresa la marca del vehículo.');
      return false;
    }
    if (!plateNumber.trim()) {
      Alert.alert('Error', 'Por favor ingresa el número de placa.');
      return false;
    }
    if (!frontPhoto || !backPhoto || !rightPhoto || !leftPhoto) {
      Alert.alert('Error', 'Por favor agrega las cuatro fotos del vehículo.');
      return false;
    }
    if (!geographicArea) {
      Alert.alert('Error', 'Por favor selecciona el área a nivel geográfico.');
      return false;
    }
    if (!cargoCapacity.trim()) {
      Alert.alert('Error', 'Por favor ingresa la capacidad de carga.');
      return false;
    }
    if (!volumeType) {
      Alert.alert('Error', 'Por favor selecciona el tipo de volumen.');
      return false;
    }
    if (!volumeCapacity.trim()) {
      Alert.alert('Error', 'Por favor ingresa la capacidad de carga en volumen.');
      return false;
    }
    if (!maxWeight.trim()) {
      Alert.alert('Error', 'Por favor ingresa la capacidad máxima de peso.');
      return false;
    }
    if (!cargoType) {
      Alert.alert('Error', 'Por favor selecciona el tipo de carga.');
      return false;
    }
    return true;
  };



  
  const handleSave = () => {
    if (!validateInputs()) return;
    Alert.alert('Guardado', 'Información del vehículo guardada correctamente.');
    navigation.goBack();
  };

  const isSaveDisabled = () => {
    return !selectedVehicleType || !brand.trim() || !plateNumber.trim() || !frontPhoto || !backPhoto || !rightPhoto || !leftPhoto || !geographicArea || !cargoCapacity.trim() || !volumeType || !volumeCapacity.trim() || !maxWeight.trim() || !cargoType;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Información del vehículo</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Selecciona un vehículo:</Text>
        <Text style={styles.textInputDisabled}>
          {selectedVehicleType || 'Selecciona un tipo de vehículo'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => openDropdownModal('vehicleType')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedVehicleType || 'Selecciona un tipo de vehículo'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de Marca</Text>
        <TextInput
          style={styles.input}
          placeholder="Seleccione la Marca del Vehículo"
          value={brand}
          onChangeText={setBrand}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Número de Placa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el número de placa"
          value={plateNumber}
          onChangeText={setPlateNumber}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.photoRow}>
        <View style={styles.photoContainer}>
          <Text style={styles.label}>Foto (Frontal)</Text>
          <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openPhotoModal('front')}>
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

        <View style={styles.photoContainer}>
          <Text style={styles.label}>Foto (Posterior)</Text>
          <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openPhotoModal('back')}>
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
      </View>

      <View style={styles.photoRow}>
        <View style={styles.photoContainer}>
          <Text style={styles.label}>Foto (Lado Derecho)</Text>
          <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openPhotoModal('right')}>
            {rightPhoto ? (
              <Image source={{ uri: rightPhoto }} style={styles.photo} resizeMode="contain" />
            ) : (
              <>
                <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
                <Text style={styles.photoText}>Toca para agregar foto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.photoContainer}>
          <Text style={styles.label}>Foto (Lado Izquierdo)</Text>
          <TouchableOpacity style={styles.photoPlaceholder} onPress={() => openPhotoModal('left')}>
            {leftPhoto ? (
              <Image source={{ uri: leftPhoto }} style={styles.photo} resizeMode="contain" />
            ) : (
              <>
                <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
                <Text style={styles.photoText}>Toca para agregar foto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => openDropdownModal('geographicArea')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {geographicArea || 'Seleccione nivel Geográfico'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Capacidad de Carga</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la capacidad de carga"
          value={cargoCapacity}
          onChangeText={setCargoCapacity}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity onPress={() => openDropdownModal('volumeType')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {volumeType || 'Seleccione tipo de Volumen'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Capacidad carga en Volumen</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la capacidad de carga en volumen"
          value={volumeCapacity}
          onChangeText={setVolumeCapacity}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Capacidad Máxima de Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la capacidad máxima de peso"
          value={maxWeight}
          onChangeText={setMaxWeight}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity onPress={() => openDropdownModal('cargoType')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {cargoType || 'Seleccione tipo de carga'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.checkboxGroup}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setHasLoad(!hasLoad)}
        >
          <View style={[styles.checkbox, hasLoad && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Carga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setHasUnload(!hasUnload)}
        >
          <View style={[styles.checkbox, hasUnload && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Descarga</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isSaveDisabled() && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaveDisabled()}
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
        onRequestClose={closeDropdownModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeDropdownModal} activeOpacity={1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => selectOption(item)}>
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalOption} onPress={closeDropdownModal}>
              <Text style={[styles.modalOptionText, styles.modalCancelText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={photoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closePhotoModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closePhotoModal} activeOpacity={1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona la fuente de la imagen</Text>
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <Text style={styles.modalOptionText}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Text style={styles.modalOptionText}>Seleccionar de la Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={closePhotoModal}>
              <Text style={[styles.modalOptionText, styles.modalCancelText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
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
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  textInputDisabled: {
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#f0f0f0',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginHorizontal: 20,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  photoContainer: {
    width: '48%',
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
  checkboxGroup: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
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
    marginHorizontal: 20,
    marginBottom: 20,
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
