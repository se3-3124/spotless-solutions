import { TextField } from "@mui/material"
import ServicesManagementEdit from "./sm-edit";
import ServicesManagementCheckbox from "./sm-checkbox";

export default function DeepCleaning() {
    return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Deep Cleaning</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}


                {/* Services Management */}

                <ServicesManagementEdit />
                
                <div className="flex p-3">
                    <div>
                        <div className="mt-7 mx-5">
                            <TextField label="Below Certain Range" id="filled-size-normal" defaultValue="35" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Each sqm." id="filled-size-normal" defaultValue="1" color="warning" variant="filled" />
                        </div>
                    </div>
                    <div>
                        <div className="mt-7 mx-5">
                            <TextField label="Base Price" id="filled-size-normal" defaultValue="₱ 999" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Add" id="filled-size-normal" defaultValue="₱ 28" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>

                <ServicesManagementCheckbox />
                
            </div>   
        </div>
    </section>
    )
}