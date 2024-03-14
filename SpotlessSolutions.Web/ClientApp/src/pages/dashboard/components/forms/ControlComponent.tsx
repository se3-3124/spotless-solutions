import { type IconType } from 'react-icons'
import Tooltip from '@mui/material/Tooltip'

import './ControlComponent.styles.scss'

export interface ControlComponentProps {
  title: string
  onClick: () => void
  Icon: IconType
  isActive: boolean
}

export default function ControlComponent ({ title, onClick, Icon, isActive }: ControlComponentProps) {
  return (
    <Tooltip placement="top" title={title}>
      <button className={['control-btn', isActive ? 'active' : ''].join(' ')} onClick={onClick}>
        <Icon />
      </button>
    </Tooltip>
  )
}
