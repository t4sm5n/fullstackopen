import React from 'react';

class App extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            persons: [
                { name: 'Arto Hellas', id: 1 }
            ],
            newName: ''
        }
    }

    addPerson = ( event ) => {
        event.preventDefault()

        if( this.state.newName.length <= 0 ) {
            alert( "Nimi ei saa olla tyhjä!" )
            return
        }

        const personObject = {
            name: this.state.newName,
            id: this.state.persons.length + 1
        }

        if( this.state.persons.filter( person => person.name === personObject.name ).length > 0 ) {
            alert( "Nimi on jo luettelossa!" )
            this.setState({ newName: '' })
            return
        }

        const persons = this.state.persons.concat( personObject )
        this.setState({ persons, newName: '' })

    }

    handleNameChange = ( event ) => {
        this.setState({ newName: event.target.value })
    }

    render() {
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
                        <button type="submit">Lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    { this.state.persons.map( person => <p key={ person.id } >{ person.name }</p> ) }
                </ul>
      </div>
        )
    }
}

export default App
