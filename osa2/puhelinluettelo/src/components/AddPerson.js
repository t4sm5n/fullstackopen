import React from 'react';

export default class AddPerson extends React.Component {
    render() {
        return (
            <form onSubmit={ this.props.onSubmit }>
                <div>
                    Nimi: <input
                        value={ this.props.stateObject.newName }
                        onChange={ this.props.onNameChange }
                    />
                </div>
                <div>
                    Numero: <input
                        value={ this.props.stateObject.newNumber }
                        onChange={ this.props.onNumberChange }
                    />
                </div>
                <div>
                    <button type="submit">Lisää</button>
                </div>
            </form>
        )
    }
}