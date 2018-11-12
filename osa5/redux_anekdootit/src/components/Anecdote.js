import React, { Component } from 'react';
import PropTypes from 'prop-types';

import actionFor from '../actionCreators';

class AnecdoteForm extends Component {
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	addAnecdote = (event) => {
		event.preventDefault();
		this.context.store.dispatch(
			actionFor.anecdoteCreation(event.target.anecdote.value)
		);
		event.target.anecdote.value = '';
	};

	render() {
		return (
			<form onSubmit={this.addAnecdote}>
				<input name="anecdote"/>
				<button>lisää</button>
			</form>
		)
	}
}

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<li>
			<div>
				{anecdote.content}
				<br/>
				has {anecdote.votes} vote(s)
				<br/>
				<button onClick={handleClick}>vote</button>
			</div>
		</li>
	)
};

class AnecdoteList extends Component {
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	vote = (id) => () => {
		this.context.store.dispatch(
			actionFor.vote(id)
		);
	};

	render() {
		return (
			<ul>
				{this.context.store.getState()
					.sort((a, b) => {
						return b.votes - a.votes
					})
					.map(anecdote =>
						<Anecdote
							key={anecdote.id}
							anecdote={anecdote}
							handleClick={this.vote(anecdote.id)}
						/>
				)}
			</ul>
		)
	}
}

AnecdoteForm.contextTypes = {
	store: PropTypes.object
};

AnecdoteList.contextTypes = {
	store: PropTypes.object
};

export { AnecdoteForm, AnecdoteList };