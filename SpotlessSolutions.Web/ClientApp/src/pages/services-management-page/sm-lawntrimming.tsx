import { TextField } from "@mui/material"
import ServicesManagementEdit from "./sm-edit";
import ServicesManagementCheckbox from "./sm-checkbox";

export default function LawnTrimming() {
    return (
    <section>
        <div className="h-screen flex">
            <div className="flex-1 min-w-0 bg-white">
                {/* Service Name */}
                <div className="border-b-2 font-semibold border-gray-200">
                    <header className='px-6'>
                        <div className='flex items-center jusitfy-between py-2'>
                            <div className='flex-1'>
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Lawn Trimming</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                {/* Services Management Side Bar */}

                {/* Services Management */}
                
                <ServicesManagementEdit />
                
                <ServicesManagementCheckbox />

            </div>    
        </div>
    </section>
    )
}