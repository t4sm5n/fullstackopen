import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get( baseUrl );
    return request.then( response => { return response.data } );
};

const create = ( newPerson ) => {
    const request = axios.post( baseUrl, newPerson );
    return request.then( response => { return response.data } );
};

const remove = ( id ) => {
    const request = axios.delete( `${ baseUrl }/${ id }` );
    return request.then( response => response.status );
};

const modify = ( personObject ) => {
    const request = axios.put( `${ baseUrl }/${ personObject.id }`, personObject );
    return request.then( response => response.data );
}

export default { getAll, create, remove, modify };