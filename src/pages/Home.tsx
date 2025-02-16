import {Outlet, useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroAnimation from '../components/HeroAnimation';
import { RetroGrid } from "../components/magicui/retro-grid";
export default function HeroSection() {

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className='max-h-screen overflow-hidden'>
      <Navbar />

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
 
      <RetroGrid />
    </div>

   { isHome &&

        <section className="bg-white mt-16">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                <HeroAnimation />
            </h1>
        </div>
        <div className="hidden lg:mt-0 lg:row-span-5 mb-24 pb-12 lg:col-span-5 lg:flex">
            <img src="assets/hero-img.jpeg" alt="mockup" />
        </div>                
    </div>
        </section>
    }  
    <Outlet />
    </div>
  );
}
