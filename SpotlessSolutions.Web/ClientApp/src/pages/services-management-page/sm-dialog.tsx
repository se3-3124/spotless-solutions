import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ServicesManagementDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Save
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{
              color: "black",
              fontWeight: "bold"
          }} id="alert-dialog-title">
          {"Confirm Changes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{
              color: "black"
          }} 
              id="alert-dialog-description">
            Do you want to apply the changes to the services?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{
              borderRadius: 4,
              backgroundColor: "#EFA25D",
              color: "midnightblue"}}
              onClick={handleClose}>Cancel</Button>
          <Button style={{
              borderRadius: 4,
              backgroundColor: "midnightblue",
              color: "#EFA25D"}}
              onClick={handleClose} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}