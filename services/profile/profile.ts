import { getProfile } from '@/lib/api';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

const fetchProfile = async (username: string): Promise<UserProfile> => {
  try {
    const response = await getProfile(username);
    const profileData = response.data.data.user;

    return{
      name: profileData.name,
      email: profileData.email,
      avatar: profileData.avatar,
      bio: profileData.bio,
    };
  } catch (error) {
    console.error('Kullanıcı profili alınırken hata oluştu:', error);
    throw error;
  }
};

export default fetchProfile;