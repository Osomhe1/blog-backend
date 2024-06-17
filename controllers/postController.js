const { Post } = require('../models')

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, userId: req.userId })
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (post.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    await post.update(req.body)
    res.json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (post.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    await post.destroy()
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
