import userService from '../services/users';

const usersReducer = (store = [], action) => {
	if (action.type === 'INIT_USERS') {
		return action.users;
	}

	return store;
};

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll();
		dispatch({
			type: 'INIT_USERS',
			users
		});
	};
};

export default usersReducer;