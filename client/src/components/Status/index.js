import React, { } from 'react';
import { useSelector } from 'react-redux';
import { Progress } from 'semantic-ui-react';

function Status() {
    let player = useSelector(state => state.player);
    let healthPercentage = (player.currentHP * 100) / player.maxHP

    return (
        <div id="statusBar">

            {/* Shows player's current HP */}
            <div id="health-bar">
                <Progress percent={healthPercentage}>Health</Progress>
                {player.currentHP} / {player.maxHP}
            </div>

            {/* Shows how many potions the player has in their posession */}
            <div id="potion-bar">
                {player.potions} Potions
            </div>

        </div>
    );
};

export default Status;