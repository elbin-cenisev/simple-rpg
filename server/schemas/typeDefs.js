const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    characters: [Player]
  }

  type Player {
    _id: ID
    characterName: String!
    strength: Int!
    agility: Int!
    endurance: Int!
    maxHP: Int!
    currentHP: Int!
    damMod: Float!
    evaMod: Float!
    gold: Int
    exp: Int
    potions: Int
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createCharacter(characterName: String!, strength: Int!, agility: Int!, endurance: Int!, maxHP: Int!, currentHP: Int!, damMod: Float!, evaMod: Float!, gold: Int, exp: Int, potions: Int): Player
    saveCharacter(characterName: String!, strength: Int, agility: Int, endurance: Int, maxHP: Int, currentHP: Int, damMod: Float, evaMod: Float, gold: Int, exp: Int, potions: Int): Player
    deleteCharacter(characterName: String): Player
  }
`;
module.exports = typeDefs;
