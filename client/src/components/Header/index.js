import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';


function Header() {
    return (
        <>
            <button onClick={Auth.logout}>Logout</button>
        </>
    )
}

export default Header;
