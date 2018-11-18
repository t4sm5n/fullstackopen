import anecdoteService from '../services/anecdotes';

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

export const createNew = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({
			type: 'CREATE',
			content: newAnecdote
		});
	};
};

export const voteFor = (anecdote) => {
	return async (dispatch) => {
		const votedAnecdote = await anecdoteService.update(anecdote.id, anecdote);
		dispatch({
			type: 'VOTE',
			id: votedAnecdote.id
		});
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		});
	};
};

export default anecdoteReducer;