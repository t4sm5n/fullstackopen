const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_ANECDOTE':
			return [...state, action.data];
		case 'VOTE':
			const id = action.data.id;
			const anecdoteToVote = state.find(n => n.id === id);
			const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
			return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote);
		default:
			return state;
	}
};

export default anecdoteReducer;