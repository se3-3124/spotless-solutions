import Typography from '@mui/material/Typography'

interface SampleComponentProps {
  text: string
}

/**
 * Sample Component
 */
export default function SampleComponent ({ text }: SampleComponentProps) {
  return (
     <Typography variant="body2">{text}</Typography>
  )
}
