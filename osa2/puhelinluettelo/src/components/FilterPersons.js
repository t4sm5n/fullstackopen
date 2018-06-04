import React from 'react'

export default class FilterPersons extends React.Component {
    render() {
        return (
            <div>
                Haku: <input
                    value={ this.props.stateObject.searchName }
                    onChange={ this.props.onSearchNameChange }
                />
            </div>
        )
    }
}