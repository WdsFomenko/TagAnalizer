'use strict';
var PostDao = require('../dao/post-dao');

// must use some ORM
class Post {
	constructor(post) {
		this.id = post.id;
		this.text = post.text;
		this.tags = post.tags;
	}

	descriptionToUppercase() {
		this.description = this.description.toUpperCase();
	}

}

module.exports = Post;
