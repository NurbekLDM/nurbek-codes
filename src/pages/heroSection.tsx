export default function HeroSection() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="py-5 lg:fixed transition-all top-0 left-0 z-50 duration-500 w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="flex justify-between lg:flex-row">
              <a href="/" className="flex items-center">
              <img className="w-22 h-14" src="/nurbek.svg" alt="Description" />
              </a>
              <button
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:block lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              className={`${
                isNavOpen ? "block" : "hidden"
              } w-full lg:flex lg:pl-11 max-lg:mt-1 max-lg:h-content max-lg:overflow-y-auto`}
              id="navbar"
            >
              <ul className="flex gap-10 lg:items-center lg:justify-center flex-col max-lg:gap-6 max-lg:pt-4 max-lg:mb-4 lg:mt-0 lg:flex-row lg:mx-auto">
                <li>
                  <a
                    href="#"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900"
                  >
                    About me
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-500 font-medium transition-all duration-500 hover:text-gray-900"
                  >
                    Features
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

{/* Section qism */}
      <section className="relative py-14 lg:pt-44 lg:pb-32 bg-gray-100">
        <div className="w-screen max-w-7xl mx-auto px-4 lg:px-8">
          <div className="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-20">
            <h1 className="font-manrope font-bold text-4xl leading-snug sm:text-5xl text-center mb-5 text-black">
              Full-Stack Web Developer 
            </h1>
            <p className="text-xxl font-medium leading-8 text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Remember, the code is your house and you should live within it.
            </p>
            <div className="parent flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full mb-5 relative group transition-all duration-500 border border-transparent hover:border-indigo-600 focus-within:border-indigo-600">
             
             <form>
              <input
                type="email"
                className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
                placeholder="What’s your work email?"
                required
              />
              <button type="submit" className="py-3 px-6 max-sm:w-full  rounded-full bg-indigo-600 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 sm:absolute top-1.5 right-3">
                Get Started
              </button>
              </form>
            </div>
          </div>
        </div>

<div className="mx-auto">
  <form>
        <div className="mb-6">
<label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Message <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
 </svg>
</label>
<div className="flex">
 <div className="relative w-full">
   <textarea required className="block w-6/12 h-40 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none" placeholder="Write a message..."></textarea>
 </div>
</div>
</div>
<button className="w-1/4  h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">Send Message</button>
</form>
</div>

      </section>
      
    </div>
  );
}
