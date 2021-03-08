import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';

export function HeaderProfile({ children }) {
    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} src={logo} alt="idiversity" />
            </Header.Frame>
            {children}
        </Header>
    );
}
