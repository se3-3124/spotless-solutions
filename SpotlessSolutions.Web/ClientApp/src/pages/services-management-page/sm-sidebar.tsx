import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
// import { blue, grey } from "@mui/material/colors"
import tdLogo from '../../assets/td_logo.jpg';
import { styled } from "@mui/material";
import Divider from '@mui/material/Divider';
import React from "react";

export default function ServicesManagement() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const content = (
        <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
       Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
       Sed malesuada lobortis pretium.`}
        </Box>
      );
    

    return (
        <section>
        <div className="h-screen flex">
            <div className="w-64 px-8 py-3 bg-gray-100 border-r">
                <img src={tdLogo} className='h-9 w-9'/> 
                <nav className='mt-8'>
                    <h2 className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Bookings</h2>
                    <div className='mt-2 -mx-3'>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 bg-gray-200 rounded-lg'>
                            <span className='text-sm font-medium text-gray-900'>All</span>
                            <span className='text-xs font-semibold text-gray-700'>36</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>To Be Approved</span>
                            <span className='text-xs font-semibold text-gray-700'>5</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Request for Clarification</span>
                            <span className='text-xs font-semibold text-gray-700'>3</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Approved</span>
                            <span className='text-xs font-semibold text-gray-700'>12</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Rejected</span>
                            <span className='text-xs font-semibold text-gray-700'>3</span>
                        </a>    
                    </div>
                    <h2 className='mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide'>Tags</h2>
                    <div className='mt-2 -mx-3'>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Red</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Green</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Blue</span>
                        </a>
                        <a href="#" className='flex justify-between items-center px-3 py-2 text-gray-900 rounded-lg'>
                            <span className='text-sm font-medium text-gray-700'>Yellow</span>
                        </a>
                    </div>
                    <button className='mt-2 -ml-1 flex items-center text-sm font-medium text-gray-600'>
                        <svg className='h-4 w-4' height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                        <span className='ml-1'>New Project</span>
                    </button>
                </nav>
            </div>
            <div className="flex-1 min-w-0 bg-white">
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Service Management</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}
                <Stack spacing={2} direction="row">
                    {content}
                    <Divider orientation="vertical">Visual indicator</Divider>
                    {content}
                </Stack>
                {/* Services Management */}
                {/* <div className="flex p-3">
                    <div className="flex-grow">
                        <div className="mt-7 mx-5">
                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Title" color="warning" variant="standard" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextareaAutosize aria-label="minimum height" minRows={15} placeholder="Description" />
                        </div>
                    </div>
                    <div className="flex-col mx-5 p-8">
                        <Box sx={{ height: '300px', width: '300px',
                                    p: 1,
                                    my: 1,
                                    bgcolor: "#EFA25D",
                                    color: (theme) =>
                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                    border: '1px solid',
                                    borderColor: "black",
                                    borderRadius: 2 }}>
                            <svg height="35" viewBox="0 -960 960 960" width="35">
                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>
                        </Box>                       
                    </div> 
                </div>
                <div className="p-4 w-10%">
                    <Divider variant="middle" sx={{width:"80%"}} className="mt-10"></Divider>
                </div>
                <div>

                </div>
                <div className="flex p-3">
                    <div>
                        <div className="mt-7 mx-5">
                            <TextField label="Below Ceratin Range" id="filled-size-normal" defaultValue="35" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Each sqm." id="filled-size-normal" defaultValue="1" color="warning" variant="filled" />
                        </div>
                    </div>
                    <div>
                        <div className="mt-7 mx-5">
                            <TextField label="Base Price" id="filled-size-normal" defaultValue="₱ 1,500" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Add" id="filled-size-normal" defaultValue="₱ 28" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 p-4 w-10%">
                    <Divider variant="middle" sx={{width:"80%"}} className="mt-10"></Divider>
                </div>
                <div className="flex mx-8 p-3 pb-7 justify-end">
                    <div className="flex-1">
                        <FormControlLabel control={<Checkbox defaultChecked color="warning" />} label="Should include transport fee" />
                    </div>
                    <div className="flex mx-4">
                        <div className="mx-7">
                            <Button style={{
                                borderRadius: 4,
                                backgroundColor: "#EFA25D",
                                color: "midnightblue"
                            }}variant="contained">Reset</Button>
                        </div>
                        <div>
                            <Button style={{
                                borderRadius: 4,
                                backgroundColor: "midnightblue",
                                color: "#EFA25D"
                            }}variant="contained">Apply</Button>
                        </div>
                    </div>
                </div> */}
            </div>    
        </div>
    </section>
    )
}

const blue = {
    100: 'midnightblue',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
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
    900: '#1C2025',
  };

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