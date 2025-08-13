import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [valor, setValor] = useState('');
  const [entrada, setEntrada] = useState('');
  const [prazo, setPrazo] = useState('');
  const [juros, setJuros] = useState('');
  const router = useRouter();

  const simular = () => {
    router.push({
      pathname: '/resultado',
      params: { valor, entrada, prazo, juros },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor do imóvel:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 300000"
      />

      <Text style={styles.label}>Entrada:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={entrada}
        onChangeText={setEntrada}
        placeholder="Ex: 60000"
      />

      <Text style={styles.label}>Prazo (anos):</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={prazo}
        onChangeText={setPrazo}
        placeholder="Ex: 20"
      />

      <Text style={styles.label}>Taxa de juros anual (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={juros}
        onChangeText={setJuros}
        placeholder="Ex: 8"
      />

      <Button title='Simular' onPress={simular} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
