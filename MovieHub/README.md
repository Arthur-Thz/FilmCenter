# MovieHub — conectividade

Projeto mobile em React Native + Expo conectado a uma API REST em Node.js + Express, que utiliza Supabase Auth e PostgreSQL.

## Arquitetura

`React Native / Expo → HTTP + JSON → Node.js / Express → Supabase → PostgreSQL`

O aplicativo não acessa o banco diretamente. Ele envia as requisições para a API, que valida a sessão e consulta o Supabase. O token JWT do usuário é encaminhado para o Supabase para que as políticas RLS sejam aplicadas.

## 1. Preparar o Supabase

1. Crie um projeto no painel do Supabase.
2. Abra **SQL Editor** e execute todo o conteúdo de `supabase/schema.sql`.
3. Em **Project Settings → API**, copie a Project URL e a chave pública `anon` (ou publishable, conforme a tela do projeto).
4. Em **Authentication → Providers → Email**, confira as opções de confirmação de e-mail. Se a confirmação estiver ativa, o usuário deverá confirmar o endereço antes de entrar.

O SQL cria `profiles`, `genres` e `movies`, relacionamentos, gêneros iniciais, trigger de perfil e políticas RLS. A tabela `auth.users` é gerenciada pelo Supabase Auth.

## 2. Configurar e iniciar a API

No terminal:

```bash
cd server
npm install
```

Copie `server/.env.example` para `server/.env` e preencha:

```env
PORT=3000
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Inicie a API:

```bash
npm run dev
```

Acesse `http://localhost:3000` para conferir se a API está online. **Nunca coloque a chave `service_role` no aplicativo ou neste arquivo.**

## 3. Configurar o aplicativo

Na pasta principal, copie `.env.example` para `.env` e ajuste `EXPO_PUBLIC_API_URL`:

- Expo Web / computador: `http://localhost:3000`
- Emulador Android: `http://10.0.2.2:3000`
- Celular físico: `http://IP-LOCAL-DO-COMPUTADOR:3000` (celular e computador na mesma rede Wi-Fi).

Depois instale as dependências e inicie:

```bash
npm install
npx expo start
```

## Endpoints implementados

| Método | Rota | Função |
|---|---|---|
| POST | `/auth/register` | Cadastro com Supabase Auth |
| POST | `/auth/login` | Login e retorno da sessão JWT |
| POST | `/auth/refresh` | Renova o token JWT (expira em ~1h) com o `refresh_token` |
| POST | `/auth/logout` | Encerramento da sessão (o app apaga o token local) |
| GET | `/profiles/me` | Consultar perfil autenticado (inclui e-mail; cria o perfil se não existir) |
| PUT | `/profiles/me` | Atualizar perfil |
| GET | `/genres` | Consultar gêneros |
| GET | `/movies` | Listar filmes do usuário; aceita `title`, `status`, `genre_id` e `favorite` |
| GET | `/movies/:id` | Consultar um filme |
| POST | `/movies` | Cadastrar filme |
| PUT | `/movies/:id` | Alterar filme |
| DELETE | `/movies/:id` | Excluir filme |

As rotas de perfil, gêneros e filmes exigem `Authorization: Bearer <access_token>`. As políticas RLS garantem que cada pessoa só consulte e altere os próprios filmes.

## Telas conectadas nesta base

- Login e cadastro: autenticação real via API/Supabase.
- Minha coleção (tela Filmes): consulta os registros do usuário no PostgreSQL.
- Cadastro, edição e exclusão: operações reais na tabela `movies`.
- Perfil: nome, e-mail e total de filmes assistidos vêm do banco; **Sair da Conta** apaga a sessão.
- Sessão: o app guarda `access_token` e `refresh_token`, renova o token automaticamente e reabre direto na Home se a sessão ainda for válida.

A tela inicial ainda mantém os filmes de demonstração que já vieram no projeto-base. A coleção particular fica na opção **Filmes**.

## Observações

- O projeto Supabase é externo e pertence ao aluno; por isso, as credenciais precisam ser preenchidas localmente no `.env`.
- A API foi preparada para desenvolvimento. Antes de publicar, configure CORS para o domínio permitido, HTTPS e variáveis de ambiente seguras.
- O aplicativo não utiliza a chave `service_role`; a API encaminha o JWT do usuário e mantém o controle de acesso no PostgreSQL com RLS.

## Solução de problemas de conexão

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Não foi possível conectar à API" | API desligada ou URL errada | Rode `npm run dev` em `server/` e confira `EXPO_PUBLIC_API_URL`. Reinicie o Expo (`npx expo start -c`) após editar o `.env`. |
| Funciona no PC, não no celular | `localhost` aponta para o próprio celular | Use o IP local do computador (ex.: `http://192.168.0.10:3000`), na mesma rede Wi-Fi, e libere a porta 3000 no firewall. |
| API não inicia: "valores de exemplo" | `server/.env` não foi preenchido | Informe `SUPABASE_URL` e `SUPABASE_ANON_KEY` reais. |
| "Confirme seu e-mail antes de entrar" | Confirmação de e-mail ativa no Supabase | Confirme o e-mail ou desative em **Authentication → Providers → Email** durante o desenvolvimento. |
| Erro de permissão / tabela inexistente | `schema.sql` não executado (ou executado só em parte) | Rode o arquivo inteiro no SQL Editor; ele pode ser executado de novo sem problemas. |
| "Gênero ... não encontrado" | Texto digitado não existe na tabela `genres` | Use um dos gêneros listados na própria mensagem. |
