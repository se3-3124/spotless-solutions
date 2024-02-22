import { TextField } from "@mui/material"
import ServicesManagementEdit from "./sm-edit";
import ServicesManagementCheckbox from "./sm-checkbox";

export default function MattressDeep() {
    return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Mattress Deep Cleaning</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}
                

                {/* Services Management */}
                
                <ServicesManagementEdit />
                
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Single</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Inches" id="filled-size-normal" defaultValue="30" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Price" id="filled-size-normal" defaultValue="₱ 1,200" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Semi-Double</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Inches" id="filled-size-normal" defaultValue="48" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Price" id="filled-size-normal" defaultValue="₱ 1,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Double</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Inches" id="filled-size-normal" defaultValue="54" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Price" id="filled-size-normal" defaultValue="₱ 2,000" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">Queen</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Inches" id="filled-size-normal" defaultValue="60" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Price" id="filled-size-normal" defaultValue="₱ 2,000" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>
                <h5 className="ml-8 -mb-6 font-semibold text-midnightblue">King Size</h5>
                <div className="flex p-3">
                    <div className="flex">
                        <div className="mt-7 mx-5">
                            <TextField label="Inches" id="filled-size-normal" defaultValue="72" color="warning" variant="filled" />
                        </div>
                        <div className="mt-7 mx-5">
                            <TextField label="Price" id="filled-size-normal" defaultValue="₱ 2,500" color="warning" variant="filled" />
                        </div>
                    </div>
                </div>

                <ServicesManagementCheckbox />

            </div>    
        </div>
    </section>
    )
}