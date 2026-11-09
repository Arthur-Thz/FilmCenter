import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;
if (!url || !anonKey) throw new Error('Configure SUPABASE_URL e SUPABASE_ANON_KEY no arquivo .env');
if (url.includes('SEU-PROJETO') || anonKey.includes('SUA_CHAVE')) {
  throw new Error('O arquivo server/.env ainda contém os valores de exemplo. Preencha com os dados reais do seu projeto Supabase.');
}

const baseOptions = { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } };

// Cliente apenas para validar tokens (getUser). Não guarda sessão de ninguém.
export const supabase = createClient(url, anonKey, baseOptions);

// Cliente novo e sem estado para cada operação de autenticação (login, cadastro, refresh).
// Evita que a sessão de um usuário fique "grudada" em um cliente compartilhado entre requisições.
export const createAnonClient = () => createClient(url, anonKey, baseOptions);

// Cliente que encaminha o JWT do usuário, para que as políticas RLS do PostgreSQL sejam aplicadas.
export const createUserClient = (token: string) =>
  createClient(url, anonKey, { ...baseOptions, global: { headers: { Authorization: `Bearer ${token}` } } });
