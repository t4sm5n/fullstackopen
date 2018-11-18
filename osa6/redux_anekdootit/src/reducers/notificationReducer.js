const initialState = 'default notification from reducer';

const notificationReducer = (state = initialState, action) => {
	if (action.type === 'NOTIFY') {
		return action.notification;
	}
	return state;
};

export const notify = (notification) => {
	return {
		type: 'NOTIFY',
		notification
	};
};

export default notificationReducer;