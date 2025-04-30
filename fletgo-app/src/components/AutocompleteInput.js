import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAqy_G2t4hBh83VyH6UDaXUYeSnLS-v0ng';

const AutocompleteInput = ({ placeholder, value, onChangeText, onSelect }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length < 3) {
      setPredictions([]);
      return;
    }

    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
            encodeURIComponent(value) +
            "&key=" +
            GOOGLE_PLACES_API_KEY +
            "&components=country:gt|country:sv|country:hn|country:ni|country:cr|country:pa"
        );
        const json = await response.json();
        if (json.status === "OK") {
          setPredictions(json.predictions);
        } else {
          setPredictions([]);
        }
      } catch (error) {
        setPredictions([]);
      }
      setLoading(false);
    };

    fetchPredictions();
  }, [value]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${GOOGLE_PLACES_API_KEY}`
          );
          const json = await response.json();
          if (json.status === "OK") {
            const location = json.result.geometry.location;
            onSelect({
              description: item.description,
              latitude: location.lat,
              longitude: location.lng,
            });
          } else {
            onSelect({ description: item.description });
          }
        } catch (error) {
          onSelect({ description: item.description });
        }
        setPredictions([]);
      }}
    >
      <Text style={styles.itemText}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.text}
      />
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={renderItem}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
  },
  input: {
    height: 40,
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.primary,
  },
  list: {
    backgroundColor: colors.background,
    maxHeight: 150,
    borderRadius: 8,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  itemText: {
    color: colors.primary,
  },
});

export default AutocompleteInput;
