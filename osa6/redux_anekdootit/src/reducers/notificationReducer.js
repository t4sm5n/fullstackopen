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

export const setNotification = (notification) => {
	return {
		type: 'SET',
		notification
	};
};

export const removeNotification = () => {
	return {
		type: 'REMOVE'
	};
};

export default notificationReducer;