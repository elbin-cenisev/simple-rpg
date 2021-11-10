import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation createCharacter($characterName: String!, $strength: Int!, $agility: Int!, $endurance: Int!, $maxHP: Int!, $currentHP: Int!, $damMod: Float!, $evaMod: Float!) {
    createCharacter(characterName: $characterName, strength: $strength, agility: $agility, endurance: $endurance, maxHP: $maxHP, currentHP: $currentHP, damMod: $damMod, evaMod: $evaMod) {
        _id
        characterName
        strength
        agility
        endurance
        maxHP
        currentHP
        damMod
        evaMod
    }
  }
`

export const SAVE_CHARACTER = gql`
  mutation saveCharacter(
    $characterName: String!
    $strength: Int!
    $agility: Int!
    $endurance: Int!
    $maxHP: Int!
    $currentHP: Int!
    $damMod: Float!
    $evaMod: Float!
  ) {
    saveCharacter(
      characterName: $characterName
      strength: $strength
      agility: $agility
      endurance: $endurance
      maxHP: $maxHP
      currentHP: $currentHP
      damMod: $damMod
      evaMod: $evaMod
    ) {
      _id
      firstName
      lastName
      email
      playerCharacters {
        _id
        characterName
        strength
        agility
        endurance
        maxHP
        currentHP
        damMod
        evaMod
      }
    }
  }
`