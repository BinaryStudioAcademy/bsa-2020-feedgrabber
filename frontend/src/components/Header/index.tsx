import React from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';

const Header = ({ user }) => (
    <Menu secondary>
        <Menu.Item>
            <img src="https://img.icons8.com/cotton/64/000000/chat.png" alt=""/>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item >
                <Icon name="bell" />
            </Menu.Item>
            <Menu.Item >
                <Image circular src={user.avatar} />
            </Menu.Item>
            <Menu.Item >
                <Icon name="log out" />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

export default Header;