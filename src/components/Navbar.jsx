import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRocket } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="bg-gray-100 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center px-6">
        <div className="w-1/4 text-gray-700 text-2xl flex justify-start">
          <FaRocket />
        </div>
        <div className="w-1/2 text-center">
          <h1 className="text-gray-800 text-2xl font-bold">
            Rick & Morty
          </h1>
        </div>
        <div className="w-1/4 flex justify-end">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-gray-600 hover:text-black transition duration-200 ${isActive ? 'underline underline-offset-4 font-semibold text-black' : ''
                  }`
                }
              >
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/epsido"
                className={({ isActive }) =>
                  `text-gray-600 hover:text-black transition duration-200 ${isActive ? 'underline underline-offset-4 font-semibold text-black' : ''
                  }`
                }
              >
                Episodes & Locations
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
