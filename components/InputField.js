import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function InputField({ label, value, onChangeText, secureTextEntry, keyboardType, error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && { borderColor: 'red' }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  error: { color: 'red', fontSize: 12, marginTop: 3 }
});