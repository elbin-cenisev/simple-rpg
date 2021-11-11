import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

function CharacterSelectView() {
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;
    const charactersLength = Object.keys(userData.characters).length;

    const { loading, data } = useQuery(GET_USER);

    // On page load, get the user info (to get their characters)
    useEffect(() => {
        if (!loading) {
            setUserData(data.user);
        }
    }, [data, loading]);

    return (
        <>
            {userDataLength
                ? <>
                    <h1>Choose a character</h1>
                    <ol>
                        {charactersLength === 1
                            ? <>
                                <li>{userData.characters[0].characterName}</li>
                            </>
                            : <>
                                <li>No character</li>
                            </>
                        }
                        {charactersLength === 2
                            ? <>
                                <li>{userData.characters[1].characterName}</li>
                            </>
                            : <>
                                <li>No character</li>
                            </>
                        }
                        {charactersLength === 3
                            ? <>
                                <li>{userData.characters[2].characterName}</li>
                            </>
                            : <>
                                <li>No character</li>
                            </>
                        }
                    </ol>
                </>
                : <>
                    <h1> LOADING </h1>
                </>
            }
        </>
    )
}

export default CharacterSelectView;