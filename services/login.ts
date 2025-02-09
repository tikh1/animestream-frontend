import { API_LOGIN } from '@/lib/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Geçersiz e-posta veya şifre');
    }

    return await response.json();
  } catch (error) {
    console.error('Kayıt hatası:', error);
    throw error;
  }
};
