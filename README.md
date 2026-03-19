# 🦆 Pato — Controle de Despesas

Aplicativo de controle de despesas desenvolvido na disciplina de **Programação para Dispositivos Móveis (PDM)**.

---

## 📋 Sobre o Projeto

O **Pato** é um aplicativo móvel que permite ao usuário:

- 📊 **Visualizar** despesas cadastradas com resumo financeiro
- ➕ **Cadastrar** novas despesas com categoria, valor, data e observações
- 🔍 **Filtrar** despesas por período, categoria e faixa de valores

---

## 🏗️ Arquitetura

### Front-End (`frontend/`)

- **Tecnologias**: React Native + TypeScript + Expo
- **Arquitetura**: MVVM (Model-View-ViewModel)
- **Estrutura**:

```
frontend/src/
├── models/          # Entidades de domínio compartilhadas
├── services/        # Serviço HTTP de comunicação com o back-end
├── components/
│   ├── expense-item/       # Componente de item de despesa (tsx + style)
│   └── expense-filter/     # Componente de filtros (tsx + vm + style)
└── tabs/
    ├── home-tab/           # Aba principal com lista (tsx + vm + style)
    └── add-expense-tab/    # Aba de cadastro (tsx + vm + style)
```

Cada componente/tela possui:
- `<nome>.tsx` — componente React Native
- `<nome>.vm.ts` — view-model (classe com lógica e eventos)
- `<nome>.style.ts` — estilos customizados (quando aplicável)

### Back-End (`backend/`)

- **Tecnologias**: Node.js + TypeScript + ExpressJS + SQLite (better-sqlite3)
- **Arquitetura**: MVC (Model-View-Controller)
- **Estrutura**:

```
backend/src/
├── models/   # Entidades de domínio (interfaces e enums)
├── infra/    # Conexão com banco de dados SQLite
├── app/      # Lógica de negócio (managers — paradigma funcional)
└── api/      # Endpoints REST (controllers — Express Router)
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 20
- npm >= 9
- Expo Go (app no celular) ou emulador Android/iOS

### 1. Back-End

```bash
cd backend
npm install
npm run build
npm start
# Servidor disponível em http://localhost:3000
```

Para desenvolvimento (com hot-reload):
```bash
cd backend
npm install
npm run dev
```

### 2. Front-End

```bash
cd frontend
npm install
npm start
# Escanear o QR Code com o app Expo Go
```

> **Observação sobre o backend em dispositivos físicos**  
> Para acessar o backend rodando no computador, defina a variável
> `EXPO_PUBLIC_API_BASE_URL` com o IP da sua máquina na rede local.
> Exemplo:
> `EXPO_PUBLIC_API_BASE_URL=http://192.168.0.10:3000/api`.
> No emulador Android, o endereço padrão `http://10.0.2.2:3000/api` já é utilizado.

---

## 🌐 API REST

Base URL: `http://localhost:3000/api`

| Método | Endpoint              | Descrição                        |
|--------|-----------------------|----------------------------------|
| GET    | `/despesas`           | Listar despesas (com filtros)    |
| GET    | `/despesas/:id`       | Obter despesa por ID             |
| POST   | `/despesas`           | Criar nova despesa               |
| PUT    | `/despesas/:id`       | Atualizar despesa existente      |
| DELETE | `/despesas/:id`       | Excluir despesa                  |

### Parâmetros de Filtro (GET /despesas)

| Parâmetro    | Tipo   | Descrição                     |
|--------------|--------|-------------------------------|
| dataInicio   | string | Data inicial (YYYY-MM-DD)     |
| dataFim      | string | Data final (YYYY-MM-DD)       |
| categoria    | string | Categoria da despesa          |
| valorMinimo  | number | Valor mínimo                  |
| valorMaximo  | number | Valor máximo                  |

### Categorias Disponíveis

| Valor         | Rótulo       |
|---------------|--------------|
| ALIMENTACAO   | Alimentação  |
| TRANSPORTE    | Transporte   |
| SAUDE         | Saúde        |
| EDUCACAO      | Educação     |
| LAZER         | Lazer        |
| MORADIA       | Moradia      |
| VESTUARIO     | Vestuário    |
| OUTROS        | Outros       |

### Exemplo de Payload (POST /despesas)

```json
{
  "descricao": "Almoço no restaurante",
  "valor": 35.90,
  "data": "2026-03-18",
  "categoria": "ALIMENTACAO",
  "observacoes": "Reunião de trabalho"
}
```

---

## 🛠️ Scripts Disponíveis

### Back-End

| Script         | Descrição                          |
|----------------|------------------------------------|
| `npm run build`| Compila TypeScript para JavaScript |
| `npm start`    | Inicia o servidor (requer build)   |
| `npm run dev`  | Inicia em modo desenvolvimento     |

### Front-End

| Script              | Descrição                         |
|---------------------|-----------------------------------|
| `npm start`         | Inicia o servidor Expo            |
| `npm run android`   | Inicia no emulador Android        |
| `npm run ios`       | Inicia no simulador iOS           |
| `npm run type-check`| Verifica tipos TypeScript         |

---

## 📦 Dependências Principais

### Back-End
- `express` — framework HTTP
- `better-sqlite3` — banco de dados SQLite
- `cors` — habilita CORS para o front-end

### Front-End
- `expo` — plataforma React Native
- `@react-navigation/native` + `@react-navigation/bottom-tabs` — navegação
- `@expo/vector-icons` — ícones

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
