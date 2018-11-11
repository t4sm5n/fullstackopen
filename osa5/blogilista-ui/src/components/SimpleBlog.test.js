import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
	it('should render the title, the author and the likes', function () {
		const blog = {
			title: 'First class tests',
			author: 'Robert C. Martin',
			likes: 12
		};

		const blogComponent = shallow(<SimpleBlog blog={blog} />);
		const detailsDiv = blogComponent.find('.details');
		const likesDiv = blogComponent.find('.likes');

		expect(detailsDiv.text()).toContain(blog.title, blog.author);
		expect(likesDiv.text()).toContain(blog.likes);
	});
});