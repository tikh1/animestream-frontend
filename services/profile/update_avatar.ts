import { updateAvatar as updateAvatarApi } from '@/lib/api';

interface AvatarResponse {
    message: string;
    avatarUrl: string;
}

const updateAvatar = async (file: File): Promise<AvatarResponse> => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const response = await updateAvatarApi(formData);
        const responseData = response.data.data;

        return{
            message: responseData.message,
            avatarUrl: responseData.avatar,
        };
    } catch (error) {
        throw new Error('Resim yükleme başarısız: ' + (error as any).message);
    }
};

export default updateAvatar;
