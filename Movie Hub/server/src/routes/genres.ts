import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await req.db!.from('genres').select('id,name').order('name');
  if (error) return res.status(500).json({ message: error.message });
  return res.json(data);
});
router.get('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).json({ message: 'Gênero não encontrado.' });
  const { data, error } = await req.db!.from('genres').select('id,name').eq('id', id).maybeSingle();
  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: 'Gênero não encontrado.' });
  return res.json(data);
});
export default router;
