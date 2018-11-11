import React from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/Login';
import Togglable from './components/Togglable';

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			blogs: [],
			user: null,
			notification: {
				message: null,
				type: null
			},
			form: {
				username: '',
				password: ''
			},
			blog: {
				title: '',
				author: '',
				url: ''
			},
			loginVisible: false
		}
	}

	componentDidMount() {
		blogService.getAll().then( blogs =>
			this.setState({ blogs })
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
			this.setState({ form: { username: '', password: '' }, user });
			let username = this.state.user.username;
			this.notify( "notification", `${username} logged in` );
		} catch ( exception ) {
			this.notify( "error", "unknown username or password" );
		}
	};

	logout = (event) => {
		event.preventDefault();
		let username = this.state.user.username;
		this.setState({user: null});
		this.notify( "notification", `${username} logged out` );
		window.localStorage.removeItem('blogAppUser');
	};

	create = async (event) => {
		event.preventDefault();
		try {
			const blog = await blogService.create({
				title: this.state.blog.title,
				author: this.state.blog.author,
				url: this.state.blog.url
			});

			this.setState({
				blogs: this.state.blogs.concat(blog),
				blog: { title: '', author: '', url: '' }
			});

			this.notify( "notification", "blog created" );
		} catch (exception) {
			this.notify( "error", "error while creating blog" );
		}
	};

	delete = async (blog) => {
		if ( window.confirm(`delete "${blog.title}" by ${blog.author}?`) ) {
			const response = await blogService.remove(blog.id);

			if ( response === 204 ) {
				let blogs = this.state.blogs.filter( b => {
					return b.id !== blog.id;
				});

				this.setState({
					blogs: blogs
				});
			}
		}
	};

	handleLoginFieldChange = ( event ) => {
		this.setState({ form: { ...this.state.form, [ event.target.name ]: event.target.value } });
	};

	handleBlogFieldChange = (event) => {
		this.setState({ blog: { ...this.state.blog, [event.target.name]: event.target.value } });
	};

	notify = (type, message) => {
		this.setState({ notification: { type: type, message: message } });
		setTimeout(() => {
			this.setState({ notification: { type: null, message: null } });
		}, 5000);
	};

	render() {
		const loginForm = () => (
			<Togglable buttonLabel="login">
				<LoginForm
					username={this.state.form.username}
					password={this.state.form.password}
					handleChange={this.handleLoginFieldChange}
					handleSubmit={this.login}
				/>
			</Togglable>
		);

		const blogForm = () => (
			<div>
				<h2>Add a new blog</h2>
				<div>
					<form onSubmit={ this.create }>
						<div>
							title
							<input
								type="text"
								name="title"
								value={ this.state.blog.title }
								onChange={ this.handleBlogFieldChange }
							/>
						</div>
						<div>
							author
							<input
								type="text"
								name="author"
								value={ this.state.blog.author }
								onChange={ this.handleBlogFieldChange }
							/>
						</div>
						<div>
							url
							<input
								type="text"
								name="url"
								value={ this.state.blog.url }
								onChange={ this.handleBlogFieldChange }
							/>
						</div>
						<button type="submit">Save</button>
					</form>
				</div>
			</div>
		);

		this.state.blogs.sort((a, b) => {
			return b.likes - a.likes;
		});

		return (
			<div>
				<h1>Blogs</h1>

				<Notification message={ this.state.notification.message } type={ this.state.notification.type } />

				{this.state.user === null ?
					loginForm() :
					<div>
						<p>{this.state.user.name} logged in</p>
						<button onClick={this.logout}>logout</button>
						{blogForm()}
					</div>
				}

				<h2>Blogs</h2>
				<div>
					{this.state.blogs.map( blog =>
						<Blog
							key={blog.id}
							blog={blog}
							delete={this.delete}
							user={this.state.user}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default App;
