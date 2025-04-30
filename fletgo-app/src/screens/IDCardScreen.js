import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function IDCardScreen({ navigation }) {
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);

  const handleAddFrontPhoto = () => {
    // Placeholder for photo picker logic
    alert('Agregar foto delantera');
  };

  const handleAddBackPhoto = () => {
    // Placeholder for photo picker logic
    alert('Agregar foto trasera');
  };

  const handleSave = () => {
    // Placeholder for save logic
    alert('Guardado');
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
        <TouchableOpacity style={styles.photoPlaceholder} onPress={handleAddFrontPhoto}>
          <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
          <Text style={styles.photoText}>Toca para agregar foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tarjeta de Identificación (parte trasera)</Text>
        <TouchableOpacity style={styles.photoPlaceholder} onPress={handleAddBackPhoto}>
          <MaterialIcons name="add-a-photo" size={40} color={colors.text} />
          <Text style={styles.photoText}>Toca para agregar foto</Text>
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
});
