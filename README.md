# 🛠️ Ajuda Aqui! — Plataforma de Conexão para Serviços Locais

O **Ajuda Aqui!** é uma aplicação web desenvolvida como **Projeto Integrador** do curso **Programador de Sistemas 2025** do SENAC São Carlos, com o objetivo de conectar prestadores de serviços autônomos (encanadores, eletricistas, pintores, jardineiros, etc.) a clientes que necessitam de suporte em sua região de forma simples, direta e rápida.

---

## 👥 Autores do Projeto

Projetado e desenvolvido por:
- **Rafael Crempe**
- **Marcos Curila**
- **Renan Victorino**

---

## 📁 Estrutura do Repositório

O repositório está organizado em duas fases principais de desenvolvimento:

```text
ajuda_aqui/
├── projeto_inicial/     # 📐 Fase 1: Esboço e Protótipo Estático (HTML5, CSS3, JS Vanilla)
└── projeto_react/       # 🚀 Fase 2: Aplicação Final Completa e Dinâmica (React.js + Supabase)
```

### 1. `projeto_inicial/` (Esboço Inicial)
Fase de prototipagem rápida e validação de interface. Desenvolvido inteiramente com tecnologias web fundamentais:
- `index.html`: Página principal com vitrine de serviços.
- `login.html`: Estrutura dos formulários de login e cadastro.
- `perfil.html`: Esboço do layout do perfil do prestador/cliente.
- `/assets`: Recursos visuais e arquivos de estilo estáticos.

### 2. `projeto_react/` (Projeto Finalizado)
Aplicação web completa, reativa, responsiva e com backend integrado em tempo real.
- **Frontend SPA**: React.js com arquitetura baseada em componentes reusáveis.
- **Roteamento**: React Router DOM (v6) com controle de rotas públicas e rotas protegidas (*Private Routes*).
- **Backend & Banco de Dados**: Supabase (PostgreSQL, Supabase Auth e Storage).
- **Responsividade**: Layout responsivo adaptado para Monitores Desktop, Tablets e Smartphones.

---

## ✨ Principais Funcionalidades

- **🔒 Autenticação de Usuários**: Sistema completo de Login e Cadastro (distinguindo entre *Cliente* e *Profissional*) via Supabase Auth.
- **🔍 Filtragem de Profissionais**: Busca dinâmica por categoria de serviço diretamente na tela inicial.
- **👤 Perfil Personalizável**:
  - Exibição de dados do profissional/cliente.
  - Edição de perfil (nome, telefone, foto de perfil, senha).
  - Galeria de fotos de trabalhos anteriores com upload de imagens.
- **⭐ Sistema de Avaliações**: Avaliação em estrelas (Star Rating) e comentários para serviços concluídos.
- **🛡️ Segurança & RLS**: Autenticação com sessão única compartilhada e controle de dados no Supabase.

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia / Biblioteca |
|---|---|
| **Linguagem & Framework** | React.js (Create React App) |
| **Navegação & Roteamento** | React Router DOM v6 |
| **Backend as a Service (BaaS)** | Supabase (Database PostgreSQL, Auth, Storage) |
| **Estilização & UI** | Vanilla CSS, React Bootstrap, Font Awesome 6 |
| **Tipografia** | Open Sans (Google Fonts) |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- `npm` ou `yarn`

### Passo a Passo

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/rafaelcrempe/ajuda_aqui.git
   cd ajuda_aqui/projeto_react
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do Ambiente (`.env`)**:
   Crie um arquivo `.env` na raiz da pasta `projeto_react` baseando-se no arquivo `.env.example`:
   ```env
   REACT_APP_SUPABASE_URL=https://wvljndxyaidxngxzfmyc.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   ```
   Acesse a aplicação no navegador em `http://localhost:3000`.

---

## 📄 Licença

Este projeto foi criado para fins acadêmicos e educacionais. Todos os direitos reservados aos autores.
