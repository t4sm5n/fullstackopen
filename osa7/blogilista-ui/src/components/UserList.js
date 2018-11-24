import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserList extends Component {
	render() {
		return (
			<div>
				<h2>Users</h2>
				<table>
					<tbody>
						<tr>
							<th>&nbsp;</th>
							<th>Blogs added</th>
						</tr>
						{this.props.users.map(user => (
							<tr key={user.id}>
								<td>
									<Link to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	};
};

const ConnectedUserList = connect(
	mapStateToProps
)(UserList);

export default ConnectedUserList;