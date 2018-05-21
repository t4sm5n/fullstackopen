import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <h1>{ kurssi.nimi }</h1>
            { kurssi.osat.map( osa => <p key={ osa.id }>{ osa.nimi } { osa.tehtavia }</p> ) }
            <p>Yhteensä { kurssi.osat.reduce( ( acc, cur ) => acc + cur.tehtavia, 0 ) } tehtävää</p>
        </div>
    )
}

export default Kurssi