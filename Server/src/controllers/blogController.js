const Post = require('../models/Post');
const Subscriber = require('../models/Subscriber');

exports.getPublishedPosts = async (req, res) => {
  try {
    const { category, tag, page = 1, sort = 'latest', q } = req.query;
    const limit = 9;
    const skip = (parseInt(page) - 1) * limit;

    let query = { status: 'published' };

    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = tag;
    }

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    let sortOption = { publishedAt: -1 };
    if (sort === 'popular') {
      sortOption = { views: -1 };
    }

    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude content for list view to save bandwidth

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await Post.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching single post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ message: 'Already subscribed' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
