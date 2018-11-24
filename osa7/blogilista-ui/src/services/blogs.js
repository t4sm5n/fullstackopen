import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
	const request = axios.get( baseUrl );
	return request.then( response => response.data );
};

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const create = async (newBlog) => {
	const config = {
		headers: { 'Authorization': token }
	};

	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
};

const update = async (id, newBlog) => {
	const request = axios.put(`${baseUrl}/${id}`, newBlog);
	return request.then(response => response.data);
};

const remove = async (id) => {
	const config = {
		headers: { 'Authorization': token }
	};

	const request = axios.delete(`${baseUrl}/${id}`, config);
	return request.then(response => response.status);
};

const comment = async (id, comment) => {
	const request = axios.post(`${baseUrl}/${id}/comments`, { comment });
	return request.then(response => response.data);
};

export default { getAll, setToken, create, update, remove, comment };