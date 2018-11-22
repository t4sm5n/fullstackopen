import React from 'react';
import { connect } from 'react-redux';

import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/Login';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import { notify } from "./reducers/notificationReducer";
import {login} from "./reducers/loginReducer";

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
		this.props.login({
			username: this.state.form.username,
			password: this.state.form.password
		});
	};

	logout = (event) => {
		event.preventDefault();
		let username = this.state.user.username;
		this.setState({user: null});
		this.props.notify( { type: "notification", message: `${username} logged out` }, 5000 );
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

			this.props.notify( { type: "notification", message: "blog created" }, 5000 );
		} catch (exception) {
			this.props.notify( { type: "error", message: "error while creating blog" }, 5000 );
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

				<Notification />

				{this.state.user === null ?
					loginForm() :
					<div>
						<p>{this.state.user.name} logged in</p>
						<button onClick={this.logout}>logout</button>
						{blogForm()}
						<h2> Blogs </h2>
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
				}
			</div>
		);
	}
}

export default connect(
	null,
	{
		notify,
		login
	}
)(App);