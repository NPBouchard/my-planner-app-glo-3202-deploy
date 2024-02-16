"use client"
import Link from 'next/link';
import React, {useState} from 'react';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-blue-500 text-white body-font shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" legacyBehavior>
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-3 text-xl">Event Planner</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" legacyBehavior>
            <a className="mr-5 hover:text-gray-900">Home</a>
          </Link>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="mr-5 hover:text-gray-900 focus:outline-none">
              About
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link href="/pages/about/team" legacyBehavior>
                  <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">Our Team</a>
                </Link>
                <Link href="/pages/about/history" legacyBehavior>
                  <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">Our History</a>
                </Link>
                {/* Add more dropdown links as needed */}
              </div>
            )}
          </div>
          <Link href="/pages/events/create" legacyBehavior>
            <a className="mr-5 hover:text-gray-900">Create Event</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
