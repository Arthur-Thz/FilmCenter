import { api } from './api';

export type Profile = { id: string; nome: string; foto_url?: string | null; email?: string };

export const getProfile = () => api<Profile>('/profiles/me');
export const updateProfile = (data: { nome?: string; foto_url?: string | null }) =>
  api<Profile>('/profiles/me', { method: 'PUT', body: JSON.stringify(data) });
