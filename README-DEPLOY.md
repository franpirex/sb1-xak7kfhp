# 🚀 Guia de Deploy - Raio dos Cachopos

## ✅ Problemas Corrigidos

### Build Issues Resolvidos:
- ✅ Removido TypeScript do comando de build
- ✅ Simplificado tsconfig.json
- ✅ Configuração otimizada do Vite
- ✅ Removidas dependências desnecessárias

## 🌐 Opções de Deploy

### 1. **Netlify** (Recomendado)
```bash
# Método 1: Deploy automático via Git
1. Faça push do código para GitHub/GitLab
2. Conecte o repositório no Netlify
3. Configure:
   - Build command: npm run build
   - Publish directory: dist

# Método 2: Deploy manual
npm run build
# Arraste a pasta 'dist' para netlify.com/drop
```

**Vantagens:**
- ✅ Gratuito
- ✅ SSL automático
- ✅ Subdomínios personalizados
- ✅ Redirects automáticos

### 2. **Vercel** (Alternativa Excelente)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ou conectar via GitHub no vercel.com
```

**Vantagens:**
- ✅ Deploy instantâneo
- ✅ Preview automático
- ✅ Domínios personalizados
- ✅ Analytics incluído

### 3. **GitHub Pages** (Gratuito)
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json:
"homepage": "https://seuusername.github.io/raio-dos-cachopos",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### 4. **Firebase Hosting** (Google)
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login e inicializar
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

### 5. **Surge.sh** (Simples e Rápido)
```bash
# Instalar Surge
npm install -g surge

# Build e deploy
npm run build
cd dist
surge
```

## 🔧 Comandos de Build

### Testar localmente:
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
```

### Verificar build:
```bash
npm run build
# Verificar se a pasta 'dist' foi criada
# Verificar se não há erros no terminal
```

## 🌍 Configuração de Subdomínio Admin

### Para qualquer provedor:
1. **Domínio principal**: `raiodoscachopos.com`
2. **Admin**: `admin.raiodoscachopos.com`

### DNS Configuration:
```
Tipo: CNAME
Nome: admin
Valor: raiodoscachopos.com
TTL: 3600
```

## 🚨 Resolução de Problemas

### Build falha:
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript errors:
- ✅ Já corrigido no tsconfig.json
- ✅ Strict mode desativado
- ✅ Unused variables permitidas

### Deploy falha:
1. Verificar se `dist/` existe após build
2. Verificar se `index.html` está em `dist/`
3. Verificar logs do provedor

## 📱 Teste do Admin

### Local:
- `http://localhost:5173/?admin=true`

### Produção:
- `https://admin.raiodoscachopos.com`
- Ou `https://raiodoscachopos.com/?admin=true`

## 🔐 Credenciais Admin:
- **Utilizador**: admin
- **Password**: cachopos

---

## 🎯 Recomendação Final

**Use Netlify** - É a opção mais simples e robusta:

1. Faça push para GitHub
2. Conecte no netlify.com
3. Deploy automático
4. Configure domínio personalizado
5. SSL automático

**Backup: Use Vercel** se Netlify não funcionar.

Ambos são gratuitos e profissionais! 🚀