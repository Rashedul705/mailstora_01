const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001') + '/api';

export const blogApi = {
  // Public Methods
  getPosts: async (page = 1, category = 'All', tag = '', sort = 'latest') => {
    let url = `${API_URL}/blog?page=${page}&sort=${sort}`;
    if (category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;
    if (tag) url += `&tag=${encodeURIComponent(tag)}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },

  getPostBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/blog/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
        if(res.status === 404) return null;
        throw new Error('Failed to fetch post');
    }
    return res.json();
  },

  searchPosts: async (query: string) => {
    const res = await fetch(`${API_URL}/blog/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search posts');
    return res.json();
  },

  subscribe: async (email: string) => {
    const res = await fetch(`${API_URL}/blog/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to subscribe');
    }
    return res.json();
  },

  // Admin Methods (requires token)
  getAdminPosts: async (token: string, status = '', category = 'All') => {
    let url = `${API_URL}/admin/blog?`;
    if (status) url += `status=${status}&`;
    if (category && category !== 'All') url += `category=${encodeURIComponent(category)}`;

    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch admin posts');
    return res.json();
  },

  getAdminPostById: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/admin/blog/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  },

  createPost: async (token: string, data: any) => {
    const res = await fetch(`${API_URL}/admin/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
  },

  updatePost: async (token: string, id: string, data: any) => {
    const res = await fetch(`${API_URL}/admin/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
  },

  deletePost: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return res.json();
  },

  uploadImage: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_URL}/admin/blog/upload-image`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  }
};
