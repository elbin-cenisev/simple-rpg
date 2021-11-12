import React, { useEffect, useState } from 'react';
import { GET_USER } from '../../utils/queries';
import { DELETE_CHARACTER } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, Divider, Header, Table, Icon } from 'semantic-ui-react';

import { SET_STATISTICS } from '../../utils/actions';
import Auth from '../../utils/auth';

import './style.css';

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
        <div className="select-menu">
            <Header as='h1' textAlign='center'>
            Select a Character
          </Header>

            {userDataLength
                ? <>
                    <List verticalAlign="middle">
                        {userData.characters.length > 0
                            ? <>
                                <List.Item className="character-info">
                                    <Divider horizontal>
                                        <Header as='h3'>
                                            Character 1
                                        </Header>
                                    </Divider>

                                    <List.Content>
                                        <Table definition>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                    <Table.Cell>{userData.characters[0].characterName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                    <Table.Cell>{userData.characters[0].currentHP} / {userData.characters[0].maxHP}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                    <Table.Cell> {userData.characters[0].exp}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                    <Table.Cell> {userData.characters[0].gold}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                    <Table.Cell>{userData.characters[0].potions}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </List.Content>

                                    <div className="button-bar">
                                        <List.Content floated="left">
                                            <button className="ui button" onClick={() => selectCharacter(userData.characters[0])}>
                                                Select
                                            </button>
                                        </List.Content>

                                        <List.Content floated="right">
                                            <button className="ui button" onClick={() => deleteCharacter(userData.characters[0])}>
                                                Delete
                                            </button>
                                        </List.Content>
                                    </div>
                                </List.Item>
                            </>
                            : <>
                                <List.Item className="character-info">
                                    <Divider horizontal>
                                        <Header as='h3'>
                                            Empty Character Slot
                                        </Header>
                                    </Divider>


                                    <List.Content>
                                        <Table definition>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </List.Content>

                                    <div className="button-bar">
                                        <List.Content floated="left">
                                            <button className="ui button" onClick={() => createCharacter()}>
                                                New
                                            </button>
                                        </List.Content>
                                    </div>
                                </List.Item>
                            </>
                        }
                        {userData.characters.length > 1
                            ? <>
                                <List.Item className="character-info">
                                    <Divider horizontal>
                                        <Header as='h3'>
                                            Character 2
                                        </Header>
                                    </Divider>

                                    <List.Content>
                                        <Table definition>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                    <Table.Cell>{userData.characters[1].characterName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                    <Table.Cell>{userData.characters[1].currentHP} / {userData.characters[1].maxHP}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                    <Table.Cell> {userData.characters[1].exp}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                    <Table.Cell> {userData.characters[1].gold}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                    <Table.Cell>{userData.characters[1].potions}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </List.Content>
                                    <div className="button-bar">
                                        <List.Content floated="left">
                                            <button className="ui button" onClick={() => selectCharacter(userData.characters[1])}>
                                                Select
                                            </button>
                                        </List.Content>

                                        <List.Content floated="right">
                                            <button className="ui button" onClick={() => deleteCharacter(userData.characters[1])}>
                                                Delete
                                            </button>
                                        </List.Content>
                                    </div>

                                </List.Item>
                            </>
                            :
                            <List.Item className="character-info">
                                <Divider horizontal>
                                    <Header as='h3'>
                                        Empty Character Slot
                                    </Header>
                                </Divider>

                                <List.Content>
                                    <Table definition>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                <Table.Cell></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </List.Content>

                                <div className="button-bar">
                                    <List.Content floated="left">
                                        <button className="ui button" onClick={() => createCharacter()}>
                                            New
                                        </button>
                                    </List.Content>
                                </div>
                            </List.Item>
                        }
                        {userData.characters.length > 2
                            ? <>
                                <List.Item className="character-info">
                                    <Divider horizontal>
                                        <Header as='h3'>
                                            Character 3
                                        </Header>
                                    </Divider>
                                    <List.Content>
                                        <Table definition>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                    <Table.Cell>{userData.characters[2].characterName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                    <Table.Cell>{userData.characters[2].currentHP} / {userData.characters[2].maxHP}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                    <Table.Cell> {userData.characters[2].exp}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                    <Table.Cell> {userData.characters[2].gold}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                    <Table.Cell>{userData.characters[2].potions}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </List.Content>

                                    <div className="button-bar">
                                        <List.Content floated="left">
                                            <button className="ui button" onClick={() => selectCharacter(userData.characters[2])}>
                                                Select
                                            </button>
                                        </List.Content>

                                        <List.Content floated="right">
                                            <button className="ui button" onClick={() => deleteCharacter(userData.characters[2])}>
                                                Delete
                                            </button>
                                        </List.Content>
                                    </div>

                                </List.Item>
                            </>
                            : <>
                                <List.Item className="character-info">
                                    <Divider horizontal>
                                        <Header as='h3'>
                                            Empty Character Slot
                                        </Header>
                                    </Divider>

                                    <List.Content>
                                        <Table definition>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='male' />Name</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width={2}><Icon name='heart' />HP</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='sun' />EXP</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='rupee sign' />Gold</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><Icon name='first aid' />Potions</Table.Cell>
                                                    <Table.Cell></Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </List.Content>

                                    <div className="button-bar">
                                        <List.Content floated="left">
                                            <button className="ui button" onClick={() => createCharacter()}>
                                                New
                                            </button>
                                        </List.Content>
                                    </div>
                                </List.Item>
                            </>
                        }
                    </List>
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
        </div>
    )
}

export default CharacterSelectView;