import './bookings.css'
import tdLogo from '../../assets/td_logo.jpg';

export default function Bookings() {
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
                                <h2 className='text-2xl font-semibold text-grey-900 leading-tight'>Bookings</h2>
                            </div>                       
                        </div>
                    </header>
                </div>

                <div className='flex mx-5 mt-5 justify-end'>
                <button className='flex ml-2 pl-2 px-4 py-2 text-sm font-medium text-white bg-midnightblue rounded-md'>
                    <svg className='h-5 w-5 fill-white' height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                    <span className='ml-1'>Delete</span>
                </button>
                </div>
                <div>
                    <main className='p-3 flex'>
                        {/* To be Approved */}
                        <div className='p-3 w-80 bg-gray-200 rounded-md'>
                            <h3 className='text-sm font-medium text-gray-900'>To be Approved</h3>
                            <ul className='mt-2'>
                                <li>
                                    <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Request for Clarification */}
                        <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                            <h3 className='text-sm font-medium text-gray-900'>To be Approved</h3>
                            <ul className='mt-2'>
                                <li>
                                    <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Approved */}
                        <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                            <h3 className='text-sm font-medium text-gray-900'>To be Approved</h3>
                            <ul className='mt-2'>
                                <li>
                                    <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Rejected */}
                        <div className='ml-2 p-3 w-80 bg-gray-200 rounded-md'>
                            <h3 className='text-sm font-medium text-gray-900'>To be Approved</h3>
                            <ul className='mt-2'>
                                <li>
                                    <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>

                                <li className='mt-3'>
                                <a href="#" className='block p-5 bg-white rounded-md shadow'>
                                        {/* <div className='flex justify-between'> */}
                                        <div>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Post Cleaning
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                January 24,2024
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                10:00 am
                                            </p>
                                            <p className='text-sm font-medium leading-snug text-gray-900'>
                                                Total: ₱ 2,000.00
                                            </p>                                           
                                        </div>                                       
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>    
        </div>
    </section>
    )
}