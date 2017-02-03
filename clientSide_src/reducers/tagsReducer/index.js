import {
	FETCH_DATA,
	CHANGE_CURRENT_TAG,
	ADD_NEW_TAG,
	POST_NEW_TAG_SUCCESS,
	POST_NEW_TAG_FAILED,
	GET_DATA_FAILED,
	GET_DATA_SUCCESS
} from '../../constants/Tags'

import ImmutableStateClass from '../../store/ImmutableStateClass';

const initialState = ImmutableStateClass.init();


export default function user(state = initialState, action) {
	switch (action.type) {

		case FETCH_DATA:
			return state;

		case CHANGE_CURRENT_TAG:
			return state.set('currentTag', action.payload);

		case ADD_NEW_TAG:
			return state;

		case  POST_NEW_TAG_SUCCESS:
			return ImmutableStateClass.parseData(action.payload);

		case POST_NEW_TAG_FAILED:
			return state;

		case GET_DATA_SUCCESS:
			return ImmutableStateClass.parseData(action.payload);

		case GET_DATA_FAILED:
			return state;

		default:
			return state;
	}
}


