import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import tdLogo from '../../assets/td_logo.jpg'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <nav className="bg-[#05132F] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md rounded-b-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={tdLogo} className="h-8" alt="TCS Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TopDown
            </span>
          </a>
          <div
            className={`flex ${
              menuOpen ? 'justify-start' : 'justify-end'
            } md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}
          >
            <button
              type="button"
              className=" text-white focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center bg-[#ff8e2c] hover:bg-opacity-70 transition-colors duration-300 ease-in-out"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className={`md:hidden text-white focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center ${
                menuOpen ? 'order-1' : 'order-2'
              }`}
            >
              {menuOpen ? (<AiOutlineClose size={20} />) : (<AiOutlineMenu size={20} />)}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? 'block' : 'hidden'
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#05132F] dark:bg-gray-800 md:md:bg-[#05132F] dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-[#EFA25D] md:p-0 dark:text-white hover:bg-gray-700"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-[#EFA25D] md:p-0 dark:text-white hover:bg-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-[#EFA25D] md:p-0 dark:text-white hover:bg-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-[#EFA25D] md:p-0 dark:text-white hover:bg-gray-700"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
