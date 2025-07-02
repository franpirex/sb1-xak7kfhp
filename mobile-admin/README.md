# Raio dos Cachopos - App iOS Administrativo

Aplicação móvel iOS nativa para gestão administrativa da banda Raio dos Cachopos.

## 📱 **QR Code para Teste Rápido**

### **Como testar no Expo Go:**

1. **Instale o Expo Go** no seu iPhone/iPad:
   - [Download na App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Execute o projeto:**
   ```bash
   cd mobile-admin
   npm install
   npm start
   ```

3. **Escaneie o QR Code:**
   - O QR code aparecerá no terminal
   - Use a câmara do iPhone para escanear
   - O app abrirá automaticamente no Expo Go

4. **Credenciais de teste:**
   - **Utilizador:** `admin`
   - **Palavra-passe:** `cachopos`

### **URL de Exemplo:**
```
exp://192.168.1.100:8081
```
*Nota: O IP será diferente no seu ambiente*

---

## 🎵 Funcionalidades

### 📱 **Interface Nativa iOS**
- Design otimizado para iOS com navegação por tabs
- Cores da marca (amarelo, âmbar e preto)
- Animações e transições suaves
- Suporte para iPhone e iPad

### 🔐 **Autenticação Segura**
- Login com palavra-passe
- Armazenamento seguro com Expo SecureStore
- Sessão persistente
- Logout seguro

### 📊 **Dashboard Administrativo**
- Estatísticas em tempo real
- Lista de contratações com filtros
- Ações rápidas (aceitar/recusar)
- Detalhes completos de cada reserva
- Função de apagar reservas

### 📅 **Calendário Móvel**
- Visualização mensal otimizada para mobile
- Indicadores visuais para datas reservadas
- Detalhes de reservas por data
- Navegação intuitiva entre meses

### ⚙️ **Definições**
- Alteração de palavra-passe
- Informações da conta
- Links para gestão externa
- Informações de segurança
- Logout seguro

## 🚀 Como Executar

### Pré-requisitos
```bash
# Instalar Node.js e npm
# Instalar Expo CLI
npm install -g @expo/cli

# Instalar Xcode (para iOS)
# Instalar Expo Go app no iPhone/iPad
```

### Instalação
```bash
cd mobile-admin
npm install
```

### Executar
```bash
# Iniciar servidor de desenvolvimento
npm start

# Ou diretamente para iOS
npm run ios
```

### Testar no Dispositivo
1. Instale o app **Expo Go** no seu iPhone/iPad
2. Execute `npm start` no terminal
3. Escaneie o QR code com a câmara do iPhone
4. O app abrirá automaticamente no Expo Go

## 📱 Navegação

### **Tab 1: Dashboard**
- Estatísticas principais
- Lista de contratações
- Filtros por status
- Ações rápidas

### **Tab 2: Calendário**
- Vista mensal
- Datas reservadas destacadas
- Detalhes por data
- Navegação entre meses

### **Tab 3: Definições**
- Informações da conta
- Alterar palavra-passe
- Links externos
- Logout

## 🔐 Credenciais

**Utilizador:** `admin`  
**Palavra-passe:** `cachopos`

## 🎨 Design

### **Cores da Marca**
- **Amarelo Principal:** `#FCD34D`
- **Âmbar:** `#D97706`
- **Preto:** `#000000`
- **Branco:** `#FFFFFF`

### **Tipografia**
- Títulos: Font weight 900 (Black)
- Subtítulos: Font weight 700 (Bold)
- Texto: Font weight 600 (Semibold)
- Corpo: Font weight 400 (Regular)

### **Componentes**
- Cards com bordas arredondadas (16px)
- Botões com cantos arredondados (12px)
- Sombras subtis para profundidade
- Gradientes suaves

## 📦 Dependências Principais

- **Expo SDK 50**: Framework React Native
- **React Navigation**: Navegação entre ecrãs
- **Expo SecureStore**: Armazenamento seguro
- **Expo Linear Gradient**: Gradientes
- **AsyncStorage**: Armazenamento local
- **Ionicons**: Ícones nativos
- **QR Code SVG**: Geração de QR codes

## 🔧 Estrutura do Projeto

```
mobile-admin/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── CalendarScreen.js
│   │   └── SettingsScreen.js
│   ├── navigation/
│   │   └── MainTabNavigator.js
│   └── utils/
│       └── storage.js
├── App.js
├── QRCodeGenerator.js
├── app.json
└── package.json
```

## 🚀 Build para Produção

### **iOS App Store**
```bash
# Build para iOS
expo build:ios

# Ou com EAS Build (recomendado)
eas build --platform ios
```

### **Configuração**
- Bundle ID: `com.raiodoscachopos.admin`
- Nome: "Raio dos Cachopos Admin"
- Versão: 1.0.0

## 📱 Funcionalidades iOS Específicas

### **Navegação Nativa**
- Tab bar nativo do iOS
- Navegação por stack
- Modais com apresentação nativa

### **Gestos**
- Pull to refresh
- Swipe gestures
- Tap feedback

### **Segurança**
- Keychain para passwords
- Biometria (Face ID/Touch ID) - futuro
- App backgrounding seguro

## 🔄 Sincronização

### **Dados Locais**
- Armazenamento local com AsyncStorage
- Sincronização manual (pull to refresh)
- Dados pré-carregados das reservas existentes

### **Futuras Melhorias**
- Sincronização em tempo real
- Push notifications
- Backup na cloud
- Modo offline

## 🎯 Público-Alvo

- **Administradores da banda**
- **Gestores de eventos**
- **Uso em movimento**
- **Acesso rápido a informações**

## 🛠️ Resolução de Problemas

### **App não aparece no Expo Go**
1. Verifique se está na mesma rede WiFi
2. Tente reiniciar o servidor: `npm start`
3. Limpe o cache: `expo start -c`
4. Verifique o firewall/antivírus

### **QR Code não funciona**
1. Use a câmara nativa do iPhone (não o Expo Go)
2. Certifique-se que o QR code está bem iluminado
3. Tente digitar o URL manualmente no Expo Go

### **Erro de conexão**
1. Verifique se o computador e telefone estão na mesma rede
2. Desative VPN se estiver ativa
3. Tente usar o modo tunnel: `expo start --tunnel`

## 📞 Suporte

Para questões técnicas ou alterações:
- Contacte o desenvolvedor
- Documentação: Este README
- Logs: Disponíveis no Expo Dev Tools

---

**Desenvolvido para Raio dos Cachopos** 🎵  
*Pop Tradicional Agrobeto que toca diretamente ao coração*

### 📱 **Teste Agora:**
1. Instale o Expo Go
2. Execute `npm start`
3. Escaneie o QR code
4. Login: admin / cachopos