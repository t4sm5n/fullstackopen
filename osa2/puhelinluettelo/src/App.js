import React from 'react';

class App extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-1234567', id: 1 },
                { name: 'Martti Tienari', number: '040-123456', id: 2 },
                { name: 'Arto Järvinen', number: '040-123456', id: 3 },
                { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
            ],
            newName: '',
            newNumber: '',
            searchName: ''
        }
    }

    addPerson = ( event ) => {
        event.preventDefault()

        if( this.state.newName.length <= 0 || this.state.newNumber.length <= 0 ) {
            alert( "Nimi ja numero eivät saa olla tyhjiä!" )
            return
        }

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }

        if( this.state.persons.filter( person => person.name === personObject.name ).length > 0 ) {
            alert( "Nimi on jo luettelossa!" )
            this.setState({ newName: '' })
            return
        }

        const persons = this.state.persons.concat( personObject )
        this.setState({ persons, newName: '', newNumber: '' })

    }

    handleNameChange = ( event ) => {
        this.setState({ newName: event.target.value })
    }

    handeNumberChange = ( event ) => {
        this.setState({ newNumber: event.target.value })
    }

    handleSearchNameChange = ( event ) => {
        this.setState({ searchName: event.target.value })
    }

    render() {
        const namesToShow =
            this.state.searchName.length < 0 ?
                this.state.persons :
                this.state.persons.filter( person =>
                    person.name.toLowerCase().includes( this.state.searchName.toLowerCase() )
                )

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={ this.addPerson }>
                    <div>
                        Nimi: <input
                            value={ this.state.newName }
                            onChange={ this.handleNameChange }
                        />
                    </div>
                    <div>
                        Numero: <input
                            value={ this.state.newNumber }
                            onChange={ this.handeNumberChange }
                        />
                    </div>
                    <div>
                        <button type="submit">Lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    Haku: <input
                        value={ this.state.searchName }
                        onChange={ this.handleSearchNameChange }
                    />
                </div>
                <table>
                    <tbody>
                        { namesToShow.map( person =>
                            <tr key={ person.id }>
                                <td>{ person.name }</td>
                                <td>{ person.number }</td>
                            </tr> 
                        ) }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App
