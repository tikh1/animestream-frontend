import { API_LOGIN, API_REGISTER, API_ME } from '@/lib/api';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(API_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Geçersiz e-posta veya şifre');

    const data = await response.json();
    const token = data.data.token;
    localStorage.setItem('token', token);

    await fetchAndStoreUser(token);
    return data;
  } catch (error) {
    console.error('Giriş hatası:', error);
    throw error;
  }
};

export const register = async (email: string, name: string, password: string, password_confirmation: string) => {
  try {
    const response = await fetch(API_REGISTER, {
      method: 'POST',
      headers: { 'Accept': 'application/json',  'Content-type': 'application/json' },
      body: JSON.stringify({ email, name, password, password_confirmation }),
    });

    if (!response.ok) throw new Error('Kayıt işlemi başarısız!');

    const data = await response.json();
    const token = data.data.token;
    localStorage.setItem('token', token);

    await fetchAndStoreUser(token);
    return data;
  } catch (error) {
    console.error('Kayıt hatası:', error);
    throw error;
  }
};

export const getUser = async (token: string): Promise<User> => {
  const response = await fetch(API_ME, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Yetkisiz erişim');

  return await response.json();
};

const fetchAndStoreUser = async (token: string) => {
    try {
      const userData = await getUser(token);
      const name = userData.data.name;
      const email = userData.data.email;
      localStorage.setItem('user', name);
      localStorage.setItem('email', email);
    } catch (error) {
      console.error('Kullanıcı bilgisi alınamadı:', error);
    }
  };
  


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  };