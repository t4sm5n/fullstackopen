import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../reducers/userReducer';

class LoginForm extends Component {
	login = async ( event ) => {
		event.preventDefault();

		const credentials = {
			username: event.target.username.value,
			password: event.target.password.value
		};

		event.target.username.value = '';
		event.target.password.value = '';

		this.props.login(credentials);
	};

	render() {
		return (
			<div>
				<h2>Log in to application</h2>

				<form onSubmit={ this.login }>
					<div>
						username:
						<input
							type="text"
							name="username"
						/>
					</div>
					<div>
						password:
						<input
							type="password"
							name="password"
						/>
					</div>
					<button type="submit">kirjaudu</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = {
	login,
	logout
};

const ConnectedLoginForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);

export default ConnectedLoginForm;