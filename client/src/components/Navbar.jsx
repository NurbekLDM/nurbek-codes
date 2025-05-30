import React from "react";
import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div>
            <nav className="py-5 lg:fixed transition-all  top-0 left-0 z-50 duration-500 w-full bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="w-full flex flex-col lg:flex-row">
                        <div className="flex justify-between lg:flex-row">
                            <p className="flex hover:cursor-pointer items-center">
                                <Link href='/'>
                                <img
                                    className="w-22 h-14"
                                    src="assets/nurbek.svg"
                                    alt="Description"
                                />
                                </Link>
                            </p>
                            <button
                                type="button"
                                className="inline-flex hover:cursor-pointer items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:block lg:hidden  "
                                onClick={toggleNavbar}
                                aria-controls="navbar-default"
                                aria-expanded={isNavOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div
                            className={`${isNavOpen ? "block" : "hidden"
                                } w-full lg:flex  z-20 lg:pl-11 max-lg:mt-1 max-lg:h-content max-lg:overflow-y-auto`}
                            id="navbar"
                        >
                            <ul className="flex gap-10 lg:items-center lg:justify-center flex-col max-lg:gap-6 max-lg:pt-4 max-lg:mb-4 lg:mt-0 lg:flex-row lg:mx-auto">
                        
                                <li onClick={()=> setIsNavOpen(false)}>
                                    <Link href="/about" className="nav-link hover:cursor-pointer mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900">
                                        About me
                                    </Link>
                                </li>
                                <li onClick={()=> setIsNavOpen(false)}>
                                    <Link href="/projects" className="nav-link hover:cursor-pointer mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900">
                                        Projects
                                    </Link>
                                </li>
                                <li onClick={()=> setIsNavOpen(false)}>
                                    <Link href="/features" className="nav-link hover:cursor-pointer mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900">
                                        Features
                                    </Link>
                                </li>
                                <li onClick={()=> setIsNavOpen(false)}>
                                    <Link href="/blog" className="nav-link hover:cursor-pointer mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
