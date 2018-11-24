import loginService from '../services/login';
import blogService from "../services/blogs";

import { notifyWithDispatch } from '../reducers/notificationReducer';

const userReducer = (store = null, action) => {
	if (action.type === 'LOGIN') {
		return action.user;
	}
	if (action.type === 'LOGOUT') {
		return null;
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

			notifyWithDispatch({ type: "notification", message: `${user.username} logged in` }, 5000, dispatch);
		} catch (e) {
			notifyWithDispatch({ type: "error", message: "unknown username or password" }, 5000, dispatch);
		}

	};
};

export const setUser = (user) => {
	return async (dispatch) => {
		dispatch({
			type: 'LOGIN',
			user
		});

		blogService.setToken(user.token);
	}
};

export const logout = () => {
	return async (dispatch, getState) => {
		const user = getState().user;

		window.localStorage.removeItem('blogAppUser');

		notifyWithDispatch({ type: "notification", message: `${user.username} logged out` }, 5000, dispatch);

		dispatch({
			type: 'LOGOUT'
		});
	};
};

export default userReducer;