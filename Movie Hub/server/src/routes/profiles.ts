import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.use(requireAuth);

router.get(['/me', '/'], async (req, res) => {
  const found = await req.db!.from('profiles').select('*').eq('id', req.userId).maybeSingle();
  if (found.error) return res.status(500).json({ message: found.error.message });
  let profile = found.data;
  // Contas criadas antes do trigger do schema podem não ter perfil: cria sob demanda.
  if (!profile) {
    const created = await req.db!.from('profiles').insert({ id: req.userId, nome: req.userName ?? '' }).select().single();
    if (created.error) return res.status(500).json({ message: created.error.message });
    profile = created.data;
  }
  return res.json({ ...profile, email: req.userEmail });
});

router.put(['/me', '/'], async (req, res) => {
  const payload: Record<string, unknown> = { id: req.userId };
  if (req.body?.nome !== undefined) payload.nome = String(req.body.nome).trim();
  if (req.body?.foto_url !== undefined) payload.foto_url = req.body.foto_url || null;
  const { data, error } = await req.db!.from('profiles').upsert(payload).select().single();
  if (error) return res.status(400).json({ message: error.message });
  return res.json({ ...data, email: req.userEmail });
});
export default router;
