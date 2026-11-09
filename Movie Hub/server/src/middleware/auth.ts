import type { NextFunction, Request, Response } from 'express';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase, createUserClient } from '../lib/supabase.js';

declare global {
  namespace Express {
    interface Request { userId?: string; userEmail?: string; userName?: string; accessToken?: string; db?: SupabaseClient }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token não informado.' });
  const token = header.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
  req.userId = data.user.id;
  req.userEmail = data.user.email ?? undefined;
  req.userName = typeof data.user.user_metadata?.nome === 'string' ? data.user.user_metadata.nome : '';
  req.accessToken = token;
  req.db = createUserClient(token);
  next();
}
