import { api } from './api';

export type MoviePayload = {
  title: string; description?: string; year: number; director?: string; duration?: number | null;
  rating?: number | null; status: 'watched' | 'want_to_watch' | 'watching'; favorite?: boolean;
  genre_id?: number | null; image_url?: string | null; trailer_url?: string | null;
};
export type ApiMovie = MoviePayload & { id: string; user_id: string; created_at: string; genres?: { id: number; name: string } | null };

export const getMovies = (query = '') => api<ApiMovie[]>(`/movies${query ? `?${query}` : ''}`);
export const getMovie = (id: string) => api<ApiMovie>(`/movies/${id}`);
export const createMovie = (movie: MoviePayload) => api<ApiMovie>('/movies', { method: 'POST', body: JSON.stringify(movie) });
export const updateMovie = (id: string, movie: Partial<MoviePayload>) => api<ApiMovie>(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(movie) });
export const deleteMovie = (id: string) => api<void>(`/movies/${id}`, { method: 'DELETE' });
export const getGenres = () => api<{ id: number; name: string }[]>('/genres');

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('pt-BR');

// Converte o texto digitado ("Ação / Aventura") no id do gênero cadastrado no banco.
// Ignora acentos e maiúsculas; se não existir, informa quais gêneros são válidos em vez de salvar sem gênero.
export async function resolveGenreId(category: string): Promise<number> {
  const genres = await getGenres();
  const first = category.split('/')[0].trim();
  const genre = genres.find(item => normalize(item.name) === normalize(first));
  if (!genre) throw new Error(`Gênero "${first}" não encontrado. Use um destes: ${genres.map(g => g.name).join(', ')}.`);
  return genre.id;
}

// Aceita tanto o ID do vídeo quanto a URL completa do YouTube.
export function extractYoutubeId(input?: string | null): string {
  if (!input) return '';
  const text = input.trim();
  const match = text.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : text;
}
export const youtubeUrl = (input?: string | null) => {
  const id = extractYoutubeId(input);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
};
