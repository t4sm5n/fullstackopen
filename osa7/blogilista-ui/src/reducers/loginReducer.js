import loginService from '../services/login';
import blogService from "../services/blogs";

import notify from '../reducers/notificationReducer';

const loginReducer = (store = {}, action) => {
	if (action.type === 'LOGIN') {
		return action.user;
	}
	if (action.type === 'LOGOUT') {

	}

	return store;
};

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(credentials);
			dispatch({
				type: 'LOGIN',
				user
			});

			window.localStorage.setItem('blogAppUser', JSON.stringify(user));
			blogService.setToken(user.token);

			notify( { type: "notification", message: `${user.username} logged in` }, 5000 );
		} catch (e) {
			notify( { type: "error", message: "unknown username or password" }, 5000 );
		}

	};
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({
			type: 'LOGOUT'
		});
	};
};

export default loginReducer;