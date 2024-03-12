import { type SyntheticEvent, useEffect, useRef, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import TouchRipple, { type TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'

import './ServiceObjectComponent.styles.scss'

interface ServiceObjectProps {
  name: string
  description: string
  onClick: () => void
  controlled: boolean
  checked?: boolean
  disabled?: boolean
}

export default function ServiceObjectComponent (props: ServiceObjectProps) {
  const ripple = useRef<TouchRippleActions>()
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    if (!props.controlled) {
      return
    }

    setChecked(!(props.checked === false))
  }, [props.checked])

  const onRippleStart = (e: SyntheticEvent) => {
    if (props.disabled === true) {
      return
    }
    ripple.current?.start(e)
  }

  const onRippleStop = (e: SyntheticEvent) => {
    if (props.disabled === true) {
      return
    }
    ripple.current?.stop(e)
  }

  const onComponentClick = () => {
    if (props.disabled === true) {
      return
    }

    if (!props.controlled) {
      setChecked(t => !t)
    } else {
      props.onClick()
    }
  }

  return (
    <div
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      onClick={onComponentClick}
      className={['service-object-component', props.disabled === true ? 'disabled' : ''].join(' ')}
    >
      <Checkbox
        disabled={props.disabled}
        checked={checked}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          color: props.disabled === true ? '#ccc' : '#EFA25D',
          '&:hover': {
            background: 'none'
          },
          '&.Mui-checked': {
            color: props.disabled === true ? '#ccc' : '#EFA25D'
          }
        }}
      />
      <div className="service-object-contents">
        <p className="service-name">{props.name}</p>
        <p>{props.description}</p>
      </div>
      <TouchRipple ref={ripple} center={false} />
    </div>
  )
}
