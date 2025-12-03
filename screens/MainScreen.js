// handles currency conversion logic and API call

import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import LabeledInput from '../components/LabeledInput';

const API_KEY = 'fca_live_8Nu3gdMm3i0l0oeB6iwZmG114pFAgxceSaqM26DB'; 

export default function MainScreen({ navigation }) {
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [destCurrency, setDestCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [converted, setConverted] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const base = baseCurrency.trim().toUpperCase();
    const dest = destCurrency.trim().toUpperCase();
    const amt = parseFloat(amount);
// Validate currency codes and amount

    if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(dest)) {
      setError('Currency codes must be 3-letter uppercase (e.g. CAD, USD).');
      return null;
    }
    if (isNaN(amt) || amt <= 0) {
      setError('Amount must be a positive number.');
      return null;
    }
    setError('');
    return { base, dest, amt };
  };

  const convert = async () => {
    const data = validate();
    if (!data) return;
  
    const { base, dest, amt } = data;
  
    setLoading(true);
    setConverted(null);
    setRate(null);
  
    try {
      const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${base}&currencies=${dest}`;
  
      const res = await fetch(url);
      let json = null;
  
      try {
        json = await res.json();
      } catch (e) {
        // ignore JSON parse error here, will handle below
      }
  
      if (!res.ok) {
        let msg = 'Network error while contacting currency API.';
        if (json) {
          if (json.message) msg = json.message;
          else if (json.error) msg = json.error;
        }
        throw new Error(msg);
      }
  
      // success case
      const r = json?.data?.[dest];
  
      if (!r) {
        throw new Error(`Exchange rate for ${dest} not found in API response.`);
      }
  
      setRate(r);
      setConverted(r * amt);
      setError('');
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <LabeledInput
        label="Base currency code"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
        placeholder="CAD"
      />

      <LabeledInput
        label="Destination currency code"
        value={destCurrency}
        onChangeText={setDestCurrency}
        placeholder="USD"
      />

      <LabeledInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        autoCapitalize="none"
      />

      <View style={{ marginTop: 8 }}>
        <Button
          title={loading ? 'Converting...' : 'Convert'}
          onPress={convert}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {converted !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.result}>
            Converted: {converted.toFixed(2)} {destCurrency.toUpperCase()}
          </Text>
          <Text style={styles.rate}>
            Rate used: {rate} {destCurrency.toUpperCase()}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Button title="About" onPress={() => navigation.navigate('About')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 20,
      textAlign: 'center',
    },
    error: {
      marginTop: 20,
      color: 'red',
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
    },
    resultBox: {
      marginTop: 20,
      padding: 12,
      borderWidth: 1,
      borderColor: '#2d9cdb',
      borderRadius: 6,
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
    },
    result: {
      fontSize: 17,
      fontWeight: '600',
    },
    rate: {
      marginTop: 5,
    },
    fullWidthButton: {
      marginTop: 8,
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
    },
  });
  
