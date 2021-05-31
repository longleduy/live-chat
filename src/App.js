import React, {Fragment} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_USER = gql`
    query MyQuery {
      allUser {
        id
        cognitoId
        username
      }
    }
`
function App() {
    const { loading, error, data } = useQuery(GET_ALL_USER);
    if (loading) return null;
    if (error) return `Error! ${error}`;
    return (
        <Fragment>
            <p>{JSON.stringify(data)}</p>
        </Fragment>
    );
}

export default App;
