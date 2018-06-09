import React, { Component } from 'react';

import axios from 'axios';

export default class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			countries: [],
			searchTerm: ''
		};
	}

	componentDidMount() {
		axios
			.get( 'https://restcountries.eu/rest/v2/all' )
			.then( response => {
				this.setState({ countries: response.data });
			} );
	}

	handleSearchTermChange = ( event ) => {
		this.setState({ searchTerm: event.target.value }); 
	}

	render() {
		console.log( this.state.countries.length );

		const SingleCountry = ({ country }) => (
			<div>
				<h1>{ country.name + " " + country.nativeName }</h1>
				<p>Capital city: { country.capital }</p>
				<p>Population: { country.population }</p>
				<img alt={ "Flag of " + country.name } src={ country.flag } height='250px'/>
			</div>
		)

		let searchTip = "";
		let matchingCountries =
			this.state.searchTerm.length <= 0 ?
				[] :
				this.state.countries.filter( country =>
					country.name.toLowerCase().includes( this.state.searchTerm.toLocaleLowerCase() ) );
				
		if( matchingCountries.length > 10 ) {
			matchingCountries = [];
			searchTip = "Too many matches, specify another filter";
		}
		
		return (
			<div>
				<h1>Maat</h1>

				<div>
					Etsi maita: <input
						value={ this.state.searchTerm }
						onChange={ this.handleSearchTermChange }
					/>
				</div>
				<br/>
				<div>
					{ matchingCountries.length === 1 ? (
						<SingleCountry country={ matchingCountries[0] } />
					) : ( 
						matchingCountries.map( country => <div key={ country.alpha3Code } >{ country.name }</div> )
					) }
					{ searchTip.length > 0 ? (
						<p>{ searchTip }</p>
					) : null }
				</div>
			</div>
		);
	}
}
