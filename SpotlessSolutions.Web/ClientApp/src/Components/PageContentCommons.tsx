import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import Toolbar from '@mui/material/Toolbar'

import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

import AuthContext, { UserRole } from '../contexts/AuthContext.ts'

import tdLogo from '../assets/td_logo.jpg'

import './PageContentCommons.scss'

export interface WrapAroundProps {
  active: number
  children: string | React.ReactElement | React.ReactElement[] | (() => React.ReactElement)
}

interface MenuObject {
  id: number
  location: string
  pathName: string
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
]

export default function PageContentCommons (props: WrapAroundProps) {
  const context = useContext(AuthContext)
  const [openMenuState, setOpenMenuState] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setOpenMenuState(e.currentTarget)
  }

  const handleClose = () => { setOpenMenuState(null) }

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
                            context.user !== null
                              ? (
                                <Tooltip title="My account">
                                    <IconButton
                                        onClick={handleOpenMenu}
                                        size="medium">
                                        <Avatar sx={{ width: 64, height: 64 }}>
                                            {context.user.firstName[0].toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                )
                              : (
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
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}>
                <MenuItem onClick={handleClose}>
                    <Avatar /> {context.user?.firstName ?? ''}, {context.user?.lastName ?? ''}
                </MenuItem>
                {
                    context.user?.role === UserRole.Administrator && (
                        <MenuItem onClick={handleClose} component={Link} to="/dashboard">
                            <Avatar /> Dashboard
                        </MenuItem>
                    )
                }
                <MenuItem onClick={handleClose} component={Link} to="/logout">
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
  )
}
