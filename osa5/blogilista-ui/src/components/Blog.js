import React from 'react'

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
								<button>like</button>
							</div>
							<div>
								added by {this.state.blog.user.name}
							</div>
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