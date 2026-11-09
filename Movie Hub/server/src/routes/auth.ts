import { Router } from 'express';
import { createAnonClient } from '../lib/supabase.js';
const router = Router();

function translate(message: string) {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (m.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar.';
  if (m.includes('already registered')) return 'Este e-mail já está cadastrado.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
  if (m.includes('invalid email') || m.includes('unable to validate email')) return 'E-mail inválido.';
  return message;
}

router.post('/register', async (req, res) => {
  const { email, password, nome } = req.body ?? {};
  if (!email || !password || !nome) return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  if (String(password).length < 6) return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  const { data, error } = await createAnonClient().auth.signUp({ email, password, options: { data: { nome } } });
  if (error) return res.status(400).json({ message: translate(error.message) });
  const message = data.session
    ? 'Cadastro realizado com sucesso.'
    : 'Cadastro realizado. Confirme seu e-mail para poder entrar.';
  return res.status(201).json({ message, user: data.user, session: data.session });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  const { data, error } = await createAnonClient().auth.signInWithPassword({ email, password });
  if (error || !data.session) return res.status(401).json({ message: translate(error?.message ?? 'Não foi possível entrar.') });
  return res.status(200).json({ user: data.user, session: data.session });
});

// Renova o access_token (que expira em ~1h) usando o refresh_token guardado no aplicativo.
router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body ?? {};
  if (!refresh_token) return res.status(400).json({ message: 'refresh_token é obrigatório.' });
  const { data, error } = await createAnonClient().auth.refreshSession({ refresh_token });
  if (error || !data.session) return res.status(401).json({ message: 'Sessão expirada. Entre novamente.' });
  return res.status(200).json({ user: data.user, session: data.session });
});

router.post('/logout', async (_req, res) => {
  // A sessão é removida do armazenamento local pelo aplicativo.
  return res.status(200).json({ message: 'Sessão encerrada.' });
});
export default router;
