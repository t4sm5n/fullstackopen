import React from 'react'

import PropTypes from 'prop-types';

import blogService from '../services/blogs';

class Blog extends React.Component {
	state = {
		blog: this.props.blog,
		expanded: false
	};

	toggleExpanded = () => {
		this.setState({
			expanded: !this.state.expanded
		});
	};

	like = async () => {
		const blog = await blogService.update(
			this.state.blog.id,
			{
				user: this.state.blog.user.id,
				likes: this.state.blog.likes + 1,
				author: this.state.blog.author,
				title: this.state.blog.title,
				url: this.state.blog.url
			}
		);

		this.setState({ blog: blog });
	};

	render() {
		const blogStyle = {
			paddingTop: 10,
			paddingLeft: 2,
			border: 'solid',
			borderWidth: 1,
			marginBottom: 5
		};

		return (
			<div style={blogStyle}>
				<div className={'nameDiv'} onClick={this.toggleExpanded}>
					{this.state.blog.title} {this.state.blog.author}
				</div>
				{this.state.expanded ?
					<div className={'contentDiv'}>
						<div>
							<a href={this.state.blog.url}>{this.state.blog.url}</a>
						</div>
						<div>
							{this.state.blog.likes} likes
							<button onClick={this.like}>like</button>
						</div>
						<div>
							added by {this.state.blog.user !== undefined ? this.state.blog.user.name : 'anonymous'}
						</div>
						{(this.props.user !== null && (this.state.blog.user === undefined || this.props.user.username === this.state.blog.user.username)) ?
							<button onClick={() => this.props.delete(this.state.blog)}>delete</button> :
							<div/>
						}
					</div> :
					null
				}
			</div>
		)
	}
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	delete: PropTypes.func.isRequired,
	user: PropTypes.object
};

export default Blog;