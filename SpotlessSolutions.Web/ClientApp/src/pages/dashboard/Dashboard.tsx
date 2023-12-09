import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import {Link} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogTitle, IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    PaperProps,
    Stack
} from "@mui/material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';

import tdLogo from '../../assets/td_logo.jpg';
import './dashboard.scss';
import {useState} from "react";
import {CloseRounded} from "@mui/icons-material";

export function CustomPaper(props: PaperProps) {
    const propData = {
        ...props,
        className: 'dialogue-custom ' + props.className
    } as PaperProps;

    return (
        <Paper {...propData} />
    )
}

export default function Dashboard() {
    const [dialogueOpen, setDialogueOpen] = useState<boolean>(false);
    
    const handleDialogueState = () => setDialogueOpen(p => !p);

    return (
        <>
            <Dialog open={dialogueOpen} fullWidth={true} PaperComponent={CustomPaper} maxWidth="xl" onClose={handleDialogueState}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <DialogTitle style={{flexGrow: 1}}>Request title</DialogTitle>
                    <IconButton onClick={handleDialogueState}>
                        <CloseRounded />
                    </IconButton>
                </Stack>
            </Dialog>
            <Stack direction="row">
                <Stack direction="column" className="sidebar">
                    <Link className="homepage-link" to="/">
                        <img src={tdLogo} alt="Go to home" />
                    </Link>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <CalendarMonthRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>Schedules</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ScheduleRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>History</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ShowChartRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>Analytics</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <EngineeringRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>Management</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Stack>
                <div className="dashboard-main-view">
                    <Button variant="contained" onClick={handleDialogueState}>Open menu</Button>
                </div>
            </Stack>
        </>
    )
}
