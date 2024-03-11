import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  type AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box, Checkbox, Stack } from '@mui/material'
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
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
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

export default function ExampleAccordion () {
  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Select a Main Service</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              <div className='sm:flex flex-row p-5'>
                  <div className='mb-5'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>General Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Deep Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5' style={{ width: '50%' }}>
                  <div className='mb-5'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Post Construction Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Routine Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Select Add-ons</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            <div className='sm:flex flex-row p-5'>
                  <div className='mb-5'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Mattress Deep Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Sofa Deep Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5' style={{ width: '50%' }}>
                  <div className='mb-5'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Carpet Deep Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Dishwashing Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5'>
                  <div className='mb-5'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Cabinet Cleaning and Organization</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Garage Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5' style={{ width: '50%' }}>
                  <div className='mb-5'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Exterior Windows Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Ref Cleaning or Microwave Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5'>
                  <div className='mb-5'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Aircon Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
                  <div className='sm:ml-10'>
                      <Box sx={{
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
                                  <span className='font-bold text-lg'>Car Interior Deep Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
              <div className='sm:flex flex-row p-5 -mt-5' style={{ width: '50%' }}>
                  <div className='mb-5'>
                      <Box sx={{
                        display: 'inline-flex',
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
                                  <span className='font-bold text-lg'>Lawn Trimming Cleaning</span>
                                  <p className='text-xs p-2 -ml-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                                  </p>
                              </div>
                          </div>
                      </Box>
                  </div>
              </div>
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Select a Main Service</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            <div className='sm:flex flex-row p-5'>
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDateTimePicker
                  orientation="portrait"
                  // label="Schedule Your Booking"
                  // value={value}
                  // onChange={setValue}
                />
                </LocalizationProvider>
              </Stack>
            </div>
            </Typography>
            </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}
