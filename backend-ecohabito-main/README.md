# Backend EcoHábito

Este é o backend do projeto EcoHábito, desenvolvido em Java com Spring Boot.

## Requisitos

- Java 17 ou superior
- Maven

## Configuração

1. Clone o repositório
2. Navegue até a pasta do projeto
3. Execute o comando para instalar as dependências:
```bash
mvn clean install
```

## Executando o projeto

Para iniciar o servidor, execute:
```bash
mvn spring-boot:run
```

O servidor estará disponível em `http://localhost:8080`

## Endpoints da API

### Tarefas
- GET `/api/tasks` - Lista todas as tarefas
- GET `/api/tasks/{id}` - Obtém uma tarefa específica
- GET `/api/tasks/category/{category}` - Lista tarefas por categoria
- POST `/api/tasks` - Cria uma nova tarefa
- PUT `/api/tasks/{id}` - Atualiza uma tarefa
- DELETE `/api/tasks/{id}` - Remove uma tarefa
- PATCH `/api/tasks/{id}/toggle` - Alterna o status de conclusão da tarefa

### Conquistas
- GET `/api/achievements` - Lista todas as conquistas
- GET `/api/achievements/{id}` - Obtém uma conquista específica
- GET `/api/achievements/unlocked` - Lista conquistas desbloqueadas
- POST `/api/achievements` - Cria uma nova conquista
- PUT `/api/achievements/{id}` - Atualiza uma conquista
- DELETE `/api/achievements/{id}` - Remove uma conquista

### Estatísticas
- GET `/api/stats` - Obtém as estatísticas do usuário
- PUT `/api/stats` - Atualiza as estatísticas
- PATCH `/api/stats/reset` - Reseta as estatísticas

## Banco de Dados

O projeto utiliza o banco de dados H2 em memória. O console do H2 está disponível em:
`http://localhost:8080/h2-console`

Credenciais:
- JDBC URL: `jdbc:h2:mem:ecohabito`
- Username: `sa`
- Password: (vazio) 