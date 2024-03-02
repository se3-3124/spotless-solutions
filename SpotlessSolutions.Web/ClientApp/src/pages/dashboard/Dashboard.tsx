import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import DashboardAppBarComponent from './components/DashboardAppBarComponent.tsx'
import DashboardDrawerComponent from './components/DashboardDrawerComponent.tsx'
import useSession from "../../hooks/useSession.ts";

import './dashboard.scss'

export default function Dashboard () {
  useSession()

  return (
        <Box sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
            <DashboardAppBarComponent />
            <Stack direction="row">
                <DashboardDrawerComponent />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h1" fontWeight="bold">
                        Dashboard
                    </Typography>
                </Box>
            </Stack>
        </Box>
  )
}
