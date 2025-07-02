import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

const SettingsScreen = ({ onLogout }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const getStoredPassword = async () => {
    try {
      const stored = await SecureStore.getItemAsync('admin_password');
      return stored || 'cachopos';
    } catch (error) {
      return 'cachopos';
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor preencha todos os campos.');
      return;
    }

    const storedPassword = await getStoredPassword();
    
    if (currentPassword !== storedPassword) {
      Alert.alert('Erro', 'Palavra-passe atual incorreta.');
      return;
    }

    if (newPassword.length < 4) {
      Alert.alert('Erro', 'A nova palavra-passe deve ter pelo menos 4 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'A confirmação da palavra-passe não coincide.');
      return;
    }

    setIsChanging(true);

    try {
      await SecureStore.setItemAsync('admin_password', newPassword);
      
      Alert.alert(
        'Sucesso',
        'Palavra-passe alterada com sucesso!',
        [{ text: 'OK', onPress: () => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}]
      );
    } catch (error) {
      Alert.alert('Erro', 'Erro ao alterar palavra-passe. Tente novamente.');
    } finally {
      setIsChanging(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Terminar Sessão',
      'Tem certeza que deseja sair do painel administrativo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  const openExternalLink = () => {
    Alert.alert(
      'Excel das Datas',
      'Abrir o Excel das datas no navegador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir', onPress: () => {
          // In a real app, you would use Linking.openURL
          console.log('Opening Excel link...');
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEF3C7', '#FFFFFF']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Account Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações da Conta</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={20} color="#D97706" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Utilizador</Text>
                  <Text style={styles.infoValue}>admin</Text>
                  <Text style={styles.infoSubtext}>O nome de utilizador não pode ser alterado</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark" size={20} color="#D97706" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Tipo de Conta</Text>
                  <Text style={styles.infoValue}>Administrador</Text>
                  <Text style={styles.infoSubtext}>Acesso total ao sistema</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Password Change */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alterar Palavra-passe</Text>
            <View style={styles.formCard}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PALAVRA-PASSE ATUAL</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Digite a palavra-passe atual"
                    secureTextEntry={!showCurrentPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showCurrentPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#D97706"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>NOVA PALAVRA-PASSE</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Digite a nova palavra-passe"
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showNewPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#D97706"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputHelp}>Mínimo de 4 caracteres</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CONFIRMAR NOVA PALAVRA-PASSE</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme a nova palavra-passe"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#D97706"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.changePasswordButton, isChanging && styles.buttonDisabled]}
                onPress={handlePasswordChange}
                disabled={isChanging || !currentPassword || !newPassword || !confirmPassword}
              >
                <Text style={styles.changePasswordButtonText}>
                  {isChanging ? 'A alterar...' : 'Alterar Palavra-passe'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* External Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gestão Externa</Text>
            <TouchableOpacity style={styles.linkCard} onPress={openExternalLink}>
              <View style={styles.linkContent}>
                <Ionicons name="document-text" size={24} color="#10B981" />
                <View style={styles.linkText}>
                  <Text style={styles.linkTitle}>Excel das Datas</Text>
                  <Text style={styles.linkSubtitle}>Gerir reservas no Google Sheets</Text>
                </View>
              </View>
              <Ionicons name="open-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Security Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações de Segurança</Text>
            <View style={styles.securityCard}>
              <View style={styles.securityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.securityText}>A palavra-passe é guardada de forma segura no dispositivo</Text>
              </View>
              <View style={styles.securityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.securityText}>Use uma palavra-passe forte e única</Text>
              </View>
              <View style={styles.securityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.securityText}>Faça logout sempre que terminar de usar o painel</Text>
              </View>
              <View style={styles.securityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.securityText}>Não partilhe as suas credenciais com terceiros</Text>
              </View>
            </View>
          </View>

          {/* Logout */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out" size={20} color="#FFFFFF" />
              <Text style={styles.logoutButtonText}>Terminar Sessão</Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Raio dos Cachopos Admin v1.0.0</Text>
            <Text style={styles.footerSubtext}>© 2024 Raio dos Cachopos</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 2,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  inputContainer: {
    marginBottom: 20,
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
  inputHelp: {
    fontSize: 12,
    color: '#D97706',
    marginTop: 4,
  },
  eyeIcon: {
    padding: 12,
  },
  changePasswordButton: {
    backgroundColor: '#FCD34D',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkText: {
    marginLeft: 12,
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  securityCard: {
    backgroundColor: '#EBF8FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default SettingsScreen;