import Immutable from 'immutable';

/**
 * Создает класс для работы с иммутабельными данным в store
 * @constructor
 * @this {ImmutableStateClass}
 */

export default class ImmutableStateClass {

	/**
	 * Метод для первичной инициализации store
	 * @static {init}
	 * @returns {Map<dataId, string><text, List><tags, List><currentTag, string>}
	 */

	static init() {
		return Immutable.Map({dataId: '', text: [], tags: [{tagName: '', tagColor: ''}], currentTag: ''});
	}


	/**
	 * Метод парсинга тела ответа в иммутабельную форму store
	 * @static {parseData}
	 * @param {object} responseObj
	 * @returns {Map<dataId, string><text, List><tags, List><currentTag, string>}
	 */

	static parseData(responseObj) {

		let {id, text, tags} = responseObj['data'][0];

		let textParagraph = text.split('\n\t');
		let outText = textParagraph.map((item) => {
			return item.split(' ');
		});

		let outTags = tags.split(', ');

		return Immutable.Map({
			dataId: id,
			text: Immutable.fromJS(outText),
			tags: Immutable.fromJS(outTags),
			currentTag: ''
		});
	}

}