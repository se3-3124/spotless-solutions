import { TextField } from "@mui/material"
import ServicesManagementEdit from "./sm-edit";
import ServicesManagementCheckbox from "./sm-checkbox";

export default function RoutineCleaning() {
    return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Routine Cleaning</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}

                {/* Services Management */}
                
                <ServicesManagementEdit />
                
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Weekly</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Below Ceratin Range" id="filled-size-normal" defaultValue="35" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Base Price" id="filled-size-normal" defaultValue="₱ 550" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Per sqm." id="filled-size-normal" defaultValue="25" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">Bi-Monthly</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Below Ceratin Range" id="filled-size-normal" defaultValue="35" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Base Price" id="filled-size-normal" defaultValue="₱ 650" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Per sqm." id="filled-size-normal" defaultValue="25" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 mt-4 font-semibold text-midnightblue">Monthly</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Below Ceratin Range" id="filled-size-normal" defaultValue="35" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Base Price" id="filled-size-normal" defaultValue="₱ 800" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Per sqm." id="filled-size-normal" defaultValue="25" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                
                <ServicesManagementCheckbox />

            </div>    
        </div>
    </section>
    )
}