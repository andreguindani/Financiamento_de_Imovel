import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

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
    <View style={{ padding: 20 }}>
      <Text>Parcela mensal: R$ {resultado.parcela}</Text>
      <Text>Total pago: R$ {resultado.totalPago}</Text>

      <Button title="Ver Tabela SAC" onPress={() => {
        router.push({
          pathname: '/tabelasac',
          params: { valor, entrada, prazo, juros },
        });
      }} />
    </View>
  );
}