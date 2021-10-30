const Post = require('../models/Post');
// GET /api/posts
exports.getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res.status(200).json({
			status: 'success',
			results: posts.length,
			data: {
				posts,
			},
		});
	} catch (e) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
// GET /api/posts/:id
exports.getOnePosts = async (req, res, next) => {
	try {
		const posts = await Post.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (e) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
//POST api/posts
exports.createPosts = async (req, res, next) => {
	try {
		const posts = await Post.create(req.body);
		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (e) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
// PATCH api/posts/:id
exports.updatePost = async (req, res, next) => {
	try {
		const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (e) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
//DELETE api/posts/:id
exports.deletePost = async (req, res, next) => {
	try {
		const posts = await Post.deleteOne({ _id: req.params.id });
		res.status(200).json({
			status: 'success',
		});
	} catch (e) {
		res.status(400).json({
			status: 'fail',
		});
	}
};
