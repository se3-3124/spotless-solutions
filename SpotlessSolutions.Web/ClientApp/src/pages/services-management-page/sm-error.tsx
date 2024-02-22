import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function ServiceManagementError() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
          SAVE
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Unable to Save Service. Please try again."
      />
    </Box>
  );
}