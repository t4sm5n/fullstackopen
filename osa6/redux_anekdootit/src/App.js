import React from 'react';
import { connect } from 'react-redux';

import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { anecdoteInitialization } from './reducers/anecdoteReducer';

class App extends React.Component {
	componentDidMount = async () => {
		const notes = await anecdoteService.getAll();
		this.props.anecdoteInitialization(notes);
	};

	render() {
		return (
			<div>
				<h1>Programming anecdotes</h1>
				<Notification/>
				<Filter/>
				<AnecdoteList/>
				<AnecdoteForm/>
			</div>
		);
	}
}

export default connect(
	null,
	{ anecdoteInitialization }
)(App);