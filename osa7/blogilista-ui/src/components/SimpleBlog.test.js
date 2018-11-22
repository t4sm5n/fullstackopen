import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

const blog = {
	title: 'First class tests',
	author: 'Robert C. Martin',
	likes: 12
};

describe.only('<SimpleBlog />', () => {
	it('should render the title, the author and the likes', function () {
		const blogComponent = shallow(<SimpleBlog blog={blog} />);
		const detailsDiv = blogComponent.find('.details');
		const likesDiv = blogComponent.find('.likes');

		expect(detailsDiv.text()).toContain(blog.title, blog.author);
		expect(likesDiv.text()).toContain(blog.likes);
	});

	it('should call the event handler twice, when the button is clicked twice', function () {
		const mockHandler = jest.fn();

		const blogComponent = shallow(
			<SimpleBlog
				blog={blog}
				onClick={mockHandler}
			/>
		);

		const button = blogComponent.find('button');
		button.simulate('click');
		button.simulate('click');

		expect(mockHandler.mock.calls.length).toBe(2);
	});
});