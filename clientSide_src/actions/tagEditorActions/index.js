import {
	FETCH_DATA,
	CHANGE_CURRENT_TAG,
	ADD_NEW_TAG,
	POST_NEW_TAG_SUCCESS,
	POST_NEW_TAG_FAILED,
	GET_DATA_FAILED,
	GET_DATA_SUCCESS
} from '../../constants/Tags';

const RESTurl = '/api/v1/data/';

export function loadText(dataId) {
	return (dispatch) => {
		dispatch({type: FETCH_DATA, payload: ''});

		fetch(RESTurl + dataId, {method: 'GET', cache: 'no-cache'})
			.then((response) => {
				if (response.status == '200') {
					return response.json()
				} else {
					throw Error('Source not found');
				}
			})
			.then((data) => {
				dispatch({type: GET_DATA_SUCCESS, payload: data});
			})
			.catch((err) => {
				dispatch({type: GET_DATA_FAILED, payload: err});
			})
	}
}

export function changeCurrentTag(tag) {
	return {
		type: CHANGE_CURRENT_TAG,
		payload: tag
	}
}

export function postNewTag(currentTag, updateTags, dataId) {
	return (dispatch) => {
		dispatch({type: ADD_NEW_TAG, payload: currentTag});

		const responseBody = {"id": dataId, "tags": updateTags.toArray().join(', ')};

		fetch(RESTurl + dataId, {
			method: 'PUT',
			body: JSON.stringify(responseBody),
			headers: {'Content-type': 'application/json'}
		})
			.then((response) => {
				if (response.status == '200') {
					return response.json();
				} else {
					throw Error('Source can not be modified');
				}

			})
			.then((data) => {
				dispatch({type: POST_NEW_TAG_SUCCESS, payload: data});
			})
			.catch((err) => {
				dispatch({type: POST_NEW_TAG_FAILED, payload: err});
			})

	}
}