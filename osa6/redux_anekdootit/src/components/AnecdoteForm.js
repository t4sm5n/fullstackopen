import React from 'react';
import { anecdoteCreation } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import anecdoteService from '../services/anecdotes';

class AnecdoteForm extends React.Component {
	createAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';

		const newAnecdote = await anecdoteService.createNew(content);
		this.props.anecdoteCreation(newAnecdote);

		this.props.setNotification(`created '${content}'`);
		setTimeout(() => {
			this.props.removeNotification();
		}, 5000);
	};

	render() {
		return (
			<div>
				<h2>create new</h2>
				<form onSubmit={this.createAnecdote}>
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