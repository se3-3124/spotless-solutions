import { Box, Divider, TextField, styled } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'

export default function ServicesManagementEdit () {
  return (
        <>
            <div className="flex p-3 -mb-6">
                <div className="flex-grow">
                    <div className="mt-7 mx-5">
                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Title" color="warning" variant="standard" />
                    </div>
                    <div className="mt-7 mx-5">
                        <TextareaAutosize aria-label="minimum height" minRows={15} placeholder="Description" />
                    </div>
                </div>
                <div className="flex-col mx-5 p-8">
                    <Box sx={{
                      height: '300px',
                      width: '500px',
                      p: 1,
                      my: 1,
                      bgcolor: '#EFA25D',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: 2
                    }}>
                        <svg height="35" viewBox="0 -960 960 960" width="35">
                            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>
                    </Box>
                </div>
            </div>
            <div className="p-4 w-10%">
                <Divider variant="middle" className="mt-10"></Divider>
            </div>
        </>
  )
}

const blue = {
  100: 'midnightblue',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 2px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
        border-color: ${blue[100]};
    }

    &:focus {
        border-color: ${blue[100]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
    `
)
