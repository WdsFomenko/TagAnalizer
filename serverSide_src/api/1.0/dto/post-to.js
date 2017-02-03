'use strict';

class PostTo {
	constructor(post) {
		this.id = post.id;
		this.text = post.text;
		this.tags = post.tags;
	}

	static transform(post) {
		return new PostTo(post);
	}
}

module.exports = PostTo;
