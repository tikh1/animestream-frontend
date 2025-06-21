import { getBlogs } from '@/lib/api';

export interface Blog {
    id: number;
    meta_title: string;
    meta_description: string;
    title: string;
    description: string;
    slug: string;
    thumbnail: string;
    category: string;
    publishDate: string;
    author: string;
}

const fetchBlogList = async (): Promise<Blog[]> => {
    try {
        const response = await getBlogs();
        const bloglistData = response.data;
        
        return bloglistData.data.blogs.map((blog: any) => ({
            id: blog.id,
            meta_title: blog.meta_title,
            meta_description: blog.meta_description,
            title: blog.title,
            description: blog.description,
            slug: blog.slug,
            thumbnail: blog.thumbnail || "",
            category: blog.category,
            publishDate: blog.publishDate,
            author: blog.author
        }));
    } catch (error) {
        console.error('Blog listesi alınırken hata oluştu:', error);
        throw error;
    }
};

export default fetchBlogList;
