import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

function CharacterSelectView() {
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;

    const { loading, data } = useQuery(GET_USER);

    useEffect(() => {
        if (data) {
            console.log(data.user);
        }
        else if (!loading) {
            console.log("Finished loading")
        }
    }, [data, loading]);

    return (
        <>
            <h1>Test</h1>
        </>
    )
}

export default CharacterSelectView;