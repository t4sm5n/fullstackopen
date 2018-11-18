const anecdoteReducer = (store = [], action) => {
	if (action.type === 'VOTE') {
		const old = store.filter(a => a.id !== action.id);
		const voted = store.find(a => a.id === action.id);

		return [...old, { ...voted, votes: voted.votes + 1 }];
	}
	if (action.type === 'CREATE') {
		return [...store, { ...action.content, votes: 0 }];
	}
	if (action.type === 'INIT_ANECDOTES') {
		return action.data;
	}

	return store;
};

export const anecdoteCreation = (content) => {
	return {
		type: 'CREATE',
		content
	};
};

export const voting = (id) => {
	return {
		type: 'VOTE',
		id
	};
};

export const anecdoteInitialization = (data) => {
	return {
		type: 'INIT_ANECDOTES',
		data
	};
};

export default anecdoteReducer;