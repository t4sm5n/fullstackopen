import React from 'react'

export default class PersonsTable extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    { this.props.phoneBook.map( person =>
                        <tr key={ person.id }>
                            <td>{ person.name }</td>
                            <td>{ person.number }</td>
                        </tr> 
                    ) }
                </tbody>
            </table>
        )
    }
}