const { Comment } = require('../models')

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, userId: req.userId })
    res.status(201).json(comment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
    })
    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
