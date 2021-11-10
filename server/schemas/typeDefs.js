const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    playerCharacters: [Player]
  }

  type Player {
    _id: ID
    name: String!
    strength: Int!
    agility: Int!
    endurance: Int!
    maxHP: Int!
    currentHP: Int!
    damMod: Float!
    evaMod: Float!
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
    createCharacter(strength: Int!, agility: Int!, endurance: Int!, maxHP: Int!, currentHP: Int!, damMod: Float!, evaMod: Float!): User
  }
`;

module.exports = typeDefs;
