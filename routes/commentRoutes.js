const express = require('express')
const {
  createComment,
  getComments,
} = require('../controllers/commentController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

router.post('/', authenticate, createComment)
router.get('/:postId', getComments)

module.exports = router
