import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
	render() {
		if (this.props.user === undefined) {
			return null;
		}

		return (
			<div>
				<h1>{this.props.user.name}</h1>
				<h2>Added blogs</h2>
				<ul>
					{this.props.user.blogs.map(blog =>
						<li key={blog._id}>
							{blog.title} by {blog.author}
						</li>
					)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	const { id } = props;

	return {
		user: state.users.find(user => user.id === id)
	};
};

const ConnectedUser = connect(
	mapStateToProps
)(User);

export default ConnectedUser;