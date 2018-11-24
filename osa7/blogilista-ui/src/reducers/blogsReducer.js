import blogService from '../services/blogs';

import { notifyWithDispatch } from './notificationReducer';

const blogsReducer = (store = [], action) => {
	if (action.type === 'CREATE') {
		return [...store, { ...action.content, likes: 0 }];
	}
	if (action.type === 'LIKE') {
		const old = store.filter(blog => blog.id !== action.id);
		const liked = store.find(blog => blog.id === action.id);

		return [...old, { ...liked, likes: liked.likes + 1 }];
	}
	if (action.type === 'INIT_BLOGS') {
		return action.data;
	}
	if (action.type === 'REMOVE') {
		return store.filter(blog => blog.id !== action.id);
	}
	if (action.type === 'COMMENT') {
		const old = store.filter(blog => blog.id !== action.id);
		const commented = store.find(blog => blog.id === action.id);

		return [...old, { ...commented, comments: commented.comments.concat(action.comment) }];
	}

	return store;
};

export const createNew = (content) => {
	return async (dispatch, getState) => {
		const newBlog = await blogService.create(content);
		const user = getState().user;
		notifyWithDispatch({ type: "notification", message: `new blog '${content.title}' created` }, 5000, dispatch);
		dispatch({
			type: 'CREATE',
			content: { ...newBlog, user: user }
		});
	};
};

export const like = (blog) => {
	return async (dispatch) => {
		const likedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
		notifyWithDispatch({ type: "notification", message: `liked '${blog.title}'` }, 5000, dispatch);
		dispatch({
			type: 'LIKE',
			id: likedBlog.id
		});
	};
};

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		});
	};
};

export const remove = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id);
		notifyWithDispatch({ type: "notification", message: `'${blog.title}' removed` }, 5000, dispatch);
		dispatch({
			type: 'REMOVE',
			id: blog.id
		});
	};
};

export const comment = (blog, comment) => {
	return async (dispatch) => {
		await blogService.comment(blog.id, comment);
		notifyWithDispatch({ type: "notification", message: `comment '${comment}' added to blog '${blog.title}'` }, 5000, dispatch);
		dispatch({
			type: 'COMMENT',
			id: blog.id,
			comment
		});
	};
};

export default blogsReducer;