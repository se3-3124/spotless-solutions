import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";

import AuthContext from "../../../contexts/AuthContext.ts";

import "./DashboardAppBarComponent.style.scss";

export default function DashboardAppBarComponent() {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const authContext = useContext(AuthContext);
    
    const handleAccountMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(e.currentTarget);
    }
    
    const handleAccountMenuClose = () => {
        setMenuAnchor(null)
    }

    return (
        <>
            <div className="dashboard-navbar-root">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Administrator Dashboard
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton size="small" color="inherit" sx={{mr: 1}}>
                        <NotificationsNoneRounded/>
                    </IconButton>
                    <IconButton id="account-menu-button" size="small" onClick={handleAccountMenuOpen}>
                        <Avatar sx={{ bgcolor: '#f2cd5d' }}>
                            {(authContext.user?.firstName[0] ?? 'U').toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Toolbar>
            </div>
            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleAccountMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'account-menu-button'
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{
                    '& .MuiPaper-root': {
                        width: 180
                    }
                }}
            >
                <MenuItem onClick={handleAccountMenuClose} component={Link} to="/logout">
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}
