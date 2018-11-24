import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavItem,
	NavLink,
	UncontrolledDropdown
} from 'reactstrap';

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
				<div className="container">
					<Col sm={10} className="offset-1">
						<h1>Blogs</h1>
						<Notification />
						<Togglable buttonLabel="login">
							<LoginForm />
						</Togglable>
					</Col>
				</div>
			)
		}

		return (
			<div className="container">
				<Col sm={10} className="offset-1">
					<Router>
						<div>
							<h1>Blogs</h1>
							<Notification />
							<div>
								<Navbar color="light" light expand="md">
									<Nav navbar>
										<NavItem>
											<NavLink tag={Link} to="/">blogs</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} to="/users">users</NavLink>
										</NavItem>
									</Nav>
									<Nav className="ml-auto" navbar>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle nav caret>
												{this.props.user.name}
											</DropdownToggle>
											<DropdownMenu right>
												<DropdownItem tag={Link} to={`/users/${this.props.user.id}`}>
													profile
												</DropdownItem>
												<DropdownItem divider />
												<DropdownItem onClick={this.logout}>
													logout
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									</Nav>
								</Navbar>
								<br />
								<Togglable buttonLabel="create new">
									<BlogForm />
								</Togglable>
								<br />
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
				</Col>
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