const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    characterName: {
        type:String,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    agility: {
        type: Number,
        required: true
    },
    endurance: {
        type: Number,
        required: true
    },
    currentHP: {
        type: Number,
        required: true
    },
    maxHP: {
        type: Number,
        required: true
    },
    damMod: {
        type: Number,
        required: true
    },
    evaMod: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    potions: {
        type: Number,
    }

});

const Player = model('Player', playerSchema);

module.exports = Player;
