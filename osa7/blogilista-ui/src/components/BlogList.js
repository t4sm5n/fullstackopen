import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class BlogList extends Component {
	render() {
		const blogStyle = {
			paddingTop: 10,
			paddingLeft: 2,
			border: 'solid',
			borderWidth: 1,
			marginBottom: 5
		};

		return (
			<div>
				<h2>Blogs</h2>
				{this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
					<div key={blog.id} style={blogStyle}>
						<Link to={`/blogs/${blog.id}`}>
							{blog.title} {blog.author}
						</Link>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user
	};
};
const ConnectedBlogList = connect(
	mapStateToProps
)(BlogList);

export default ConnectedBlogList;