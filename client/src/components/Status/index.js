import React, { } from 'react';
import { useSelector } from 'react-redux';
import { Progress, Table, Icon } from 'semantic-ui-react';

import './style.css';

function Status() {
    let player = useSelector(state => state.player);
    let healthPercentage = (player.currentHP * 100) / player.maxHP

    return (
        <Table celled id="status-bar">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell  width={2} textAlign="left"><Icon name='male' /> Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign="left"><Icon name='heart' /> Health</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign="left"><Icon name='first aid' /> Potions</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign="left"><Icon name='sun' /> EXP</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign="left"><Icon name='rupee sign' />Gold</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell textAlign="left">{player.characterName}</Table.Cell>
                    <Table.Cell textAlign="left"> <Progress percent={healthPercentage} success>{player.currentHP} / {player.maxHP}</Progress></Table.Cell>
                    <Table.Cell textAlign="left">{player.potions}</Table.Cell>
                    <Table.Cell textAlign="left">{player.exp}</Table.Cell>
                    <Table.Cell textAlign="left">{player.gold}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>

        /* <List horizontal relaxed='very' id="status-bar">

            <List.Item id="player-name">
                <List.Content>
                    <List.Header><Icon name='male' /> Name</List.Header>
                    {player.characterName}
                </List.Content>
            </List.Item>

            <List.Item id="health-bar">
                <List.Content>
                    <List.Header><Icon name='heart' /> Health</List.Header>
                    <Progress percent={healthPercentage} success>{player.currentHP} / {player.maxHP}</Progress>
                </List.Content>
            </List.Item>

            <List.Item id="potion-bar">
                <List.Content>
                    <List.Header><Icon name='first aid' /> Potions</List.Header>
                    {player.potions}
                </List.Content>
            </List.Item>

            <List.Item>
                <List.Content>
                    <List.Header><Icon name='sun' /> EXP</List.Header>
                    {player.exp}
                </List.Content>
            </List.Item>

            <List.Item>
                <List.Content>
                    <List.Header><Icon name='rupee sign' />Gold</List.Header>
                    {player.gold}
                </List.Content>
            </List.Item>
        </List> */
    );
};

export default Status;