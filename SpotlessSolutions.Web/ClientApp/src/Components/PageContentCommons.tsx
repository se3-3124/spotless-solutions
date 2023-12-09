import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';

import './PageContentCommons.scss';
import tdLogo from '../assets/td_logo.jpg';
import * as DOMPurify from "dompurify";
import {Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {Logout} from "@mui/icons-material";

export type WrapAroundProps = {
  active: number;
  children: string | React.ReactElement | React.ReactElement[] | (() => React.ReactElement);
};

type MenuObject = {
    id: number;
    location: string;
    pathName: string;
}

const menus: MenuObject[] = [
    {
        id: 0,
        location: '/',
        pathName: 'Home'
    },
    {
        id: 1,
        location: '#',
        pathName: 'About Us'
    },
    {
        id: 2,
        location: '#',
        pathName: 'Services'
    },
    {
        id: 3,
        location: '#',
        pathName: 'FAQs'
    }
];

type LoginState = {
    loggedIn: boolean;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export default function PageContentCommons(props: WrapAroundProps) {
    const [loginState, setLoginState] = useState<LoginState>({
        loggedIn: false,
        firstName: '',
        lastName: '',
        isAdmin: false
    });
    const [openMenuState, setOpenMenuState] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (localStorage.getItem('ssfn') && localStorage.getItem('ssln')) {
            const firstName = DOMPurify.sanitize(localStorage.getItem('ssfn') ?? '');
            const lastName = DOMPurify.sanitize(localStorage.getItem('ssln') ?? '');
            const isAdmin = localStorage.getItem('ssad') == "1";
            
            setLoginState({
                loggedIn: true,
                firstName,
                lastName,
                isAdmin
            });
        }
    }, []);
    
    const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
        setOpenMenuState(e.currentTarget);
    };
    
    const handleClose = () => setOpenMenuState(null);

    return (
        <>
            <div className="navbar-main">
                <Toolbar>
                    <img src={tdLogo} className="h-16" alt="Topdown logo" />
                    <ul className="navbar-menu-wrapper">
                        {
                            menus.map((menu, index) => (
                                <li key={index}>
                                    <Link
                                        to={menu.location}
                                        className={props.active === menu.id ? 'selected' : ''}>
                                        {menu.pathName}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="navbar-right-side">
                        {
                            loginState.loggedIn ? (
                                <Tooltip title="My account">
                                    <IconButton
                                        onClick={handleOpenMenu}
                                        size="medium">
                                        <Avatar sx={{ width: 64, height: 64 }}>
                                            {loginState.firstName[0].toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <>
                                    <Link to="/login" className="btn login-button">Login</Link>
                                    <Link to="/signup" className="btn signup-button">
                                        Sign-Up
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </Toolbar>
            </div>
            {props.children}
            <div className="footer">
                <div className="contents">
                    <Link to="/">
                        <img src={tdLogo} className="h-24" alt="Topdown logo" />
                    </Link>
                    <div className="contact-field">
                        {
                            [
                                {
                                    label: 'Email',
                                    value: 'example@example.com'
                                },
                                {
                                    label: 'Phone',
                                    value: '09124234324324'
                                }
                            ].map((item, index) => (
                                <p key={index} className={index <= 0 ? '' : 'mt-8'}>
                                    <b>{item.label}</b><br />
                                    {item.value}
                                </p>
                            ))
                        }
                    </div>
                    <div className="contact-field">
                        <p className="font-bold">Socials</p>
                    </div>
                    <div className="contact-field">
                        <p className="font-bold">Site Map</p>
                    </div>
                </div>
                <div className="divider" />
                Copyright (C) 2023 Topdown Cleaning Services
            </div>
            <Menu
                anchorEl={openMenuState}
                open={Boolean(openMenuState)}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                {
                    loginState.isAdmin && (
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                    )
                }
                <MenuItem onClick={handleClose} component={Link} to="/logout">
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}
