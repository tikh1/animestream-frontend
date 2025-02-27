import { API_ANIMES } from '@/lib/api';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export const UserProfile = async (username: string): Promise<UserProfile> => {
  
  const response = await fetch(`${API_ANIMES}`);

  if (!response.ok) throw new Error('Kullanıcı bilgileri alınamadı.');

  const userData = await response.json();
  console.log("asdasd:", userData);

  const { name, email, bio, avatar } = userData.user;

  return {
    name: name || username,
    email,
    bio: bio || '',
    avatar,
  };
};
