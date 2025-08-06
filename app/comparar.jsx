import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

function calcular(valor, entrada, prazo, juros) {
  const valorFinanciado = valor - entrada;
  const meses = prazo * 12;
  const taxa = juros / 100 / 12;
  const parcela = (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -meses));
  const totalPago = parcela * meses;
  return {
    prazo,
    parcela: parcela.toFixed(2),
    totalPago: totalPago.toFixed(2),
  };
}

export default function Comparar() {
  const { valor, entrada, juros } = useLocalSearchParams();
  const valorNum = Number(valor);
  const entradaNum = Number(entrada);
  const jurosNum = Number(juros);

  const cenarios = [
    calcular(valorNum, entradaNum, 20, jurosNum),
    calcular(valorNum, entradaNum, 30, jurosNum),
  ];

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Comparação de Prazos (20 vs 30 anos)
      </Text>
      {cenarios.map((c, idx) => (
        <View key={idx} style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>{c.prazo} anos:</Text>
          <Text>Parcela: R$ {c.parcela}</Text>
          <Text>Total pago: R$ {c.totalPago}</Text>
        </View>
      ))}
    </ScrollView>
  );
}