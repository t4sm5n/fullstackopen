import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
			<Form onSubmit={ this.createBlog }>
				<legend>Add a new blog</legend>

				<FormGroup>
					<Label for="title">Title</Label>
					<Input type="text" name="title" id="title" />
				</FormGroup>
				<FormGroup>
					<Label for="author">Author</Label>
					<Input type="text" name="author" id="author" />
				</FormGroup>
				<FormGroup>
					<Label for="url">URL</Label>
					<Input type="text" name="url" id="url" />
				</FormGroup>
				<Button color="primary" type="submit">save</Button>
			</Form>
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