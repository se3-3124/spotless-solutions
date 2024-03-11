import { TextField } from '@mui/material'
import ServicesManagementEdit from './sm-edit'
import ServicesManagementCheckbox from './sm-checkbox'

export default function Aircon () {
  return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Aircon Cleaning</h2>
                            </div>
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}

                {/* Services Management */}

                <ServicesManagementEdit />

                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">0.75 and Below</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Window Type" id="filled-size-normal" defaultValue="₱ 599" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Blower Only)" id="filled-size-normal" defaultValue="N/A" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Full Cleaning)" id="filled-size-normal" defaultValue="N/A" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">1.0hp</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Window Type" id="filled-size-normal" defaultValue="₱ 699" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Blower Only)" id="filled-size-normal" defaultValue="₱ 999" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Full Cleaning)" id="filled-size-normal" defaultValue="₱ 1,299" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">1.5hp</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Window Type" id="filled-size-normal" defaultValue="₱ 799" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Blower Only)" id="filled-size-normal" defaultValue="₱ 1,199" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Full Cleaning)" id="filled-size-normal" defaultValue="₱ 1,499" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">2.0hp</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Window Type" id="filled-size-normal" defaultValue="₱ 899" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Blower Only)" id="filled-size-normal" defaultValue="₱ 1,399" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Full Cleaning)" id="filled-size-normal" defaultValue="₱ 1,699" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">2.5hp</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Window Type" id="filled-size-normal" defaultValue="₱ 999" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Blower Only)" id="filled-size-normal" defaultValue="₱ 1,599" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Split Type Aircon (Full Cleaning)" id="filled-size-normal" defaultValue="₱ 1,899" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>

                <ServicesManagementCheckbox />

            </div>
        </div>
    </section>
  )
}