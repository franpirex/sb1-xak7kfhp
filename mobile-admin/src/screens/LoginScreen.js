import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (password === 'cachopos') {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } else {
      Alert.alert('Erro', 'Palavra-passe incorreta. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FEF3C7', '#FCD34D', '#F59E0B']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Ionicons name="flash" size={40} color="#000000" />
              </View>
              <Text style={styles.title}>Raio dos Cachopos</Text>
              <Text style={styles.subtitle}>PAINEL ADMINISTRATIVO</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.lockIconContainer}>
                <Ionicons name="lock-closed" size={40} color="#D97706" />
              </View>
              
              <Text style={styles.formTitle}>Iniciar Sessão</Text>
              <Text style={styles.formSubtitle}>Área restrita a administradores</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>UTILIZADOR</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value="admin"
                    editable={false}
                  />
                </View>
                <Text style={styles.inputHelp}>Campo fixo - não editável</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PALAVRA-PASSE</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Palavra-passe"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#D97706"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading || !password}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'A entrar...' : 'Entrar no Painel'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Painel administrativo dos Raio dos Cachopos
              </Text>
              <Text style={styles.footerSubtext}>
                Acesso restrito apenas a administradores autorizados
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FCD34D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FEF3C7',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#D97706',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginLeft: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000000',
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  inputHelp: {
    fontSize: 12,
    color: '#D97706',
    marginTop: 4,
  },
  eyeIcon: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: '#FCD34D',
    borderRadius: 24,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#D97706',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
  },
});

export default LoginScreen;