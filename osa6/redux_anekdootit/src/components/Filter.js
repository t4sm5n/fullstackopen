import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeFilter } from '../reducers/filterReducer';

class Filter extends Component {
	handleChange = (event) => {
		this.props.changeFilter(event.target.value);
	};

	render() {
		const style = {
			marginBottom: 10
		};

		return (
			<div style={style}>
				filter <input onChange={this.handleChange}/>
			</div>
		);
	}
}

const mapDispatchToProps = {
	changeFilter
};

const ConnectedFilter = connect(
	null,
	mapDispatchToProps
)(Filter);

export default ConnectedFilter;