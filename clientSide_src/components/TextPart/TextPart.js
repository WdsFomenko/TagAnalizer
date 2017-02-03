import React, {Component} from 'react';
import {Word} from '../../components';

export default class TextPart extends Component {
	render() {
		const {textBlockContent, tags, currentTag} = this.props;
		const textBlockElements = textBlockContent.map((item, i) => {
			return (
				<Word textWordContent={item} tags={tags} currentTag={currentTag} key={i}/>
			)
		});

		return (
			<p className="textPart">
				{textBlockElements}
			</p>
		)
	}
}


