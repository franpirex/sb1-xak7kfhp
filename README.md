# Raio dos Cachopos - Website de Contratações

Sistema de gestão de contratações para a banda Raio dos Cachopos, com separação entre área pública e administrativa via subdomínio.

## 🎵 Funcionalidades

### Área Pública (Cliente)
- **Homepage**: Apresentação da banda, galeria, testemunhos
- **Formulário de Contratação**: Pedido de orçamento personalizado
- **Calendário**: Verificação de disponibilidade (apenas visualização)
- **Notificações**: Email automático para a banda quando há novos pedidos

### Área Administrativa
- **Login Seguro**: Acesso restrito com credenciais
- **Dashboard**: Gestão completa de contratações
- **Calendário Admin**: Edição e gestão de reservas
- **Propostas**: Sistema de envio de orçamentos
- **Links Externos**: Acesso a Excel e sistemas de gestão

## 🌐 Configuração de Subdomínio

### Site Principal (Clientes)
```
https://raiodoscachopos.com
```

### Site Administrativo
```
https://admin.raiodoscachopos.com
```

**Credenciais de Acesso Admin:**
- **Utilizador**: `cachopos`
- **Palavra-passe**: `cachopos`

## 🚀 Teste Local

### Opção 1: Parâmetro URL (Mais Fácil)
Para testar o painel administrativo localmente:

```
http://localhost:5173/?admin=true
```

### Opção 2: Hosts File (Simula Produção)
Edite o ficheiro hosts do sistema:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** `/etc/hosts`

Adicione estas linhas:
```
127.0.0.1 localhost
127.0.0.1 admin.localhost
```

Depois aceda a:
- `http://localhost:5173` (site principal)
- `http://admin.localhost:5173` (admin)

### Como Testar
1. **Site Principal**: `http://localhost:5173`
2. **Painel Admin**: `http://localhost:5173/?admin=true`
3. **Credenciais**: `cachopos` / `cachopos`

## ⚙️ Configuração DNS (Produção)

Para configurar o subdomínio administrativo, adicione os seguintes registos DNS:

### Opção 1: CNAME (Recomendado)
```
Tipo: CNAME
Nome: admin
Valor: raiodoscachopos.com
TTL: 3600
```

### Opção 2: A Record
```
Tipo: A
Nome: admin
Valor: [IP do servidor principal]
TTL: 3600
```

### Configuração no Netlify
1. Aceda ao painel do Netlify
2. Vá a **Domain settings**
3. Adicione o domínio personalizado: `admin.raiodoscachopos.com`
4. Configure o SSL automático

## 🛠️ Como Usar

### Para Clientes
1. Aceda a `https://raiodoscachopos.com`
2. Navegue pelas secções: Início, Pedir Orçamento, Disponibilidade
3. Preencha o formulário de contratação
4. Verifique disponibilidade no calendário
5. Aguarde contacto da banda em 24h

### Para Administradores
1. **Produção**: Aceda a `https://admin.raiodoscachopos.com`
2. **Local**: Aceda a `http://localhost:5173/?admin=true`
3. Faça login com as credenciais: `cachopos` / `cachopos`
4. Gerir contratações no Dashboard
5. Aprovar/rejeitar pedidos
6. Enviar propostas personalizadas
7. Marcar datas como reservadas
8. Aceder a ferramentas externas (Excel, gestão)

## 📧 Notificações

O sistema envia automaticamente emails para `raiodoscachopos@gmail.com` quando:
- Novo pedido de contratação é submetido
- Inclui todos os detalhes do evento e contacto do cliente

## 🎨 Design

- **Cores da Banda**: Amarelo, âmbar e preto (baseado no logo)
- **Estilo**: Moderno, inspirado nas tendências de 2025
- **Responsivo**: Funciona em todos os dispositivos
- **Acessibilidade**: Contrastes adequados e navegação intuitiva

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: LocalStorage (para demonstração)
- **Build**: Vite
- **Deploy**: Netlify com subdomínio

## 📱 Funcionalidades Especiais

### Calendário Inteligente
- **Cliente**: Vê apenas disponibilidade, pop-up para datas livres
- **Admin**: Gestão completa, edição de reservas

### Sistema de Estados
- **Pendente**: Novo pedido aguarda aprovação
- **Reservado**: Data confirmada e reservada

### Gestão Externa
- Links diretos para Excel das datas
- Acesso a sistemas de gestão avançada
- Integração com ferramentas existentes

## 🔒 Segurança

- **Separação Total**: Subdomínio administrativo completamente isolado
- **Login Obrigatório**: Acesso admin requer autenticação
- **Credenciais Configuráveis**: Fácil alteração no código
- **Headers de Segurança**: Proteção adicional via Netlify
- **SSL Automático**: Certificados para ambos os domínios

## 🚀 Deploy

### Pré-requisitos
1. Conta no Netlify
2. Domínio configurado
3. Acesso ao DNS do domínio

### Passos de Deploy
1. **Build do projeto**:
   ```bash
   npm run build
   ```

2. **Deploy no Netlify**:
   - Conecte o repositório
   - Configure build: `npm run build`
   - Configure publish: `dist`

3. **Configurar domínios**:
   - Domínio principal: `raiodoscachopos.com`
   - Subdomínio admin: `admin.raiodoscachopos.com`

4. **Configurar DNS**:
   - Adicione CNAME para `admin` apontando para o domínio principal

### Verificação
- ✅ Site principal acessível em `https://raiodoscachopos.com`
- ✅ Admin acessível em `https://admin.raiodoscachopos.com`
- ✅ SSL ativo em ambos
- ✅ Login funcional no admin

## 🧪 Resolução de Problemas

### Teste Local Não Funciona
1. **Limpe o cache do browser**: Ctrl+F5 ou Cmd+Shift+R
2. **Use modo incógnito**: Para evitar cache
3. **Verifique a URL**: Deve ter `?admin=true` para o painel admin
4. **Reinicie o servidor**: `npm run dev`

### Subdomínio Não Funciona em Produção
1. **Verifique DNS**: Use ferramentas como `nslookup admin.seudominio.com`
2. **Aguarde propagação**: DNS pode demorar até 48h
3. **Verifique SSL**: Certifique-se que está ativo para ambos os domínios
4. **Teste com www**: Alguns DNS precisam de configuração adicional

---

**Desenvolvido para Raio dos Cachopos** 🎵
*Pop Tradicional Agrobeto que toca diretamente ao coração*

### 📞 Suporte Técnico
Para questões técnicas ou alteração de credenciais, contacte o desenvolvedor.