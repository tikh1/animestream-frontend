import { postComment, postEpisodeComment, updateComment, deleteComment } from '@/lib/api';

const createComment = async (
    message: string, 
    anime_id: number, 
    parent_id?: number | null
) => {
    try {
        const response = await postComment({ comment: message, anime_id, parent_id });
        return response.data;
    } catch (error) {
        throw new Error('Comment creation failed: ' + (error as any).message);
    }
};

const createEpisodeComment = async (
    message: string, 
    episode_id: number, 
    parent_id?: number | null
) => {
    try {
        const response = await postEpisodeComment({ comment: message, episode_id, parent_id });
        return response.data;
    } catch (error) {
        throw new Error('Episode comment creation failed: ' + (error as any).message);
    }
};

const updateCommentService = async (
    commentId: number,
    message: string
) => {
    try {
        const response = await updateComment(commentId, { comment: message });
        return response.data;
    } catch (error) {
        throw new Error('Comment update failed: ' + (error as any).message);
    }
};

const deleteCommentService = async (commentId: number) => {
    try {
        const response = await deleteComment(commentId);
        return response.data;
    } catch (error) {
        throw new Error('Comment deletion failed: ' + (error as any).message);
    }
};

export { createComment as default, createEpisodeComment, updateCommentService, deleteCommentService };
