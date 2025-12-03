import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'characters',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
    },
    label: {
      fontWeight: '600',
      marginBottom: 4,
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
    },
  });
  