import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';

import {App} from './components/App';

const store = configureStore();

const component = (
	<Provider store={store}>
		<App/>
	</Provider>
);

ReactDOM.render(component, document.getElementById('root'));