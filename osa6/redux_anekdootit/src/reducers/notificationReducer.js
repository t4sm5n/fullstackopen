const initialState = '';

const notificationReducer = (state = initialState, action) => {
	if (action.type === 'SET') {
		return action.notification;
	}
	if (action.type === 'REMOVE') {
		return '';
	}
	return state;
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
			});
		}, time);
	};
};

export default notificationReducer;