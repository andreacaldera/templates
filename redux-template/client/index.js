import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

// eslint-disable-next-line react/jsx-filename-extension
render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
