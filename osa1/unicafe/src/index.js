import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            arvot: []
        }
    }
  
    clickHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            arvot: this.state.arvot.concat( 1 )
        })
    }

    clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            arvot: this.state.arvot.concat( 0 )
        })
    }

    clickHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            arvot: this.state.arvot.concat( -1 )
        })
    }
  
    render() {
        const keskiarvo = () => {
            if( this.state.arvot.length === 0 ) {
                return (
                    <p>Palautetta ei ole vielä annettu!</p>
                )
            }

            let summa = this.state.arvot.reduce(( previous, current ) => current += previous )
            let keskiarvo = summa / this.state.arvot.length

            return (
                <p>Keskiarvo { Math.round( keskiarvo * 10 ) / 10 }</p>
            )
        }

        const prosentti = () => {
            if( this.state.arvot.length === 0 ) {
                return (
                    <p>Palautetta ei ole vielä annettu!</p>
                )
            }
            
            let prosentti = ( this.state.hyva / this.state.arvot.length ) * 100

            return (
                <p>Positiivisia { Math.round( prosentti * 10 / 10 ) } %</p>
            )
        }

        const statistiikka = () => (
            <div>
                <p>Hyvä { this.state.hyva }</p>
                <p>Neutraali { this.state.neutraali }</p>
                <p>Huono { this.state.huono }</p>
                <div>
                    { keskiarvo() }
                    { prosentti() }
                </div>
                
            </div>
        )

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
