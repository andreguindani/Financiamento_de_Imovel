import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <Text>Valor do imóvel:</Text>
      <TextInput keyboardType='numeric' value={valor} onChangeText={setValor} />

      <Text>Entrada:</Text>
      <TextInput keyboardType='numeric' value={entrada} onChangeText={setEntrada} />

      <Text>Prazo (anos):</Text>
      <TextInput keyboardType='numeric' value={prazo} onChangeText={setPrazo} />

      <Text>Taxa de juros anual (%):</Text>
      <TextInput keyboardType='numeric' value={juros} onChangeText={setJuros} />

      <Button title='Simular' onPress={simular} />
    </View>
  );
}