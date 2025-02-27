import axios from 'axios';
import { API_AVATAR } from '@/lib/api';

const uploadAvatar = async (file: File) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Kullanıcı girişi yapılmamış. Token bulunamadı.');
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const response = await axios.post(API_AVATAR, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Resim yükleme başarısız: ' + (error as any).message);
    }
};

export default uploadAvatar;
