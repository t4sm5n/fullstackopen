const initialState = null;

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET':
			return action.notification;
		case 'REMOVE':
			return '';
		default:
			return '';
	}
};

export const notify = (notification, time) => {
	return async (dispatch) => {
		dispatch({
			type: 'SET',
			notification
		});
		setTimeout(() => {
			dispatch({
				type: 'REMOVE'
			})
		}, time);
	}
};

export default notificationReducer;