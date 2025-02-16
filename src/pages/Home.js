"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeroSection;
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("../components/Navbar");
var HeroAnimation_1 = require("../components/HeroAnimation");
var retro_grid_1 = require("../components/magicui/retro-grid");
function HeroSection() {
    var location = (0, react_router_dom_1.useLocation)();
    var isHome = location.pathname === '/';
    return (<div className='max-h-screen overflow-hidden'>
      <Navbar_1.default />

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
 
      <retro_grid_1.RetroGrid />
    </div>

   {isHome &&
            <section className="bg-white mt-16">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                <HeroAnimation_1.default />
            </h1>
        </div>
        <div className="hidden lg:mt-0 lg:row-span-5 mb-24 pb-12 lg:col-span-5 lg:flex">
            <img src="assets/hero-img.jpeg" alt="mockup"/>
        </div>                
    </div>
        </section>}  
    <react_router_dom_1.Outlet />
    </div>);
}
