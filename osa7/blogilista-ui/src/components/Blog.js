import React from 'react'
import { connect } from 'react-redux';

import { comment, like, remove } from '../reducers/blogsReducer';
import { Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class Blog extends React.Component {
	like = () => {
		this.props.like(this.props.blog);
	};

	remove = () => {
		if ( window.confirm(`delete "${this.props.blog.title}" by ${this.props.blog.author}?`) ) {
			this.props.remove(this.props.blog);
			this.props.history.push("/");
		}
	};

	comment = (event) => {
		event.preventDefault();
		const comment = event.target.comment.value;
		event.target.comment.value = '';
		this.props.comment(this.props.blog, comment);
	};

	render() {
		if (this.props.blog === undefined) {
			return null;
		}

		const blog = this.props.blog;
		const user = this.props.user;
		const canDelete = (user !== null && (blog.user === undefined || user.username === blog.user.username));

		return (
			<div>
				<h2>{blog.title}</h2>
				<div>
					<div>
						<a href={blog.url}>{blog.url}</a>
					</div>
					<br />
					<div>
						{blog.likes} likes &nbsp;
						<Button onClick={this.like}>like</Button>
					</div>
					<br />
					<div>
						added by {blog.user !== undefined
							? <Link to={`/users/${blog.user._id}`}>{blog.user.name}</Link>
							: 'anonymous'}
					</div>
					{canDelete ?
						<Button onClick={this.remove}>delete</Button> :
						<div/>
					}
				</div>
				<br />
				<ListGroup>
					<legend>comments</legend>
					{blog.comments.map((comment, index) => (
						<ListGroupItem key={index}>
							{comment}
						</ListGroupItem>
					))}
				</ListGroup>
				<br />
				<Form onSubmit={this.comment} inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Input type="text" name="comment" id="comment" />
					</FormGroup>
					<Button type="submit">add comment</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	const { id } = props;

	return {
		blog: state.blogs.find(blog => blog.id === id),
		user: state.user
	};
};

const mapDispatchToProps = {
	like,
	remove,
	comment
};

const ConnectedBlog = connect(
	mapStateToProps,
	mapDispatchToProps
)(Blog);

export default ConnectedBlog;