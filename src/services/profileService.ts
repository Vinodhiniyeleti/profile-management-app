const API_URL = 'https://68259a2b0f0188d7e72d96d4.mockapi.io/api/v1/users';
const CACHE_KEY = 'cached_profile';

export const getProfile = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await fetch(`${API_URL}r`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  const data = await res.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
};

export const createProfile = async (profile: any) => {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  const data = await res.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
};

export const updateProfile = async (id: string, profile: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  const data = await res.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
};

export const deleteProfileApi = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  localStorage.removeItem(CACHE_KEY);
};
