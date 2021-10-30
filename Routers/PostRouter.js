const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController.js');
const protect = require('../controllers/AuthController.js');

//api/posts/
router
	.route('/')
	.get(postController.getAllPosts)
	.post(protect.protectUser, postController.createPosts);
router
	.route('/:id')
	.patch(protect.protectUser, postController.updatePost)
	.delete(protect.protectUser, postController.deletePost);

module.exports = router;
