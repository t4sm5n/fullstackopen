import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
  
    clickHyva = () => this.setState({ hyva: this.state.hyva + 1 })
    clickNeutraali = () => this.setState({ neutraali: this.state.neutraali + 1 })
    clickHuono = () => this.setState({ huono: this.state.huono + 1 })
  
    render() {
        const statistiikka = () => {
            return (
                <div>
                    <p>Hyvä { this.state.hyva }</p>
                    <p>Neutraali { this.state.neutraali }</p>
                    <p>Huono { this.state.huono }</p>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <h2>Anna palautetta</h2>
                    <div>
                        <button onClick={ this.clickHyva }>Hyvä</button>
                        <button onClick={ this.clickNeutraali }>Neutraali</button>
                        <button onClick={ this.clickHuono }>Huono</button>
                    </div>
                    <h2>Statistiikka</h2>
                    <div>{ statistiikka() }</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
)
