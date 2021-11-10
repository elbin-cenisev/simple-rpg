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
  mutation createCharacter(
    $strength: Int!
    $agility: Int!
    $endurance: Int!
    $maxHP: Int!
    $currentHP: Int!
    $damMod: Float!
    $evaMod: Float!
  ) {
    createCharacter(
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
