# Requisitos do Projeto CourseKeeper

## 1. Requisitos Funcionais

1.1. O usuário deve poder criar uma conta informando nome, sobrenome, email, CPF e senha.
1.2. O usuário deve poder autenticar-se (login) com email e senha.
1.3. O usuário deve receber mensagens de erro claras ao tentar logar com credenciais inválidas.
1.4. O sistema deve bloquear o login após 5 tentativas inválidas, exibindo mensagem adequada.
1.5. O usuário deve poder MANTER cursos (cadastrar, editar, excluir, visualizar lista e detalhes).
1.6. O sistema deve exibir, na página de cursos, para cada curso: progresso individual (%), horas estudadas, status (não iniciado, em progresso, concluído, não concluído), data de início e conclusão (se houver), plataforma, tópico e idioma.
1.7. O usuário deve visualizar estatísticas gerais no dashboard: total de cursos cadastrados, total de cursos concluídos, total de horas estudadas, progresso geral dos cursos, progresso das metas (percentual), última meta criada e seu status.
1.8. O usuário deve poder MANTER metas (cadastrar, editar, excluir, visualizar lista e progresso).
1.9. O sistema deve exibir, na página de metas: lista de metas ativas, concluídas e vencidas, progresso de cada meta (percentual), quantidade de metas por status, última meta criada e seu status.
1.10. O usuário deve poder editar seu perfil, incluindo upload de avatar e descrição.
1.11. O sistema deve exibir, na página de perfil: nome, email, CPF, avatar, descrição, máximo de dias de streak/login, total de cursos cadastrados, total de metas criadas/concluídas, links para redes sociais.
1.12. O sistema deve exibir loaders e skeletons para melhorar a experiência durante carregamentos.
1.13. O sistema deve garantir layout estável (sem flicker/CLS) durante carregamentos e transições.
1.14. O sistema deve exibir mensagens de erro de backend no frontend de forma clara.

## 2. Casos de Uso

### UC01 - Cadastro de Usuário
- Ator: Visitante
- Fluxo principal:
  1. Acessa a tela de cadastro.
  2. Preenche nome, sobrenome, email, CPF e senha.
  3. Submete o formulário.
  4. Recebe confirmação de cadastro ou mensagem de erro.

### UC02 - Login
- Ator: Usuário
- Fluxo principal:
  1. Acessa a tela de login.
  2. Informa email e senha.
  3. Submete o formulário.
  4. Se credenciais corretas, é autenticado e redirecionado.
  5. Se incorretas, recebe mensagem de erro.
  6. Após 5 tentativas inválidas, recebe mensagem de bloqueio.

### UC03 - MANTER Cursos
- Ator: Usuário autenticado
- Fluxo principal:
  1. Acessa a tela de cursos.
  2. Pode cadastrar, editar, excluir cursos.
  3. Visualiza lista de cursos cadastrados.
  4. Visualiza detalhes de um curso ao selecioná-lo.
  5. Visualiza estatísticas individuais de cada curso: progresso (%), horas estudadas, status, data de início/conclusão, plataforma, tópico e idioma.

### UC04 - MANTER Metas
- Ator: Usuário autenticado
- Fluxo principal:
  1. Acessa a tela de metas.
  2. Pode cadastrar, editar, excluir metas.
  3. Visualiza lista e progresso das metas.
  4. Visualiza estatísticas de metas: lista de metas ativas, concluídas e vencidas, progresso de cada meta, quantidade de metas por status, última meta criada.

### UC05 - Edição de Perfil
- Ator: Usuário autenticado
- Fluxo principal:
  1. Acessa a tela de perfil.
  2. Edita informações e faz upload de avatar.
  3. Salva alterações.
  4. Visualiza estatísticas do perfil: nome, email, CPF, avatar, descrição, máximo de dias de streak/login, total de cursos cadastrados, total de metas criadas/concluídas, links para redes sociais.

### UC06 - Visualizar Estatísticas do Dashboard
- Ator: Usuário autenticado
- Fluxo principal:
  1. Acessa o dashboard.
  2. Visualiza cards e gráficos de: total de cursos cadastrados, total de cursos concluídos, total de horas estudadas, progresso geral dos cursos, progresso das metas, última meta criada e seu status, evolução semanal/mensal.

### UC07 - Experiência de Usuário
- Ator: Todos
- Fluxo principal:
  1. Visualiza loaders e skeletons durante carregamentos.
  2. Não percebe flicker ou CLS nas transições.
  3. Recebe mensagens de erro claras do backend.

---