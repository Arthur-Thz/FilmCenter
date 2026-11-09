# Movie Hub — versão conectada ao banco de dados

Projeto React Native + Expo com API Node.js/Express, autenticação Supabase e banco PostgreSQL.

## O que está conectado

- Cadastro e login de usuários pelo Supabase Auth.
- Sessão salva no aplicativo e restaurada ao abrir novamente.
- Perfil e e-mail carregados da conta autenticada.
- Minha Coleção: lista somente os filmes do usuário conectado.
- Cadastro, edição e exclusão de filmes persistidos no PostgreSQL.
- Proteção dos dados com Row Level Security (RLS): cada usuário só acessa os próprios filmes.

O catálogo de demonstração (Home, Filmes, Busca, Favoritos e Galeria) continua usando os dados locais originais. Os favoritos desse catálogo continuam salvos localmente no aparelho. A área **Perfil → Minha Coleção** é a parte conectada ao banco.

## 1. Preparar o Supabase

1. Crie um projeto em https://supabase.com.
2. Abra **SQL Editor → New query**.
3. Copie todo o conteúdo de `supabase/schema.sql`, execute e aguarde a confirmação.
4. Em **Project Settings → API**, copie a **Project URL** e a chave pública **anon/publishable**.
5. Em **Authentication → Providers → Email**, confira a configuração de confirmação de e-mail. Se a confirmação estiver ligada, o usuário precisará confirmar o e-mail antes de fazer login.

O script cria as tabelas `profiles`, `genres` e `movies`, as políticas RLS e os gêneros iniciais. Pode executá-lo novamente sem duplicar os gêneros.

**Segurança:** use somente a chave pública `anon`/`publishable` no servidor. Nunca coloque a chave `service_role` no aplicativo nem a envie para outras pessoas.

## 2. Configurar e iniciar a API

Abra um terminal na pasta do projeto:

```bash
cd server
npm install
```

Crie `server/.env` copiando `server/.env.example` e preencha:

```env
PORT=3000
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Inicie a API:

```bash
npm run dev
```

A API ficará disponível na porta `3000`. Para conferir, abra `http://localhost:3000` no navegador; deve aparecer um JSON com `status: online`.

## 3. Configurar e iniciar o aplicativo

Em outro terminal, na pasta principal `Movie Hub`:

```bash
npm install
```

Crie o arquivo `.env` copiando `.env.example`. Para Expo Web, mantenha:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Inicie o Expo:

```bash
npx expo start -c
```

### Qual endereço usar?

- **Expo Web no computador:** `http://localhost:3000`
- **Emulador Android:** pode manter `http://localhost:3000`; o app converte automaticamente para `10.0.2.2`.
- **Celular físico:** use o IP local do computador na mesma rede Wi-Fi, por exemplo `http://192.168.0.10:3000`. Nesse caso, troque o valor no `.env` do aplicativo e permita a porta `3000` no firewall.

Sempre reinicie o Expo depois de alterar `.env`.

## 4. Como testar

1. Mantenha a API rodando.
2. Abra o aplicativo e toque em **Cadastre-se**.
3. Crie a conta e, se necessário, confirme o e-mail.
4. Faça login.
5. Entre em **Perfil → Minha Coleção → Novo**.
6. Cadastre um filme, volte à coleção e confira se ele aparece.
7. Teste **Editar** e **Excluir**.
8. Feche e abra novamente o aplicativo para testar a restauração da sessão.

## Rotas da API

| Método | Caminho | Ação |
|---|---|---|
| POST | `/auth/register` | Criar conta |
| POST | `/auth/login` | Entrar |
| POST | `/auth/refresh` | Renovar sessão |
| POST | `/auth/logout` | Encerrar sessão local |
| GET/PUT | `/profiles/me` | Consultar/atualizar perfil |
| GET | `/genres` | Listar gêneros |
| GET | `/movies` | Listar filmes do usuário |
| GET | `/movies/:id` | Consultar um filme |
| POST | `/movies` | Cadastrar filme |
| PUT | `/movies/:id` | Editar filme |
| DELETE | `/movies/:id` | Excluir filme |

As rotas de perfil, gêneros e filmes exigem `Authorization: Bearer <access_token>`.

## Problemas comuns

- **Não foi possível conectar à API:** confira se `npm run dev` está ativo na pasta `server` e se o endereço `EXPO_PUBLIC_API_URL` está correto.
- **Funciona no computador, mas não no celular:** troque `localhost` pelo IP local do computador.
- **Confirme seu e-mail antes de entrar:** confirme o endereço cadastrado no e-mail recebido ou ajuste a confirmação no painel Supabase para o ambiente de testes.
- **Erro de tabela ou permissão:** execute novamente todo o arquivo `supabase/schema.sql`.
- **Gênero não encontrado:** use um dos gêneros inseridos pelo SQL: Ação, Aventura, Animação, Comédia, Documentário, Drama, Ficção Científica, Romance, Suspense ou Terror.
