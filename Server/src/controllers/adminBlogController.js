const Post = require('../models/Post');
const axios = require('axios');
const FormData = require('form-data');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPostForEditing = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post for editing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    
    // Check if slug exists
    if (postData.slug) {
      let uniqueSlug = postData.slug;
      let counter = 2;
      while (await Post.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${postData.slug}-${counter}`;
        counter++;
      }
      postData.slug = uniqueSlug;
    }

    if (postData.status === 'published' && !postData.publishedAt) {
      postData.publishedAt = new Date();
    }

    const newPost = new Post(postData);
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postData = req.body;

    // Check if slug is being changed and if it's unique
    if (postData.slug) {
      const existingPostWithSlug = await Post.findOne({ slug: postData.slug, _id: { $ne: id } });
      if (existingPostWithSlug) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
    }

    if (postData.status === 'published' && !postData.publishedAt) {
      postData.publishedAt = new Date();
    }

    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true, runValidators: true });
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imageFile = req.file;
    
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      console.warn("IMGBB_API_KEY not set. Using fallback logic for image upload.");
      return res.status(500).json({ error: 'IMGBB API Key is missing in server environment.' });
    }

    const formData = new FormData();
    formData.append('image', imageFile.buffer.toString('base64'));

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
        headers: formData.getHeaders(),
    });

    if (response.data && response.data.data && response.data.data.url) {
        res.json({ url: response.data.data.url });
    } else {
        throw new Error("Invalid response from ImgBB");
    }

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
