import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SET_STATISTICS } from '../../utils/actions';

const CharacterSelectView = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});
    const [startGame, setStart] = useState(false);
    let player = useSelector(state => state.player);

    const { loading, data } = useQuery(GET_USER);

    const userDataLength = Object.keys(userData).length;

    // On page load, get the user info (to get their characters later)
    useEffect(() => {
        if (!loading) {
            setUserData(data.user);
        }
    }, [data, loading]);

    // Load the character info into global state to start the game
    function selectCharacter(character) {
        dispatch({
            type: SET_STATISTICS,
            payload: {
                characterName: character.characterName,
                strength: character.strength,
                agility: character.agility,
                endurance: character.endurance,
                maxHP: character.maxHP,
                currentHP: character.maxHP,
                damMod: character.damMod,
                evaMod: character.evaMod,
                gold: character.gold,
                exp: character.exp,
            }
        })

        if (player.characterName == character.characterName) {
            console.log(player);
            setStart(true);
        }
    }

    function deleteCharacter() {

    }

    return (
        <>
            {userDataLength
                ? <>
                    <h1>Choose a character</h1>
                    <ol>
                        {userData.characters.length === 1
                            ? <>
                                <li>{userData.characters[0].characterName}</li>
                                <button onClick={() => selectCharacter(userData.characters[0])}>Select</button>
                                <button onClick={deleteCharacter}>Delete</button>
                            </>
                            : <>
                                <li>No character</li>
                            </>
                        }
                        {userData.characters.length === 2
                            ? <>
                                <li>{userData.characters[1].characterName}</li>
                            </>
                            : <>
                                <li>No character</li>
                            </>
                        }
                        {userData.characters.length === 3
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
            {startGame ? (
                <Redirect to="/city" />
            ) : (null)}
        </>
    )
}

export default CharacterSelectView;