const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET':
			return action.notification;
		case 'REMOVE':
			return null;
		default:
			return state;
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
	};
};

export const notifyWithDispatch = (notification, time, dispatch) => {
	dispatch({
		type: 'SET',
		notification
	});
	setTimeout(() => {
		dispatch({
			type: 'REMOVE'
		})
	}, time);
};

export default notificationReducer;