import { login as loginApi, register as registerApi, getMe } from '@/lib/api';

export interface User {
  email: string;
  roles: string[];
  name: string;
  bio?: string;
  avatar?: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await loginApi({ email, password });
    const data = response.data;
    const token = data.data.token;
    const roles = data.data.roles?.map((role: any) => role.name) || [];

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('user', data.data.user.name);

    return data;
  } catch (error) {
    console.error('Giriş hatası:', error);
    throw error;
  }
};

export const register = async (email: string, name: string, password: string, password_confirmation: string) => {
  try {
    const response = await registerApi({ email, name, password, password_confirmation });
    const data = response.data;
    const token = data.data.token;
    const roles = data.data.roles?.map((role: any) => role.name) || [];

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('user', data.data.user.name);

    return data;
  } catch (error) {
    console.error('Kayıt hatası:', error);
    throw error;
  }
};

export const me = async (token: string): Promise<User> => {
  const response = await getMe();
  const userData = response.data;

  const { name, email, bio, avatar, roles } = userData.data;

  return {
    name,
    email,
    bio: bio || '',
    roles: roles?.map((role: any) => role.name) || [],
    avatar: avatar || '',
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  localStorage.removeItem('roles');

};
