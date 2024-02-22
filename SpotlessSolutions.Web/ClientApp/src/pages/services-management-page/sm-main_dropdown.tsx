import React, { useState } from 'react';
import './sm-dropdown.styles.scss';


const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('Main');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
 
    <div className="relative inline-block text-right text-xs start-10 top-3.5">
      <div>
      <fieldset className="border border-solid rounded-md border-black p-2">
      <legend className="text-md">type</legend>
        <button
          type="button"
          className="text-black bg-transparent font-medium text-base px-16 justify-end inline-flex items-center dark:bg-transparent" 
          onClick={toggleDropdown}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="true"
        >
          {selectedItem}
          <svg
            className="-mr-6 ml-2 h-5 w-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="2 0 0.1 20"
            fill="currentColor"
            aria-hidden="true"    
          >
            <path
              fillRule="evenodd"
              d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        </fieldset>
      </div>

      {/* Dropdown menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="origin-top-center absolute right-0 left-1 my-2 w-50
         rounded-md bg-amber-600 shadow-lg text-xs ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-menu">
          <div className="py-1 px-6" role="none">         
            <fieldset className="border border-solid bg-white border-black mt-1 p-1">
              <div className="absolute py-1 right-6 ">
                <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 14.707l9-9a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414zm1.414 1.414l-2 2a1 1 0 1 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414zm10.164-9.74c-.195-.195-.451-.293-.707-.293s-.512.098-.707.293l-9 9a1 1 0 0 0-.237.328l-1 3a1 1 0 0 0 .276 1.035A1.015 1.015 0 0 0 4 20c.256 0 .512-.098.707-.293l3-3a1 1 0 0 0 .328-.237l9-9a1 1 0 0 0 0-1.414zm-1.464 2.122l-9 9-2.586-2.586 9-9 2.586 2.586z"/>
                </svg>
              </div>
              <button
                className="w-full text-left px-2 py-1 text-xs w-30 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">
                  Deep Cleaning
              </button>
            </fieldset>
            <fieldset className="border border-solid bg-white border-black mt-1 p-1">
              <div className="absolute py-1 right-6 ">
                  <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 14.707l9-9a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414zm1.414 1.414l-2 2a1 1 0 1 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414zm10.164-9.74c-.195-.195-.451-.293-.707-.293s-.512.098-.707.293l-9 9a1 1 0 0 0-.237.328l-1 3a1 1 0 0 0 .276 1.035A1.015 1.015 0 0 0 4 20c.256 0 .512-.098.707-.293l3-3a1 1 0 0 0 .328-.237l9-9a1 1 0 0 0 0-1.414zm-1.464 2.122l-9 9-2.586-2.586 9-9 2.586 2.586z"/>
                  </svg>
                </div>
              <button
                className="w-full text-left px-2 py-1 text-xs w-70 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">
                  Post Con Cleaning
              </button>
            </fieldset>
            <fieldset className="border border-solid bg-white border-black mt-1 p-1">
              <div className="absolute py-1 right-6 ">
                  <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 14.707l9-9a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414zm1.414 1.414l-2 2a1 1 0 1 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414zm10.164-9.74c-.195-.195-.451-.293-.707-.293s-.512.098-.707.293l-9 9a1 1 0 0 0-.237.328l-1 3a1 1 0 0 0 .276 1.035A1.015 1.015 0 0 0 4 20c.256 0 .512-.098.707-.293l3-3a1 1 0 0 0 .328-.237l9-9a1 1 0 0 0 0-1.414zm-1.464 2.122l-9 9-2.586-2.586 9-9 2.586 2.586z"/>
                  </svg>
                </div>
              <button
                className="w-full text-left px-2 py-1 text-xs w-70 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">
                  Routine Cleaning
              </button>
            </fieldset>
            <fieldset className="border border-solid bg-white border-black mb-1 mt-1 p-1">
            <div className="absolute py-1 right-6 ">
                <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 14.707l9-9a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414zm1.414 1.414l-2 2a1 1 0 1 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414zm10.164-9.74c-.195-.195-.451-.293-.707-.293s-.512.098-.707.293l-9 9a1 1 0 0 0-.237.328l-1 3a1 1 0 0 0 .276 1.035A1.015 1.015 0 0 0 4 20c.256 0 .512-.098.707-.293l3-3a1 1 0 0 0 .328-.237l9-9a1 1 0 0 0 0-1.414zm-1.464 2.122l-9 9-2.586-2.586 9-9 2.586 2.586z"/>
                </svg>
              </div>
              <button
                className="w-full text-left px-2 py-1 text-xs w-70 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">
                  General Cleaning
              </button>
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
