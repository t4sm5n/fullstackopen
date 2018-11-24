import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/Login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import User from './components/User';

import { setUser, logout } from "./reducers/userReducer";
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';

class App extends React.Component {
	componentDidMount() {
		this.props.initializeBlogs();
		this.props.initializeUsers();

		const userJSON = window.localStorage.getItem('blogAppUser');
		if (userJSON) {
			const user = JSON.parse(userJSON);
			this.props.setUser(user);
		}
	}

	logout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render() {
		if (this.props.user === null) {
			return (
				<div>
					<h1>Blogs</h1>
					<Notification />
					<Togglable buttonLabel="login">
						<LoginForm />
					</Togglable>
				</div>
			)
		}

		return (
			<div>
				<Router>
					<div>
						<h1>Blogs</h1>
						<Notification />
						<div>
							<span>
								<Link to="/">blogs</Link> &nbsp;
								<Link to="/users">users</Link> &nbsp;
								{this.props.user.name} logged in&nbsp;
								<button onClick={this.logout}>logout</button>
							</span>

							<Togglable buttonLabel="create new">
								<BlogForm />
							</Togglable>
						</div>
						<div>
							<Route exact path="/" render={() => <BlogList />} />
							<Route exact path="/blogs/:id" render={({match, history}) =>
								<Blog id={match.params.id} history={history} /> }
							/>
							<Route exact path="/users" render={() => <UserList />} />
							<Route exact path="/users/:id" render={({match}) =>
								<User id={match.params.id} /> }
							/>
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
		user: state.user
	};
};

const mapDispatchToProps = {
	setUser,
	logout,
	initializeBlogs,
	initializeUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);