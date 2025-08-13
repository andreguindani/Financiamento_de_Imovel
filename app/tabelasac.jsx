// app/tabela-sac.js
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tabela de Amortização SAC</Text>

      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell, { flex: 0.5 }]}>Mês</Text>
        <Text style={[styles.cell, styles.headerCell]}>Parcela (R$)</Text>
        <Text style={[styles.cell, styles.headerCell]}>Juros (R$)</Text>
        <Text style={[styles.cell, styles.headerCell]}>Amortização (R$)</Text>
        <Text style={[styles.cell, styles.headerCell]}>Saldo (R$)</Text>
      </View>

      {tabela.map((linha, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index % 2 === 0 ? styles.evenRow : styles.oddRow,
          ]}
        >
          <Text style={[styles.cell, { flex: 0.5 }]}>{linha.mes}</Text>
          <Text style={styles.cell}>{linha.parcela}</Text>
          <Text style={styles.cell}>{linha.juros}</Text>
          <Text style={styles.cell}>{linha.amortizacao}</Text>
          <Text style={styles.cell}>{linha.saldoFinal}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2f86eb',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2f86eb',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerCell: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 2,
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#eaf1fb',
  },
  oddRow: {
    backgroundColor: '#f1f7fc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
});
