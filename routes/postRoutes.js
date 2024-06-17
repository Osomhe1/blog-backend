const express = require('express')
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} = require('../controllers/postController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', authenticate, createPost)
router.put('/:id', authenticate, updatePost)
router.delete('/:id', authenticate, deletePost)

module.exports = router
