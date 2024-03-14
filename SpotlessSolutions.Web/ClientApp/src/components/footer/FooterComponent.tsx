import { FaTiktok, FaFacebook } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLocationSharp } from 'react-icons/io5'
import { MdPhone, MdEmail } from 'react-icons/md'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#05132F] text-gray-300 py-6">
      <div className="flex flex-col justify-between md:flex-row px-10">
        {/* 1st Section */}
        <div className="mb-10 md:mb-4 flex flex-col items-center">
          <p className="text-white font-bold text-xl sm:text-2xl mb-2">
            TopDown Cleaning Services
          </p>
          <p className="font-kaushan">for Ilonggos, by Ilonggos</p>
          <div className="flex mt-4">
            <a href="#" className="mr-4">
              <FaTiktok className="h-6 w-6" />
            </a>
            <a href="#" className="mr-4">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="mr-4">
              <AiFillInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* 2nd Section */}
        <div className="mb-6 md:mb-4 flex flex-col items-center md:mr-10">
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg mb-2 text-white">Contact Us</p>
            <div className="flex items-center mb-2">
              <MdEmail className="h-4 w-4 mr-2" />
              <span>topdowncleaning@gmail.com</span>
            </div>
            <div className="flex items-center mb-2">
              <MdPhone className="h-4 w-4 mr-2" />
              <span>0917 129 2231</span>
            </div>
            <div className="flex items-center">
              <IoLocationSharp className="h-4 w-4 mr-2" />
              <a
                href="https://www.google.com/maps/place/TopDown+Cleaning+Services/@10.7339092,122.5190795,17z/data=!4m14!1m7!3m6!1s0x33aefb2aa70edb59:0xca69faa1cdc2d92e!2sTopDown+Cleaning+Services!8m2!3d10.7339092!4d122.5216544!16s%2Fg%2F11shlk1sys!3m5!1s0x33aefb2aa70edb59:0xca69faa1cdc2d92e!8m2!3d10.7339092!4d122.5216544!16s%2Fg%2F11shlk1sys?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Location Address
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 my-2 mx-10 mb-6" />
      <p className="text-center">
        © {currentYear} TOPDOWN Services. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
