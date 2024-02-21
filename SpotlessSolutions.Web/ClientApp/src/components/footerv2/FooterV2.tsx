import { FiPhone } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { FaFacebookSquare } from 'react-icons/fa';

import './FooterV2.style.scss'

/**
 * Second iteraion of the footer
 */
export default function FooterV2() {
  return (
    <footer className="footerv2">
      <div className="footer-container">
        <div className="flex-footer-container">
          <FiPhone size={35} className="mr-4"/>
          <div>
            <p className="text-xs">Call To Find Out More</p>
            <p className="text-lg font-bold">0917 129 2231</p>
          </div>
        </div>

        <div className="flex-footer-container">
          <GrLocation size={35} className="mr-4"/>
          <div>
            <p className="text-xs">We Are Located At</p>
            <a
              href="https://www.google.com/maps/place/TopDown+Cleaning+Services/@10.7339092,122.5190795,17z/data=!4m14!1m7!3m6!1s0x33aefb2aa70edb59:0xca69faa1cdc2d92e!2sTopDown+Cleaning+Services!8m2!3d10.7339092!4d122.5216544!16s%2Fg%2F11shlk1sys!3m5!1s0x33aefb2aa70edb59:0xca69faa1cdc2d92e!8m2!3d10.7339092!4d122.5216544!16s%2Fg%2F11shlk1sys?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold cursor-pointer"
            >
              Iloilo City, Philippines
            </a>
          </div>
        </div>

        <div className="flex-footer-container">
          <a
            href="https://facebook.com/topdowncleaningilo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <FaFacebookSquare size={35} className="mr-4"/>
            <div>
              <p className="text-xs">Visit Our FB Page For More</p>
              <p className="text-lg font-bold">Facebook</p>
            </div>
          </a>
        </div>
      </div>
      <div>
        <p className="copyright">
          &copy; Topdown Cleaning Services
        </p>
      </div>
    </footer>
  )
}