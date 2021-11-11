import { gql } from '@apollo/client';

export const GET_USER = gql`
    query user {
        user {
          _id
          characters {
            characterName
            strength
            agility
            endurance
            maxHP
            currentHP
            damMod
            evaMod
            gold
            exp
            potions
          }
        }
    }
`