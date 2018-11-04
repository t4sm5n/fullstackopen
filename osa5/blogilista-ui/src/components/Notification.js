import React from 'react';

const Notification = ( { message, type } ) => {
	if ( message === null || type === null ) {
		return null;
	}
	if ( type === "error" ) {
		return (
			<div className="error">
				{ message }
			</div>
		);
	} else if ( type === "notification" ) {
		return (
			<div className="notification">
				{ message }
			</div>
		)
	}
};

export default Notification;