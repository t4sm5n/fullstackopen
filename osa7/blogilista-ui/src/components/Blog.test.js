import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

const blog = {
	title: 'First class tests',
	author: 'Robert C. Martin',
	url: 'https://blogs.com/robert_c_martin/first_class_tests',
	likes: 12
};

const mockDeleteHandler = jest.fn();

describe.only('<Blog />', () => {
	it('should display its details after clicking the name', () => {
		const blogComponent = shallow(
			<Blog
				blog={blog}
				delete={mockDeleteHandler}
			/>
		);

		const nameDiv = blogComponent.find('.nameDiv');

		nameDiv.simulate('click');

		const contentDiv = blogComponent.find('.contentDiv');

		expect(contentDiv.text()).toContain(blog.url, blog.likes);
	});
});