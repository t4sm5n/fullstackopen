import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

class Notification extends React.Component {
	render() {
		if (this.props.notification === null) {
			return null;
		}

		const notification = this.props.notification;

		switch (notification.type) {
			case 'error':
				return (
					<Alert color="danger">
						{ notification.message }
					</Alert>
				);
			case 'notification':
				return (
					<Alert color="success">
						{ notification.message }
					</Alert>
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