import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
  // URL do projeto Expo - substitua pelo seu URL real quando executar
  const expoUrl = 'exp://192.168.1.100:8081'; // Exemplo - será diferente no seu caso
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Teste no Expo Go</Text>
        <Text style={styles.subtitle}>Raio dos Cachopos Admin</Text>
      </View>
      
      <View style={styles.qrContainer}>
        <QRCode
          value={expoUrl}
          size={200}
          color="#000000"
          backgroundColor="#FFFFFF"
          logo={require('./assets/icon.png')}
          logoSize={40}
          logoBackgroundColor="transparent"
        />
      </View>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Como testar:</Text>
        <Text style={styles.instructionText}>1. Instale o app "Expo Go" no seu iPhone/iPad</Text>
        <Text style={styles.instructionText}>2. Execute "npm start" no terminal</Text>
        <Text style={styles.instructionText}>3. Escaneie o QR code que aparece no terminal</Text>
        <Text style={styles.instructionText}>4. O app abrirá automaticamente no Expo Go</Text>
      </View>
      
      <View style={styles.credentials}>
        <Text style={styles.credentialsTitle}>🔐 Credenciais de Teste:</Text>
        <Text style={styles.credentialsText}>Utilizador: admin</Text>
        <Text style={styles.credentialsText}>Palavra-passe: cachopos</Text>
      </View>
      
      <View style={styles.note}>
        <Text style={styles.noteText}>
          💡 Nota: O QR code real aparecerá no terminal quando executar "npm start"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#D97706',
    fontWeight: '600',
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
  },
  instructions: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
  credentials: {
    backgroundColor: '#FCD34D',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
  },
  credentialsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  credentialsText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 4,
  },
  note: {
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
  },
  noteText: {
    fontSize: 12,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default QRCodeGenerator;