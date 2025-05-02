import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const countries = [
  'Belice',
  'Costa Rica',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'Nicaragua',
  'Panamá',
];

const banks = [
  'Banco Atlántida',
  'Banco de Occidente',
  'Banco Ficohsa',
  'Banco BAC',
  'Banco Promerica',
  'Banco Davivienda',
  'Banco Azteca',
];

const accountTypes = ['Cheque', 'Ahorro'];

export default function BankAccountScreen({ navigation }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedAccountType, setSelectedAccountType] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    switch (type) {
      case 'country':
        setModalOptions(countries);
        setModalTitle('Selecciona un país');
        break;
      case 'bank':
        setModalOptions(banks);
        setModalTitle('Selecciona un banco');
        break;
      case 'accountType':
        setModalOptions(accountTypes);
        setModalTitle('Selecciona tipo de cuenta');
        break;
      default:
        setModalOptions([]);
        setModalTitle('');
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const selectOption = (option) => {
    switch (modalType) {
      case 'country':
        setSelectedCountry(option);
        break;
      case 'bank':
        setSelectedBank(option);
        break;
      case 'accountType':
        setSelectedAccountType(option);
        break;
      default:
        break;
    }
    closeModal();
  };

  const validateInputs = () => {
    if (!accountNumber.trim()) {
      Alert.alert('Error', 'Por favor ingresa el número de cuenta.');
      return false;
    }
    if (!selectedCountry) {
      Alert.alert('Error', 'Por favor selecciona un país.');
      return false;
    }
    if (!selectedBank) {
      Alert.alert('Error', 'Por favor selecciona un banco.');
      return false;
    }
    if (!selectedAccountType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de cuenta.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateInputs()) return;
    Alert.alert('Guardado', 'Información de cuenta bancaria guardada correctamente.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Cuenta Bancaria</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Número de Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el número de cuenta"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity onPress={() => openModal('country')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedCountry || 'Selecciona un país'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal('bank')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedBank || 'Selecciona un banco'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal('accountType')} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedAccountType || 'Seleccione Tipo de Cuenta'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
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
            <TouchableOpacity style={styles.modalOption} onPress={closeModal}>
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
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 50,
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
  input: {
    borderWidth: 1,
    borderColor: colors.inputBg,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
  saveButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancelText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});
