import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { type MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'

import Face6RoundedIcon from '@mui/icons-material/Face6Rounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'

import { type UserData, UserRole } from '../../types/UserData.ts'

import tdLogo from '../../assets/td_logo.jpg'
import './NavigationBar.style.scss'

interface NavigationBarProps {
  /**
   * User data
   */
  user: UserData | null
}

/**
 * Navigation bar component
 */
export default function NavigationBar (props: NavigationBarProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  return (
    <>
      <div className="navbar-main">
        <Toolbar>
          <img src={tdLogo} alt="Topdown logo"/>
          <ul className="navbar-menu-wrapper">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/appointment">Services</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
          <div className="navbar-right-side">
            {
              props.user !== null
                ? (
                  <Tooltip title="My account">
                   <IconButton onClick={handleOpenMenu} size="medium">
                     <Avatar sx={{ width: 64, height: 64 }}>
                       {props.user.firstName[0].toUpperCase()}
                     </Avatar>
                   </IconButton>
                  </Tooltip>
                  )
                : (
                  <>
                    <Link className="btn login-button" to="/login">
                      Login
                    </Link>
                    <Link className="btn signup-button" to="/signup">
                      Sign-Up
                    </Link>
                  </>
                  )
            }
          </div>
        </Toolbar>
      </div>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          props.user !== null && (
            <>
              {
                props.user.role === UserRole.Administrator
                  ? (
                  <MenuItem onClick={handleCloseMenu} component={Link} to="/dashboard">
                    <ListItemIcon sx={{ mr: 2 }}>
                      <ManageAccountsRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                    )
                  : (
                  <MenuItem onClick={handleCloseMenu} component={Link} to="/profile">
                    <ListItemIcon sx={{ mr: 2 }}>
                      <Face6RoundedIcon fontSize="small" />
                    </ListItemIcon>
                    {props.user.firstName}, {props.user.lastName}
                  </MenuItem>
                    )
              }
            </>
          )
        }
        <MenuItem onClick={handleCloseMenu} component={Link} to="/logout">
          <ListItemIcon sx={{ mr: 2 }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
