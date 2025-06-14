# EcoHábito - Sistema de Gestão de Tarefas Sustentáveis

O EcoHábito é uma aplicação web desenvolvida para promover práticas sustentáveis através de um sistema de tarefas e conquistas. A aplicação permite que os usuários registrem e acompanhem suas ações sustentáveis, ganhando pontos e desbloqueando conquistas ao longo do caminho.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- React Router DOM
- Axios
- React Icons

### Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2
- Maven

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Java 17 ou superior
- Maven 3.6 ou superior

## 🔧 Instalação

### Backend

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ecohabito.git
cd ecohabito/backend-ecohabito-main
```

2. Configure o banco de dados PostgreSQL:
- Crie um banco de dados chamado `ecohabito`
- Atualize as credenciais no arquivo `application.properties` se necessário

3. Execute o projeto:
```bash
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8081`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd ../frontend-ecohabito-main
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🎯 Funcionalidades

### Tarefas Sustentáveis
- Criação e gerenciamento de tarefas sustentáveis
- Categorização por tipo (Energia, Água, Resíduos, Consumo)
- Níveis de dificuldade (Fácil, Médio, Difícil)
- Acompanhamento de impacto ambiental

### Sistema de Conquistas
- Conquistas desbloqueáveis ao completar tarefas
- Pontuação por ações sustentáveis
- Streak de tarefas completadas
- Estatísticas de impacto ambiental

### Dashboard
- Visão geral do progresso
- Gráficos de impacto ambiental
- Lista de conquistas
- Histórico de tarefas

## 📊 Estrutura do Projeto

```
ecohabito/
├── backend-ecohabito-main/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/ecohabito/api/
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── frontend-ecohabito-main/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── types/
    │   └── utils/
    ├── public/
    └── package.json
```

## 🔐 Variáveis de Ambiente

### Backend
Casa decida por usar PostgreSQL:
```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecohabito
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### Frontend
```env
# .env
VITE_API_URL=http://localhost:8081/api
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- Material-UI por fornecer componentes React de alta qualidade
- Spring Boot por simplificar o desenvolvimento backend
- PostgreSQL por ser um banco de dados robusto e confiável 
