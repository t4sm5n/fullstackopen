import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
			<FormGroup>
				<legend>Log in to application</legend>

				<Form onSubmit={ this.login } inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="username" className="mr-sm-2">Username</Label>
						<Input type="text" name="username" id="username" />
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="password" className="mr-sm-2">Password</Label>
						<Input type="password" name="password" id="password" />
					</FormGroup>
					<Button color="primary" type="submit">login</Button>
				</Form>
			</FormGroup>
		)
	}
}

const mapDispatchToProps = {
	login,
	logout
};

const ConnectedLoginForm = connect(
	null,
	mapDispatchToProps
)(LoginForm);

export default ConnectedLoginForm;