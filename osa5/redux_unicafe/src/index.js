import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import counterReducer from './reducer';

const store = createStore(counterReducer);

class Statistics extends React.Component {
	render() {
		const state = store.getState();
		const maara = Object.values(state).reduce((a, b) => a + b);

		if (maara === 0) {
			return (
				<p>Ei yhtään palautetta annettu!</p>
			)
		}

		const keskiarvo = () => {
			const summa = state.good - state.bad;
			const keskiarvo = summa / maara;

			return Math.round(keskiarvo * 10) / 10;
		};

		const prosentti = () => {
			let prosentti = (state.good / maara) * 100;

			return Math.round(prosentti * 10) / 10;
		};

		return (
			<table>
				<tbody>
				<Statistic teksti="Hyvä" arvo={state.good}/>
				<Statistic teksti="Neutraali" arvo={state.ok}/>
				<Statistic teksti="Huono" arvo={state.bad}/>
				<Statistic teksti="Keskiarvo" arvo={keskiarvo()}/>
				<Statistic teksti="Positiivisia" arvo={`${ prosentti() } %`}/>
				</tbody>
			</table>
		)
	}
}

const Statistic = ({ teksti, arvo }) => {
	return (
		<tr>
			<td>{teksti}</td>
			<td>{arvo}</td>
		</tr>
	)
};

class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<h2>Anna palautetta</h2>
					<div>
						<button onClick={() => store.dispatch({ type: 'GOOD' })}>Hyvä</button>
						<button onClick={() => store.dispatch({ type: 'OK' })}>Neutraali</button>
						<button onClick={() => store.dispatch({ type: 'BAD' })}>Huono</button>
					</div>
					<h2>Statistiikka</h2>
					<Statistics />
				</div>
			</div>
		)
	}
}

const render = () => {
	ReactDOM.render(<App/>, document.getElementById('root'));
};

render();
store.subscribe(render);
