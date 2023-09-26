import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiMiddleware from "./utils/apiMiddleware";
//const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

const initialState = {};

const middleware = [thunk, apiMiddleware];

/*const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
	name: "App",
	actionBlacklist: ["REDUX_STORAGE_SAVE"]
})

const enhancer = composeEnhancer(applyMiddleware(...middleware));*/

/*const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);*/
//.. Connected with redux dev-tool and thunk middleware
const store = createStore(
	rootReducer,
	initialState, 
	composeWithDevTools(applyMiddleware(...middleware)))

export default store;