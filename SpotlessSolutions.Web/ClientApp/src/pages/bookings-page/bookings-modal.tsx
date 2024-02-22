import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'

export default function BookingsModal () {
  return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div>
                <label htmlFor="tw-modal" className="cursor-pointer rounded bg-black px-8 py-4 text-white active-slate-400">
                    CLEANING
                </label>
            </div>

            <input type="checkbox" id="tw-modal" className="peer fixed appearance-none opacity-0"/>

            <label htmlFor="tw-modal" className="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center justify-center
            overflow-hidden overscroll-contain bg-slate-700/30 opacity-0 transition-all duration-200 ease-in-out peer-checked:pointer-events-auto
            peer-checked:visible peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked:[&>*]:scale-100">
                <label className="max-h-[calc(100vh - 5em)] h-fit max-w-lg scale-90 overflow-y-auto overscroll-contain rounded-md bg-white p-6
                text-black shadow-2xl transition" htmlFor="">
                    <header className="px-2 py-3">
                        <div className="">
                            <div className="">
                                <span className="flex justify-between">
                                    <h2 className="text-lg font-bold">
                                        General Cleaning
                                    </h2>
                                    <svg height="24" viewBox="0 -960 960 960" width="24">
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                                    </svg>
                                </span>

                                    <span className="ml-3 py-3 text-gray-700">
                                        <p className="py-2">
                                            Name: <span className="ml-10">Joe Carl Doe</span>
                                        </p>
                                        <p className="py-2">
                                            Date: <span className="ml-12">January 24,2024</span>
                                        </p>
                                        <p className="py-2">
                                            Time: <span className="ml-12">10:00 am</span>
                                        </p>
                                        <p className="py-2">
                                            Status: <span className="ml-10">Approved</span>
                                        </p>
                                        <p className="py-2">
                                            Add on&apos;s: <span className="ml-5">Mattress and Carpet Cleaning</span>
                                        </p>
                                        <p className="mt-8">
                                            Total: <span className="ml-12">₱ 2,000.00</span>
                                        </p>
                                    </span>
                            </div>
                            <div>
                                <p className="mt-8">Send to: <span className="ml-8">joecarldoe@gmail.com</span>
                                </p>

                                <div><BaseTextareaAutosize aria-label="minimum height" minRows={3} placeholder="message" /></div>
                                <button className='flex px-4 py-2 text-sm font-medium text-white bg-midnightblue rounded-md'>
                                    Send
                                </button>
                            </div>
                        </div>
                    </header>
                    </label>
            </label>
        </div>
  )
}
