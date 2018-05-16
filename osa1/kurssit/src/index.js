import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    const Otsikko = ( props ) => {
        return (
            <h1>{ props.kurssi }</h1>
        )
    }

    const Sisalto = ( props ) => {
        return (
            <div>
                <Osa osa={ osa1 } tehtavia={ tehtavia1 }/>
                <Osa osa={ osa2 } tehtavia={ tehtavia2 }/>
                <Osa osa={ osa3 } tehtavia={ tehtavia3 }/>
            </div>
        )
    }

    const Yhteensa = ( props ) => {
        return (
            <p>Yhteensä { props.yhteensa } tehtävää</p>
        )
    }

    const Osa = ( props ) => {
        return (
            <p>{ props.osa } { props.tehtavia }</p>
        )
    }

    return (
        <div>
            <Otsikko kurssi={ kurssi } />
            <Sisalto osa1={ osa1 } osa2={ osa2 } osa3={ osa3 } tehtavia1={ tehtavia1 } tehtavia2={ tehtavia2 } tehtavia3={ tehtavia3 } />
            <Yhteensa yhteensa={ tehtavia1 + tehtavia2 + tehtavia3 } />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
)
