import { api, getToken, removeToken, saveSession, type Session } from './api';

export async function login(email: string, password: string) {
  const result = await api<{ session: Session | null; user: any }>('/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  });
  if (!result.session?.access_token) throw new Error('O Supabase não retornou uma sessão. Confira a confirmação do e-mail.');
  await saveSession(result.session);
  return result.user;
}

export async function register(nome: string, email: string, password: string) {
  const result = await api<{ session: Session | null; message: string }>('/auth/register', {
    method: 'POST', body: JSON.stringify({ nome, email, password }),
  });
  if (result.session?.access_token) await saveSession(result.session);
  return result;
}

export async function logout() {
  await api('/auth/logout', { method: 'POST' }).catch(() => undefined);
  await removeToken();
}

// Verifica se existe uma sessão salva e ainda válida (renovando-a se preciso). Usado ao abrir o app.
export async function restoreSession(): Promise<boolean> {
  if (!(await getToken())) return false;
  try {
    await api('/profiles/me');
    return true;
  } catch {
    return false;
  }
}
