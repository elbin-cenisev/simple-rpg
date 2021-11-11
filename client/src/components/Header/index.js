import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';


function Header() {
    const [returnSelect, setReturn] = useState(false);

    // Return the player to the select screen
    function returnToSelect() {
        setReturn(true);
    }

    return (
        <>
            <button onClick={Auth.logout}>Logout</button>
            <button onClick={returnToSelect}>Quit</button>
            {returnSelect ? (
                <Redirect to="/select" />
            ) : (null)}
        </>
    )
}

export default Header;
