import { type MouseEvent, type SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import TouchRipple, { type TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'

import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { type UserData, UserRole } from '../../types/UserData.ts'
import tdLogo from '../../assets/td_logo.jpg'

import './NavigationBar.style.scss'
import MenuItem from '@mui/material/MenuItem'

interface NavigationBarProps {
  /**
   * User data
   */
  user: UserData | null
}

export default function NavigationBar (props: NavigationBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const ripple = useRef<TouchRippleActions>()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    if (menuOpen) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
    setPrevScrollPos(currentScrollPos)
  }

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setDropdownOpen(e.currentTarget)
  }

  const handleClose = () => {
    setDropdownOpen(null)
  }

  const onRippleStart = (e: SyntheticEvent) => {
    ripple.current?.start(e)
  }

  const onRippleStop = (e: SyntheticEvent) => {
    ripple.current?.stop(e)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [prevScrollPos, visible])

  return (
    <>
      <nav className={`navigation-bar ${visible ? '' : 'nav-visible'}`}>
        <div className="nav-container">
          <Link to="/" className="nav-home-logo">
            <img src={tdLogo} alt="TCS Logo"/>
            <span>TopDown</span>
          </Link>
          <div className={`auth-container ${menuOpen ? 'open' : 'close'}`}>
            {
              props.user === null
                ? (
                  <>
                    <Link to="/login" type="button" className="login-btn">
                      Log in
                    </Link>
                    <Link to="/signup" type="button" className="login-btn">
                      Sign-up
                    </Link>
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className={`hamburger ${menuOpen ? 'open' : 'close'}`}>
                      {
                        menuOpen
                          ? (<AiOutlineClose size={20}/>)
                          : (<AiOutlineMenu size={20}/>)
                      }
                    </button>
                  </>
                  )
                : (
                  <div
                    id="account-toggler"
                    className="user-profile"
                    aria-controls={dropdownOpen !== null ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen !== null ? 'true' : undefined}
                    onMouseDown={onRippleStart}
                    onMouseUp={onRippleStop}
                    onClick={handleOpen}
                  >
                    <p className="font-kaushan welcome-text">Welcome back,</p>
                    <p className="text-user">{props.user.firstName}, {props.user.lastName}!</p>
                    <TouchRipple ref={ripple} center={false} />
                  </div>
                  )
            }
          </div>
          <div className={`nav-contents ${menuOpen ? 'open' : 'close'}`}>
            <ul className="nav-items-container">
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/about-us" className="nav-link">About</Link>
              </li>
              <li>
                <Link to="/services" className="nav-link">Services</Link>
              </li>
              <li>
                <Link to="/faqs" className="nav-link">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        props.user !== null && (
          <Menu
            id="account-menu"
            open={Boolean(dropdownOpen)}
            anchorEl={dropdownOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'account-toggler'
            }}
            sx={{
              '& .MuiMenu-paper': {
                width: 180,
                maxWidth: '100%'
              }
            }}>
            <MenuList>
              {
                props.user.role === UserRole.Administrator && (
                  <MenuItem component={Link} to="/dashboard">
                    <ListItemIcon>
                      <AdminPanelSettingsRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                  </MenuItem>
                )
              }
              <MenuItem component={Link} to="/logout">
                <ListItemIcon>
                  <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        )
      }
    </>
  )
}
