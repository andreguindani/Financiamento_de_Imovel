import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Comparação de Prazos (20 vs 30 anos)</Text>

      {cenarios.map((c, idx) => (
        <View key={idx} style={styles.cenarioContainer}>
          <Text style={styles.prazoTitle}>{c.prazo} anos:</Text>
          <Text style={styles.infoText}>Parcela: <Text style={styles.valor}>R$ {c.parcela}</Text></Text>
          <Text style={styles.infoText}>Total pago: <Text style={styles.valor}>R$ {c.totalPago}</Text></Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  cenarioContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#eaf1fb',
    borderRadius: 8,
    elevation: 3,
  },
  prazoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f86eb',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  valor: {
    fontWeight: 'bold',
    color: '#2f86eb',
  },
});
