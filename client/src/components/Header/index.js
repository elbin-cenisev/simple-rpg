import React, { } from 'react';
import Auth from '../../utils/auth';
import { Menu } from 'semantic-ui-react';

import './style.css';

function Header() {
    return (
        <>
            <Menu className="header-menu">
                <Menu.Item
                    name='logout'
                    onClick={Auth.logout}
                >
                </Menu.Item>
            </Menu>
        </>
    )
}

export default Header;
