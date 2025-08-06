import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

function gerarTabelaSAC(valorFinanciado, taxaJurosAnual, prazoAnos) {
  const parcelas = prazoAnos * 12;
  const amortizacao = valorFinanciado / parcelas;
  const taxaMensal = (taxaJurosAnual / 100) / 12;

  const tabela = [];

  let saldoDevedor = valorFinanciado;

  for (let i = 1; i <= parcelas; i++) {
    const juros = saldoDevedor * taxaMensal;
    const parcela = amortizacao + juros;

    tabela.push({
      mes: i,
      saldoInicial: saldoDevedor.toFixed(2),
      amortizacao: amortizacao.toFixed(2),
      juros: juros.toFixed(2),
      parcela: parcela.toFixed(2),
      saldoFinal: (saldoDevedor - amortizacao).toFixed(2),
    });

    saldoDevedor -= amortizacao;
  }

  return tabela;
}

export default function TabelaSAC() {
  const { valor, entrada, prazo, juros } = useLocalSearchParams();
  const valorFinanciado = Number(valor) - Number(entrada);
  const tabela = gerarTabelaSAC(valorFinanciado, Number(juros), Number(prazo));

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Tabela de Amortização SAC
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ flex: 1 }}>Mês</Text>
        <Text style={{ flex: 2 }}>Parcela</Text>
        <Text style={{ flex: 2 }}>Juros</Text>
        <Text style={{ flex: 2 }}>Amortização</Text>
        <Text style={{ flex: 2 }}>Saldo</Text>
      </View>

      {tabela.map((linha, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ flex: 1 }}>{linha.mes}</Text>
          <Text style={{ flex: 2 }}>R$ {linha.parcela}</Text>
          <Text style={{ flex: 2 }}>R$ {linha.juros}</Text>
          <Text style={{ flex: 2 }}>R$ {linha.amortizacao}</Text>
          <Text style={{ flex: 2 }}>R$ {linha.saldoFinal}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
