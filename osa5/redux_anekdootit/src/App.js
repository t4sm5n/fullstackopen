import React, { Component } from 'react';

import { AnecdoteForm, AnecdoteList } from './components/Anecdote';

class App extends Component {
	render() {
		return (
			<div>
				<AnecdoteForm />
				<AnecdoteList />
			</div>
		)
	}
}

export default App;