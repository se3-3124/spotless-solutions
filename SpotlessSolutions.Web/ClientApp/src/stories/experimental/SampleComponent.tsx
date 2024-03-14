import { useState } from 'react'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { FormControl, InputLabel, Select, type SelectChangeEvent } from '@mui/material'

interface SampleComponentProps {
  text: string
}

interface Example {
  addons: string[]
  main: string[]
}

const data: Example = {
  addons: ['example1', 'example4'],
  main: ['example2', 'example3']
}

/**
 * Sample Component
 */
export default function SampleComponent ({ text }: SampleComponentProps) {
  const [active, setActive] = useState<keyof Example>('addons')
  const [activeForms, setActiveForms] = useState(0)

  const handleServiceView = (index: number) => {
    setActiveForms(index)
  }

  const handleChange = (e: SelectChangeEvent) => {
    setActive(e.target.value as keyof Example)
    setActiveForms(0)
  }

  return (
     <Grid container spacing={4}>
       <Grid item xs={4}>
         <FormControl fullWidth sx={{ mb: 2 }}>
           <InputLabel id="demo-simple-select-label">Change Service Type</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={active}
             label="Change Service Type"
             onChange={handleChange}
           >
             <MenuItem value="addons">Addons</MenuItem>
             <MenuItem value="main">Main</MenuItem>
           </Select>
         </FormControl>
         {
           data[active].map((x, index) => (
             <Typography key={index} variant="body1" onClick={() => { handleServiceView(index) }}>{x}</Typography>
           ))
         }
       </Grid>
       <Grid item xs={8}>
         <Typography variant="body1">{text}: {active}</Typography>
         <Typography variant="body1">active form: {activeForms}: value {data[active][activeForms]}</Typography>
       </Grid>
     </Grid>
  )
}
