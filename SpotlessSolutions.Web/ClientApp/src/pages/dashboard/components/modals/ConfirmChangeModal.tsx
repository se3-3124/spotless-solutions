import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmChangeModalProps {
  open: boolean
  onClose: () => void
  onSubmitChanges: () => void
}

export default function ConfirmChangeModal ({ open, onClose, onSubmitChanges }: ConfirmChangeModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Changes?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to save changes to the service?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmitChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
