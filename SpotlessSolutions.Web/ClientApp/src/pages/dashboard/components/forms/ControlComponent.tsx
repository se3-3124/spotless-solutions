import IconButton from '@mui/material/IconButton'
import type SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'

export interface ControlComponentProps {
  title: string
  onClick: () => void
  Icon: typeof SvgIcon
  isActive: boolean
}

export default function ControlComponent ({ title, onClick, Icon, isActive }: ControlComponentProps) {
  return (
    <Tooltip placement="top" title={title}>
      <IconButton onClick={onClick} size="small" color={isActive ? 'success' : 'default'}>
        <Icon />
      </IconButton>
    </Tooltip>
  )
}
