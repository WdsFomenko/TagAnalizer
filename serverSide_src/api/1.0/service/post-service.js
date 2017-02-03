'use strict';
var PostDao = require('../dao/post-dao');

class PostService {
	static find() {
		return PostDao.find();
	}


	static findOne(postId) {
		return PostDao.findOne(postId);
	}


	static update(postId, postBody) {
		return PostDao.update(postId, postBody);
	}


}

module.exports = PostService;

