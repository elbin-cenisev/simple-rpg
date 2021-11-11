const { AuthenticationError } = require('apollo-server-express');
const { User, Player } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('characters');
        console.log(user);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createCharacter: async (parent, { characterName, strength, agility, endurance, maxHP, currentHP, damMod, evaMod, gold, exp }, context) => {
      if (context.user) {
        const character = await Player.create({
          characterName,
          strength,
          agility,
          endurance,
          maxHP,
          currentHP,
          damMod,
          evaMod,
          gold,
          exp,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { characters: character } }
        );

        return character;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveCharacter: async (parent, { characterName, strength, agility, endurance, maxHP, currentHP, damMod, evaMod, gold, exp }, context) => {
      if (context.user) {
        const character = Player.findOneAndUpdate(
          { characterName: characterName },
          {
            $set: {
              strength: strength,
              agility: agility,
              endurance: endurance,
              maxHP: maxHP,
              currentHP: currentHP,
              damMod: damMod,
              evaMod: evaMod,
              gold: gold,
              exp: exp,
            }
          },
          { new: true }
        );
        return character;
      }
    }
  },
};

module.exports = resolvers;
