import React from 'react';

import AddPerson from './components/AddPerson.js'
import FilterPersons from './components/FilterPersons.js'
import PersonsTable from './components/PersonsTable.js'

export default class App extends React.Component {
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
                <AddPerson  onSubmit={ this.addPerson }
                            stateObject={ this.state }
                            onNameChange={ this.handleNameChange }
                            onNumberChange={ this.handeNumberChange } />

                <h2>Numerot</h2>
                <FilterPersons  stateObject={ this.state }
                                onSearchNameChange={ this.handleSearchNameChange } />

                <br/>
                <PersonsTable   phoneBook={ namesToShow } />
                
            </div>
        )
    }
}