import {Link} from "react-router-dom";

import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import "./DashboardDrawerComponent.style.scss";
import GroupSection from "./typography/GroupSection.tsx";

export default function DashboardDrawerComponent() {
    return (
        <div className="dashboard-sidebar-container">
            <Stack direction="column" spacing={1}>
                <Box sx={{ pt: 1 }} />
                
                <GroupSection>Pinned</GroupSection>
                <MenuList>
                    <MenuItem component={Link} to="/dashboard">
                        <ListItemText>Dashboard Home</ListItemText>
                    </MenuItem>
                </MenuList>

                <GroupSection>Bookings</GroupSection>
                <MenuList>
                    <MenuItem component={Link} to="/dashboard/calendar">
                        <ListItemText>Calendar View</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/dashboard/calendar-workflow">
                        <ListItemText>Workflow</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/dashboard/history">
                        <ListItemText>History</ListItemText>
                    </MenuItem>
                </MenuList>
                <GroupSection>Analytics</GroupSection>
                <MenuList>
                    <MenuItem>
                        <ListItemText>Sales Report</ListItemText>
                    </MenuItem>
                </MenuList>
                <GroupSection>Management</GroupSection>
                <MenuList>
                    <MenuItem>
                        <ListItemText>IAM</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>Service Management</ListItemText>
                    </MenuItem>
                </MenuList>
            </Stack>
        </div>
    )
}
