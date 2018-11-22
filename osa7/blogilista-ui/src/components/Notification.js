import React from 'react';
import { connect } from 'react-redux';

class Notification extends React.Component {
	render() {
		if (this.props.notification === undefined) {
			return null;
		}

		const notification = this.props.notification;

		switch (notification.type) {
			case 'error':
				return (
					<div className="error">
						{ notification.message }
					</div>
				);
			case 'notification':
				return (
					<div className="notification">
						{ notification.message }
					</div>
				);
			default:
				return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
};

const ConnectedNotification = connect(
	mapStateToProps
)(Notification);

export default ConnectedNotification;