import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as tagEditorActions from '../../actions/tagEditorActions';

import {Panel, Nav, Navbar, NavItem, Well} from 'react-bootstrap';

import  {TextPart} from '../../components';

class TagEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {currentWord: null}
	}

	onLoadDataClickHandler() {
		const {loadText} = this.props.tagEditorActions;

		loadText('12345');
	}

	onWordClickHandler(e) {
		const selectElement = e.target;

		const {changeCurrentTag, postNewTag} = this.props.tagEditorActions;
		let {currentTag, tags, dataId} = this.props;
		if (selectElement.tagName == 'SPAN' && selectElement.parentNode.className == 'word') {

			const uselessSymbol = '.,!?';
			const cleanTextWordContent = (~uselessSymbol.indexOf(selectElement.textContent[selectElement.textContent.length - 1]))
				? selectElement.textContent.slice(0, selectElement.textContent.length - 1) : selectElement.textContent;

			this.setState({currentWord: selectElement.parentNode.dataset.reactid});

			changeCurrentTag(cleanTextWordContent.toLowerCase());

		} else if (selectElement.tagName == 'SPAN' && selectElement.className == 'wordPointer') {
			let updateTags = tags.push(currentTag);
			postNewTag(currentTag, updateTags, dataId);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.currentWord) {
			let el = document.querySelector(`span.word[data-reactid='${this.state.currentWord}']`);
			el.style.backgroundColor = 'coral';
			el.querySelector('.wordPointer').style.display = 'block';
		}
		if (prevState.currentWord) {
			let elPrev = document.querySelector(`span.word[data-reactid='${prevState.currentWord}']`);
			elPrev.style.backgroundColor = '';
			elPrev.querySelector('.wordPointer').style.display = 'none';
		}
	}


	render() {
		const {text, tags, currentTag} = this.props;

		let textBlock = text.map((item, i) => {
			return (
				<TextPart textBlockContent={item} tags={tags} currentTag={currentTag} key={i}/>
			)
		});

		return (
			<div>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							Tags editor
						</Navbar.Brand>
					</Navbar.Header>
					<Nav pullRight>
						<NavItem eventKey={1} onClick={::this.onLoadDataClickHandler}>Load Text</NavItem>
					</Nav>
				</Navbar>
				<Panel>
					<Well onClick={::this.onWordClickHandler}>
						{textBlock}
					</Well>
				</Panel>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		dataId: state.tags.get('dataId'),
		text: state.tags.get('text'),
		tags: state.tags.get('tags'),
		currentTag: state.tags.get('currentTag')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		tagEditorActions: bindActionCreators(tagEditorActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagEditor);
