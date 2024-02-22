import { TextField } from '@mui/material'
import ServicesManagementEdit from './sm-edit'
import ServicesManagementCheckbox from './sm-checkbox'

export default function CarInterior () {
  return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Car Interior Deep Cleaning</h2>
                            </div>
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}

                {/* Services Management */}

                <ServicesManagementEdit />

                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Hatchback/ Compact</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 250" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 2,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">Sedan</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 250" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 2,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">MPV</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 250" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 3,000" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">SUV</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 400" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 3,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">Pick-up</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 400" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 3,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">Van</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Carwash with Shampoo" id="filled-size-normal" defaultValue="₱ 500" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Interior Deep Cleaning" id="filled-size-normal" defaultValue="₱ 4,000" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>

                <ServicesManagementCheckbox />
            </div>
        </div>
    </section>
  )
}
