import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';

class BlogList extends Component {
	render() {
		return (
			<ListGroup>
				<legend>Blogs</legend>
				{this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
					<ListGroupItem tag={Link} to={`/blogs/${blog.id}`} key={blog.id}>
						{blog.title} {blog.author} <Badge pill>{blog.likes}</Badge>
					</ListGroupItem>
				)}
			</ListGroup>
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