import React from 'react';
import Auth from '../../utils/auth';

function Header() {

    return (
        <>
            <button onClick={Auth.logout}>Logout</button>
        </>
    )
}

export default Header;
