# 🚀 Deploy Manual - Raio dos Cachopos

## ✅ Build Confirmado - Pronto para Deploy!

O build está a funcionar perfeitamente. Aqui estão as opções para fazer deploy:

## 🌐 Opção 1: Netlify (Drag & Drop)

### Passos:
1. **Aceda a**: https://app.netlify.com/drop
2. **Arraste a pasta `dist`** para a área de drop
3. **Aguarde o upload** (30-60 segundos)
4. **Copie o URL** gerado (ex: `https://amazing-name-123456.netlify.app`)

### Configurar Domínio Personalizado:
1. No painel do Netlify, vá a **Domain settings**
2. Clique **Add custom domain**
3. Adicione: `raiodoscachopos.com`
4. Configure DNS no seu provedor:
   ```
   Tipo: A
   Nome: @
   Valor: 75.2.60.5
   
   Tipo: CNAME
   Nome: www
   Valor: raiodoscachopos.com
   
   Tipo: CNAME
   Nome: admin
   Valor: raiodoscachopos.com
   ```

---

## 🌐 Opção 2: Vercel (Recomendado)

### Via Web Interface:
1. **Aceda a**: https://vercel.com/new
2. **Import Git Repository** ou **Deploy from CLI**
3. **Configure**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**

### Via CLI (Mais Rápido):
```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel

# Seguir as instruções:
# - Set up and deploy? Y
# - Which scope? (escolher)
# - Link to existing project? N
# - Project name: raio-dos-cachopos
# - Directory: ./
# - Override settings? N
```

---

## 🌐 Opção 3: GitHub Pages

### Passos:
1. **Criar repositório** no GitHub
2. **Push do código**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USERNAME/raio-dos-cachopos.git
   git push -u origin main
   ```

3. **Configurar GitHub Pages**:
   - Ir a Settings > Pages
   - Source: GitHub Actions
   - Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## 🌐 Opção 4: Surge.sh (Mais Simples)

```bash
# Instalar Surge
npm install -g surge

# Build e deploy
npm run build
cd dist
surge

# Escolher domínio: raiodoscachopos.surge.sh
# Ou usar domínio personalizado
```

---

## 🔧 Verificação Final

### Antes do Deploy:
```bash
# Verificar build
npm run build
ls -la dist/

# Deve mostrar:
# - index.html
# - assets/
# - imagens (.jpg, .jpeg)
# - _redirects
```

### Após Deploy:
1. **Testar site principal**: `https://seudominio.com`
2. **Testar admin**: `https://seudominio.com/?admin=true`
3. **Credenciais**: admin / cachopos

---

## 🎯 Recomendação

**Use Vercel** - É o mais confiável:
1. Registe-se em vercel.com
2. Conecte o GitHub
3. Deploy automático
4. Domínio personalizado gratuito

**Alternativa**: Netlify drag & drop se quiser algo imediato.

---

## 🔐 Configuração Admin

### URLs de Acesso:
- **Produção**: `https://admin.raiodoscachopos.com`
- **Alternativa**: `https://raiodoscachopos.com/?admin=true`
- **Local**: `http://localhost:5173/?admin=true`

### Credenciais:
- **Utilizador**: admin
- **Password**: cachopos

---

## 📞 Suporte

Se tiver problemas:
1. Verificar se `dist/` tem todos os arquivos
2. Verificar se não há erros no build
3. Testar localmente com `npm run preview`

**O build está 100% funcional!** 🚀