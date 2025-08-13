import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

function calcular(valor, entrada, prazo, juros) {
  const valorFinanciado = valor - entrada;
  const meses = prazo * 12;
  const taxa = juros / 100 / 12;
  const parcela = (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -meses));

  return {
    parcela: parcela.toFixed(2),
    totalPago: (parcela * meses).toFixed(2),
  };
}

export default function Resultado() {
  const { valor, entrada, prazo, juros } = useLocalSearchParams();
  const router = useRouter();

  const resultado = calcular(Number(valor), Number(entrada), Number(prazo), Number(juros));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado da Simulação</Text>

      <View style={styles.resultadoContainer}>
        <Text style={styles.resultadoTexto}>Parcela mensal: <Text style={styles.valor}>{`R$ ${resultado.parcela}`}</Text></Text>
        <Text style={styles.resultadoTexto}>Total pago: <Text style={styles.valor}>{`R$ ${resultado.totalPago}`}</Text></Text>
      </View>

      <Button
        title="Ver Tabela SAC"
        onPress={() => {
          router.push({
            pathname: '/tabelasac',
            params: { valor, entrada, prazo, juros },
          });
        }}
        color="#2f86eb"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultadoContainer: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#eaf1fb',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 3,
  },
  resultadoTexto: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  valor: {
    fontWeight: 'bold',
    color: '#2f86eb',
  },
});
