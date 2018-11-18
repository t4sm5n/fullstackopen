import React, { Component } from 'react';
import { changeFilter } from '../reducers/filterReducer';

class Filter extends Component {
	handleChange = (event) => {
		this.props.store.dispatch(changeFilter(event.target.value));
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

export default Filter;