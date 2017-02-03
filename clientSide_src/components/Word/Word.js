import React, {Component} from 'react';

import {WordPointer} from '../../components/WordPointer';

export default class Word extends Component {

	render() {

		const uselessSymbol = '.,!?';

		const {textWordContent, tags, currentTag} = this.props;
		const cleanTextWordContent = (~uselessSymbol.indexOf(textWordContent[textWordContent.length - 1]))
			? textWordContent.slice(0, textWordContent.length - 1).toLowerCase() : textWordContent.toLowerCase();

		let wordClass;

		if ((cleanTextWordContent == currentTag)) {
			wordClass = 'word newTag'
		} else if (~tags.indexOf(cleanTextWordContent)) {
			wordClass = 'word oldTag'
		} else {
			wordClass = 'word'
		}

		return (
			<span className={wordClass} style={{}}>
					{textWordContent}
				&nbsp;
				<WordPointer/>
				</span>

		)
	}
}


