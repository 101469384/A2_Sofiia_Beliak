import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.label}>Student Name:</Text>
      <Text style={styles.value}>Sofiia Beliak</Text>

      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.value}>101469384</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>
        This app converts an amount from one currency to another using live
        exchange rates from the Free Currency API. The main screen validates
        the input, calls the API and displays the converted amount and the
        exchange rate used.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { fontWeight: '600', marginTop: 10 },
  value: { fontSize: 16 },
  description: { marginTop: 8, fontSize: 16, lineHeight: 22 },
});
