const initialState = '';

const filterReducer = (store = initialState, action) => {
	if (action.type === 'CHANGE') {
		return action.filter;
	}
	return store;
};

export const changeFilter = (filter) => {
	return {
		type: 'CHANGE',
		filter
	};
};

export default filterReducer;