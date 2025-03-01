import { motion } from "framer-motion";
import HeroAnimation from "@/components/HeroAnimation";
import { AnimatedBeamDemo } from "@/components/AnimatedSocial";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Nurbek Aliqoziyev</title>
        <meta
          name="description"
          content="Nurbek Aliqoziyev — tajribali Full-stack dasturchi. React, Node.js, TypeScript va zamonaviy web texnologiyalar bo‘yicha ekspert."      />
        <meta
          name="keywords"
          content="Nurbek Aliqoziyev, Full-stack Developer, React, Node.js, TypeScript, Web Developer, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Development, Programming, UI/UX, API Development, SEO, Next.js, Express.js, PostgreSQL"
        />
        <meta name="author" content="Nurbek Aliqoziyev" />
      </Head>
    <div className="h-screen text-center  sm:mt-10">
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              <HeroAnimation />
            </h1>
          </div>
          <motion.div
            className="flex justify-center items-center lg:mt-0 lg:row-span-5 mb-24 pb-12 col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="assets/hero-img.jpeg"
              alt="mockup"
              className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        </div>

<div className="sm:hidden relative">
    <AnimatedBeamDemo />
</div>
      </section>
    </div>
    </div>
  );
};

export default Home;