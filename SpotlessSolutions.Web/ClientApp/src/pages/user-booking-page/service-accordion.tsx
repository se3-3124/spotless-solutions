import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  type AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box, Checkbox, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

// Define the data for each accordion panel
const accordionData = [
  {
    id: 'panel1',
    title: 'Select a Main Service',
    content: [
      { title: 'General Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Deep Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Post Construction Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Routine Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
    ]
  },
  {
    id: 'panel2',
    title: 'Select Add-ons',
    content: [
      { title: 'Mattress Deep Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Sofa Deep Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Carpet Deep Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Dishwashing Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Garage Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Exterior Windows Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Ref Cleaning or Microwave Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Aircon Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Car Interior Deep Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Lawn Trimming Cleaning', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
      { title: 'Cabinet Cleaning and Organization', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
    ]
  }
]

// Define the data structure for the services
const services = [
  {
    id: 'panel3',
    name: 'Mattress Deep Cleaning',
    fields: [
      { label: 'Size', type: 'number', min: 0 },
      { label: 'Number of Mattress', type: 'number', min: 0 },
      { label: 'Inches', type: 'number', min: 0 }
    ]
  },
  {
    id: 'panel3',
    name: 'Carpet Deep Cleaning',
    fields: [
      { type: 'file' },
      { label: 'Size', type: 'number', min: 0 }
    ]
  },
  {
    id: 'panel3',
    name: 'Sofa Deep Cleaning',
    fields: [
      { label: 'Number of Seaters', type: 'number', min: 0 }
    ]
  }
  // Add more services as neededS
]

export default function ServicesAccordion () {
  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      {accordionData.map((panel) => (
        <Accordion key={panel.id} expanded={expanded === panel.id} onChange={handleChange(panel.id)}>
          <AccordionSummary aria-controls={`${panel.id}-content`} id={`${panel.id}-header`}>
            <Typography>{panel.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className='sm:flex flex-row mt-5'>
                <div className='mx-5'>
                  {panel.content.slice(0, Math.ceil(panel.content.length / 2)).map((item, index) => (
                    <Box className='mb-5' key={index} sx={{
                      width: 340,
                      height: 130,
                      borderRadius: 1,
                      bgcolor: 'white',
                      border: '2px solid grey',
                      '&:hover': {
                        bgcolor: '#E8E4E4'
                      }
                    }}>
                      <div className='flex'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 36, marginTop: 1.5, marginLeft: 1, color: '#EFA25D' } }} />
                        <div className='mt-3.5 ml-1'>
                          <span className='font-bold text-lg'>{item.title}</span>
                          <p className='text-xs p-2 -ml-2'>{item.description}</p>
                        </div>
                      </div>
                    </Box>
                  ))}
                </div>
                <div className=''>
                  {panel.content.slice(Math.ceil(panel.content.length / 2)).map((item, index) => (
                    <Box className='mb-5' key={index} sx={{
                      width: 340,
                      height: 130,
                      borderRadius: 1,
                      bgcolor: 'white',
                      border: '2px solid grey',
                      '&:hover': {
                        bgcolor: '#E8E4E4'
                      }
                    }}>
                      <div className='flex'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 36, marginTop: 1.5, marginLeft: 1, color: '#EFA25D' } }} />
                        <div className='mt-3.5 ml-1'>
                          <span className='font-bold text-lg'>{item.title}</span>
                          <p className='text-xs p-2 -ml-2'>{item.description}</p>
                        </div>
                      </div>
                    </Box>
                  ))}
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Provide details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className='flex flex-col p-5 space-y-4 w-full'> {/* Adjusted to full width */}
            {services.map((service, serviceIndex) => (
              <Box key={serviceIndex} className='flex flex-col p-5 space-y-4 w-1/2 border-2'>
                <Typography variant="h6">{service.name}</Typography>
                {service.fields.map((field, fieldIndex) => (
                  <TextField
                    key={fieldIndex}
                    label={field.label}
                    type={field.type}
                    InputProps={{ inputProps: { min: field.min } }}
                    variant="outlined"
                    fullWidth
                    className="mb-2"
                  />
                ))}
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Select a Schedule</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='flex p-5'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                  orientation="portrait"
                  disablePast={true}
                />
              </LocalizationProvider>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
