import React from 'react'

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
			<div onClick={this.toggleExpanded} style={blogStyle}>
				{this.state.expanded ?
					<div>
						{this.state.blog.title} {this.state.blog.author}
						<div>
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
							<button onClick={() => this.props.delete(this.state.blog)}>delete</button>
						</div>
					</div> :
					<div>
						{this.state.blog.title} {this.state.blog.author}
					</div>
				}
			</div>
	)
	}

}

export default Blog;