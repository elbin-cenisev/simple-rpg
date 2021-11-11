import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { DELETE_CHARACTER } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SET_STATISTICS } from '../../utils/actions';
import Auth from '../../utils/auth';

const CharacterSelectView = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});
    const [startGame, setStart] = useState(false);
    const [createChar, setCreate] = useState(false);

    let player = useSelector(state => state.player);

    const { loading, data } = useQuery(GET_USER);
    const [removePlayer] = useMutation(DELETE_CHARACTER);

    const userDataLength = Object.keys(userData).length;

    // On page load, get the user info (to get their characters later)
    useEffect(() => {
        if (!loading) {
            setUserData(data.user);
        }
    });

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
                currentHP: character.currentHP,
                damMod: character.damMod,
                evaMod: character.evaMod,
                gold: character.gold,
                exp: character.exp,
                potions: character.potions,
            }
        })

        if (player.characterName == character.characterName) {
            console.log(player.currentHP);
            setStart(true);
        }
    }

    async function deleteCharacter(character) {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        let characterName = character.characterName;

        if (!token) {
            return false;
        }

        try {
            await removePlayer({
                variables: { characterName }
            })
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    function createCharacter() {
        setCreate(true)
    }

    return (
        <>
            {userDataLength
                ? <>
                    <h1>Choose a character</h1>
                    <ol>
                        {userData.characters.length > 0
                            ? <>
                                <li>{userData.characters[0].characterName}</li>
                                <button onClick={() => selectCharacter(userData.characters[0])}>Select</button>
                                <button onClick={() => deleteCharacter(userData.characters[0])}>Delete</button>
                                <p>{userData.characters[0].currentHP}</p>
                            </>
                            : <>
                                <li><button onClick={createCharacter}>New</button></li>
                            </>
                        }
                        {userData.characters.length > 1
                            ? <>
                                <li>{userData.characters[1].characterName}</li>
                                <button onClick={() => selectCharacter(userData.characters[1])}>Select</button>
                                <button onClick={() => deleteCharacter(userData.characters[1])}>Delete</button>
                            </>
                            : <>
                                <li><button onClick={createCharacter}>New</button></li>
                            </>
                        }
                        {userData.characters.length > 2
                            ? <>
                                <li>{userData.characters[2].characterName}</li>
                                <button onClick={() => selectCharacter(userData.characters[2])}>Select</button>
                                <button onClick={() => deleteCharacter(userData.characters[2])}>Delete</button>
                            </>
                            : <>
                                <li><button onClick={createCharacter}>New</button></li>
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

            {createChar ? (
                <Redirect to="/createCharacter" />
            ) : (null)}
        </>
    )
}

export default CharacterSelectView;