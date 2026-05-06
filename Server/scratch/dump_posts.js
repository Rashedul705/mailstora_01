const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Post = require('../src/models/Post');

const dumpPosts = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    const posts = await Post.find({}, { title: 1, coverImage: 1, slug: 1 });
    console.log(JSON.stringify(posts, null, 2));
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

dumpPosts();
