import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
import LoginForm from './components/Login';

describe('<App />', () => {
	let app;

	describe('when user is not logged in', () => {
		beforeEach(() => {
			app = mount(<App />);
		});

		it('should render only the login form', () => {
			const loginComponents = app.find(LoginForm);
			expect(loginComponents.length).toBe(1);
			const blogComponents = app.find(Blog);
			expect(blogComponents.length).toBe(0);
		});
	});

	describe('when user is logged in', () => {
		beforeEach(() => {
			const user = {
				username: 'tester',
				token: '1231231214',
				name: 'Teuvo Testaaja'
			};

			localStorage.setItem('blogAppUser', JSON.stringify(user));

			app = mount(<App />);
		});

		it('should render all notes it gets from back end', () => {
			app.update();

			const blogComponents = app.find(Blog);

			expect(blogComponents.length).toBe(2);
		});
	});
});