import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.use(requireAuth);

const STATUSES = ['watched', 'want_to_watch', 'watching'];
const validYear = (v: unknown) => Number.isInteger(Number(v)) && Number(v) >= 1888 && Number(v) <= 2100;

const SORTABLE = ['title', 'year', 'rating', 'created_at'];

// GET /movies?search=matrix&status=watched&genre=4&favorite=true&sort=year&order=desc
router.get('/', async (req, res) => {
  let query = req.db!.from('movies').select('*, genres(id,name)');
  const text = req.query.search ?? req.query.title;
  if (text) query = query.ilike('title', `%${String(text)}%`);
  if (req.query.status) query = query.eq('status', String(req.query.status));
  const genre = req.query.genre_id ?? req.query.genre;
  if (genre) query = query.eq('genre_id', Number(genre));
  if (req.query.favorite === 'true') query = query.eq('favorite', true);
  const sort = SORTABLE.includes(String(req.query.sort)) ? String(req.query.sort) : 'created_at';
  const ascending = req.query.order ? req.query.order === 'asc' : sort !== 'created_at';
  query = query.order(sort, { ascending });
  const { data, error } = await query;
  if (error) return res.status(500).json({ message: error.message });
  return res.json(data);
});

// GET /movies/favorites (precisa vir antes de /:id)
router.get('/favorites', async (req, res) => {
  const { data, error } = await req.db!.from('movies').select('*, genres(id,name)').eq('favorite', true).order('title');
  if (error) return res.status(500).json({ message: error.message });
  return res.json(data);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await req.db!.from('movies').select('*, genres(id,name)').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ message: 'Filme não encontrado.' });
  return res.json(data);
});

router.post('/', async (req, res) => {
  const { title, description, year, director, duration, rating, status, favorite, genre_id, image_url, trailer_url } = req.body ?? {};
  if (!title || !year || !status) return res.status(400).json({ message: 'Título, ano e status são obrigatórios.' });
  if (!STATUSES.includes(status)) return res.status(400).json({ message: 'Status inválido.' });
  if (!validYear(year)) return res.status(400).json({ message: 'Ano inválido. Informe um ano entre 1888 e 2100.' });
  if (rating !== undefined && (Number(rating) < 0 || Number(rating) > 5)) return res.status(400).json({ message: 'A nota deve estar entre 0 e 5.' });
  const payload = { title, description: description ?? '', year: Number(year), director: director ?? '', duration: duration ? Number(duration) : null, rating: rating === '' || rating == null ? null : Number(rating), status, favorite: Boolean(favorite), genre_id: genre_id || null, image_url: image_url || null, trailer_url: trailer_url || null, user_id: req.userId };
  const { data, error } = await req.db!.from('movies').insert(payload).select('*, genres(id,name)').single();
  if (error) return res.status(400).json({ message: error.message });
  return res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const allowed = ['title','description','year','director','duration','rating','status','favorite','genre_id','image_url','trailer_url'];
  const payload: Record<string, unknown> = {};
  for (const key of allowed) if (req.body?.[key] !== undefined) payload[key] = req.body[key];
  if (payload.year !== undefined && !validYear(payload.year)) return res.status(400).json({ message: 'Ano inválido. Informe um ano entre 1888 e 2100.' });
  if (payload.status !== undefined && !STATUSES.includes(String(payload.status))) return res.status(400).json({ message: 'Status inválido.' });
  if (payload.rating !== undefined && (Number(payload.rating) < 0 || Number(payload.rating) > 5)) return res.status(400).json({ message: 'A nota deve estar entre 0 e 5.' });
  if (Object.keys(payload).length === 0) return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
  const { data, error } = await req.db!.from('movies').update(payload).eq('id', req.params.id).select('*, genres(id,name)').maybeSingle();
  if (error) return res.status(400).json({ message: error.message });
  if (!data) return res.status(404).json({ message: 'Filme não encontrado ou sem permissão.' });
  return res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { data, error } = await req.db!.from('movies').delete().eq('id', req.params.id).select('id').maybeSingle();
  if (error) return res.status(400).json({ message: error.message });
  if (!data) return res.status(404).json({ message: 'Filme não encontrado ou sem permissão.' });
  return res.status(204).send();
});
export default router;
