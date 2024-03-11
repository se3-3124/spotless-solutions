import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'

export default function SampleDrawer () {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <div className='md:flex'>
      <Button onClick={toggleDrawer}>Open drawer</Button>
      <Drawer hideBackdrop open={open} anchor="right" onClose={toggleDrawer}>
        <div style={{ width: 450 }} role="presentation" onClick={toggleDrawer}>
          <div className='p-10'>
            <h1 className='text-3xl mb-16 font-bold'>Checkout Details</h1>
            <div className='flex'>
              <h1 className='text-xl font-bold mr-28'>Main Service Name</h1>
              <span className='text-xl font-bold'>₱ 1,999</span>
            </div>
            <div className='flex ml-5 mt-3'>
              <h1 className='text-lg font-semibold mr-48'>Area</h1>
              <span className='text-lg font-semibold ml-1.5'>80 sq. meters</span>
            </div>
          </div>
          <div className='mt-96 p-10'>
            <div className='flex'>
              <h1 className='text-lg font-semibold mr-40'>Grand Total</h1>
              <span className='text-3xl font-bold ml-2.5'>₱ 1,999</span>
            </div>
            <div className='flex mt-1'>
              <h1 className='text-lg font-semibold mr-32'>20% Downpayment</h1>
              <span className='text-xl font-bold ml-2.5'>₱ 1,999</span>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button className='relative py-2 px-8 w-80 text-black text-base font-bold nded-full overflow-hidden bg-yellow-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-600 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'>
              Book Now
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
