import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNew } from '../reducers/blogsReducer';

class BlogForm extends Component {
	createBlog = async (event) => {
		event.preventDefault();

		const content = {
			title: event.target.title.value,
			author: event.target.author.value,
			url: event.target.url.value
		};

		event.target.title.value = '';
		event.target.author.value = '';
		event.target.url.value = '';

		this.props.createNew(content);
	};

	render() {
		return (
			<div>
				<h2>Add a new blog</h2>
				<div>
					<form onSubmit={ this.createBlog }>
						<div>
							title
							<input
								type="text"
								name="title"
							/>
						</div>
						<div>
							author
							<input
								type="text"
								name="author"
							/>
						</div>
						<div>
							url
							<input
								type="text"
								name="url"
							/>
						</div>
						<button type="submit">Save</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = {
	createNew
};

const ConnectedBlogForm = connect(
	null,
	mapDispatchToProps
)(BlogForm);

export default ConnectedBlogForm;