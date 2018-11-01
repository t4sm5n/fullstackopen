import React from 'react';

import Blog from './components/Blog';

import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			blogs: [],
			user: null,
			form: {
				username: '',
				password: ''
			}
		}
	}

	componentDidMount() {
		blogService.getAll().then( blogs =>
			this.setState( { blogs } )
		);

		const userJSON = window.localStorage.getItem('blogAppUser');
		if (userJSON) {
			const user = JSON.parse(userJSON);
			this.setState({user});
			blogService.setToken(user.token);
		}
	}

	login = async ( event ) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username: this.state.form.username,
				password: this.state.form.password
			});

			window.localStorage.setItem('blogAppUser', JSON.stringify(user));
			blogService.setToken(user.token);
			this.setState({ form: { username: '', password: '' }, user});
		} catch ( exception ) {
			this.setState({
				error: 'unknown username or password'
			});
			setTimeout(() => {
				this.setState({ error: null })
			}, 5000);
		}
	};

	logout = (event) => {
		event.preventDefault();
		window.localStorage.removeItem('blogAppUser');
		this.setState({user: null});
	};

	handleLoginFieldChange = ( event ) => {
		this.setState({ form: { ...this.state.form, [ event.target.name ]: event.target.value } });
	};

	render() {
		if ( this.state.user === null ) {
			return (
				<div>
					<h1>Log in to application</h1>
					<form onSubmit={ this.login }>
						<div>
							username:
							<input
								type="text"
								name="username"
								value={ this.state.form.username }
								onChange={ this.handleLoginFieldChange }
							/>
						</div>
						<div>
							password:
							<input
								type="password"
								name="password"
								value={ this.state.form.password }
								onChange={ this.handleLoginFieldChange }
							/>
						</div>
						<button type="submit">kirjaudu</button>
					</form>
				</div>
			)
		}

		return (
			<div>
				<h2>blogs</h2>
				<div>
					{this.state.user.name} logged in
					<button onClick={this.logout}>logout</button>
				</div>
				{this.state.blogs.map( blog =>
					<Blog key={blog.id} blog={blog}/>
				)}
			</div>
		);
	}
}

export default App;
