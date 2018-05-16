import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    const Otsikko = ( props ) => {
        return (
            <h1>{ props.kurssi }</h1>
        )
    }

    const Sisalto = ( props ) => {
        return (
            <div>
                <Osa osa={ osa1.nimi } tehtavia={ osa1.tehtavia }/>
                <Osa osa={ osa2.nimi } tehtavia={ osa2.tehtavia }/>
                <Osa osa={ osa3.nimi } tehtavia={ osa3.tehtavia }/>
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
            <Sisalto osa1={ osa1.nimi } osa2={ osa2.nimi } osa3={ osa3.nimi } tehtavia1={ osa1.tehtavia } tehtavia2={ osa2.tehtavia } tehtavia3={ osa3.tehtavia } />
            <Yhteensa yhteensa={ osa1.tehtavia + osa2.tehtavia + osa3.tehtavia } />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
)
