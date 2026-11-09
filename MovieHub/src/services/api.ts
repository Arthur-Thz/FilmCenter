import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Android Emulator não enxerga o "localhost" do computador: o endereço correto é 10.0.2.2.
// Em celular físico, defina EXPO_PUBLIC_API_URL com o IP local do computador (ex.: http://192.168.0.10:3000).
const rawUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
export const API_URL = (Platform.OS === 'android' ? rawUrl.replace(/\/\/(localhost|127\.0\.0\.1)/, '//10.0.2.2') : rawUrl).replace(/\/+$/, '');

const TOKEN_KEY = '@moviehub:access_token';
const REFRESH_KEY = '@moviehub:refresh_token';
const TIMEOUT_MS = 15000;

export type Session = { access_token: string; refresh_token?: string | null };

export async function saveToken(token: string) { await AsyncStorage.setItem(TOKEN_KEY, token); }
export async function removeToken() { await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY]); }
export async function getToken() { return AsyncStorage.getItem(TOKEN_KEY); }

export async function saveSession(session: Session) {
  await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
  if (session.refresh_token) await AsyncStorage.setItem(REFRESH_KEY, session.refresh_token);
}

async function rawFetch(path: string, options: RequestInit, token: string | null): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error(`Não foi possível conectar à API (${API_URL}). Confira se o servidor está rodando e se EXPO_PUBLIC_API_URL está correto.`);
  } finally {
    clearTimeout(timer);
  }
}

// Várias requisições podem receber 401 ao mesmo tempo: todas aguardam a mesma renovação.
let refreshing: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_KEY);
        if (!refreshToken) return false;
        const response = await rawFetch('/auth/refresh', { method: 'POST', body: JSON.stringify({ refresh_token: refreshToken }) }, null);
        if (!response.ok) return false;
        const data = await response.json();
        if (!data?.session?.access_token) return false;
        await saveSession(data.session);
        return true;
      } catch {
        return false;
      } finally {
        refreshing = null;
      }
    })();
  }
  return refreshing;
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  let token = await getToken();
  let response = await rawFetch(path, options, token);

  // Token expirado: tenta renovar uma vez e repete a requisição.
  if (response.status === 401 && token && !path.startsWith('/auth/')) {
    if (await refreshSession()) {
      token = await getToken();
      response = await rawFetch(path, options, token);
    } else {
      await removeToken();
    }
  }

  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Não foi possível concluir a solicitação.');
  return data as T;
}
