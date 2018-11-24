import React from 'react'
import { connect } from 'react-redux';

import { comment, like, remove } from '../reducers/blogsReducer';

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
					<div>
						{blog.likes} likes
						<button onClick={this.like}>like</button>
					</div>
					<div>
						added by {blog.user !== undefined ? blog.user.name : 'anonymous'}
					</div>
					{canDelete ?
						<button onClick={this.remove}>delete</button> :
						<div/>
					}
				</div>
				<h3>comments</h3>
				<ul>
					{blog.comments.map((comment, index) => (
						<li key={index}>
							{comment}
						</li>
					))}
				</ul>
				<div>
					<form onSubmit={this.comment}>
						<input type="text" name="comment" />
						<button type="submit">add comment</button>
					</form>
				</div>
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