import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

function CharacterSelectView() {
    const [userData, setUserData] = useState({});
    const { loading, data } = useQuery(GET_USER);

    // On page load, get the user info (to get their characters)
    useEffect(() => {
        if (!loading) {
            setUserData(data.user);
        }
    }, [data, loading]);

    return (
        <>
            <h1>Test</h1>

        </>
    )
}

export default CharacterSelectView;