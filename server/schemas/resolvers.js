const { AuthenticationError } = require('apollo-server-express');
const { User, Player } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('characters');
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
    createCharacter: async (parent, { characterName, strength, agility, endurance, maxHP, currentHP, damMod, evaMod, gold, exp, potions }, context) => {
      console.log("Server-side");
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
          potions,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { characters: character } }
        );

        return character;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveCharacter: async (parent, { characterName, strength, agility, endurance, maxHP, currentHP, damMod, evaMod, gold, exp, potions }, context) => {
      if (context.user) {
        const character = await Player.findOneAndUpdate(
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
              potions: potions,
            }
          },
          { new: true }
        );

        console.log(character);
        return character;
      }
    },
    deleteCharacter: async (parent, { characterName }, context) => {
      console.log("We are here");
      if (context.user) {
        const removedUser = await Player.findOne(
          { characterName: characterName }
        );
        const playerID = removedUser._id;
        console.log(playerID);

        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { characters: { $in: [playerID] } } },
            { new: true }
          );

          console.log(updatedUser.characters);

        } catch (err) {
          console.log(err)
        }

        try {
          await Player.deleteOne({ _id: playerID });
          console.log(`${playerID} has been deleted`);
          
        } catch (err) {
          console.log(err)
        }

        return removedUser;
      }
    }
  },
};

module.exports = resolvers;
