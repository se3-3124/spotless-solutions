import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bottom-0 w-screen font-sans">
      <div className="bg-[#05132F] text-white p-10 flex flex-col md:flex-row justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <FiPhone size={35} className="mr-4" />
          <div>
            <p className="text-xs">Call To Find Out More</p>
            <p className="text-lg font-bold">0917 129 2231</p>
          </div>
        </div>

        <div className="flex items-center mb-4 md:mb-0">
          <GrLocation size={35} className="mr-4" />
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

        <div className="flex items-center mb-4 md:mb-0">
          <a
            href="https://facebook.com/topdowncleaningilo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <FaFacebookSquare size={35} className="mr-4" />
            <div>
              <p className="text-xs">Visit Our FB Page For More</p>
              <p className="text-lg font-bold">Facebook</p>
            </div>
          </a>
        </div>
      </div>
      <div>
        <p className="flex justify-center text-sm md:flex text-white bg-[#05132F] py-4 border-t-2">
          Copyright Topdown Cleaning Services
        </p>
      </div>
    </footer>
  );
}

export default Footer;
