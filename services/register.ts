import { API_REGISTER } from '@/lib/api';


export const register = async (email: string, name: string, password: string, password_confirmation: string) => {
    try {
      const response = await fetch(`${API_REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password, password_confirmation })
      });
  
      if (!response.ok) {
        console.error(response);
        throw new Error('Kayıt işlemi başarısız!');
      }
  
      return response.json();
    } catch (error) {
      console.error('Kayıt hatası:', error);
      throw error;
    }
  };
  