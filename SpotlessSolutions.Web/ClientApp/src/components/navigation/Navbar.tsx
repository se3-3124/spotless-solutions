import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import tdLogo from '../../assets/td_logo.jpg'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    if (menuOpen) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [prevScrollPos, visible])

  return (
    <>
       <nav
        className={`bg-[#05132F] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md rounded-b-md ${
          visible ? '' : 'transform -translate-y-full'
        } transition-transform duration-300 ease-in-out`}
      >
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
              className=" hover:text-white text-[#05132F] text-sm font-bold md:text-md flex items-center bg-[#ff8e2c] hover:bg-[#05132F] hover:bg-opacity-35 hover:border-white border border-transparent hover:border-1 px-4 py-2 md:px-6 rounded-lg transition-colors duration-500 ease-in-out"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className={`md:hidden text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center ${
                menuOpen ? 'order-1' : 'order-2'
              }`}
            >
              {menuOpen ? (<AiOutlineClose size={20} />) : (<AiOutlineMenu size={20} />)}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full h-screen md:h-10 md:flex md:w-auto md:order-1 ${
              menuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 divide-y divide-gray-600 text-center md:divide-y-0 md:border-b-0  font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#05132F] dark:bg-transparent md:md:bg-[#05132F] dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 md:hover:bg-transparent md:hover:text-[#EFA25D] md:p-0 dark:text-white hover:bg-gray-700"
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
