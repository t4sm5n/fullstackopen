import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
	notification: notificationReducer,
	user: userReducer,
	blogs: blogsReducer,
	users: usersReducer
});

const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

store.subscribe(() => {
	console.log(store.getState());
});

export default store;