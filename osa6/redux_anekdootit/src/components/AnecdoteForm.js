import React from 'react';
import { anecdoteCreation } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		this.create(content)
		e.target.anecdote.value = '';
	};

	create = (content) => {
		this.props.anecdoteCreation(content);
		this.props.setNotification(`created '${content}'`);
		setTimeout(() => {
			this.props.removeNotification();
		}, 5000);
	};

	render() {
		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={this.handleSubmit}>
					<div><input name='anecdote'/></div>
					<button>create</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = {
	anecdoteCreation,
	setNotification,
	removeNotification
};

const ConnectedAnecdoteForm = connect(
	null,
	mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;