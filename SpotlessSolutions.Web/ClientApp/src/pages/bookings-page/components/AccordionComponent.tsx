import { useEffect, useState, type ReactNode } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

const CustomAccordionWrapper = styled(Accordion)(() => {
  return {
    border: '1px solid #ccc',
    boxShadow: 'none'
  }
})

interface AccordionComponentProps {
  title: string
  children: ReactNode | ReactNode[]
  defaultActive?: boolean
}

export default function AccordionComponent (props: AccordionComponentProps) {
  const [accordionId] = useState<number>(Math.floor(Math.random() * 10_000))
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    if (props.defaultActive === true) {
      setActive(true)
    }
  }, [])

  const toggleActive = () => { setActive(t => !t) }

  return (
    <CustomAccordionWrapper expanded={active} onChange={toggleActive} sx={{ mb: 2, width: '100%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        aria-controls={`accordion-component-${accordionId}`}
        id={`accordion-component-${accordionId}-header`}
      >
        <Typography sx={{ fontWeight: 'bold' }}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </CustomAccordionWrapper>
  )
}
