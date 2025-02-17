import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Lottie without server-side rendering
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const rectangles = [
  { id: 1, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 1", description: "Description for skill 1" },
  { id: 2, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 2", description: "Description for skill 2" },
  { id: 3, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 3", description: "Description for skill 3" },
  { id: 4, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 4", description: "Description for skill 4" },
  { id: 5, lottieUrl: "https://res.cloudinary.com/dl2adjye7/raw/upload/v1716532587/stack_zrrg4m.json", title: "Skill 5", description: "Description for skill 5" },
];

const NotifTemplate = ({ lottieUrl, title, description }) => {
  const [animationData, setAnimationData] = useState(null);
  const [isStopped, setIsStopped] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch(lottieUrl);
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, [lottieUrl]);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="flex items-center p-4 bg-white shadow-lg rounded-lg w-[300px] sm:w-[400px] h-[100px] border"
      onMouseEnter={() => {
        setIsStopped(false);
        setIsPaused(false);
      }}
      onMouseLeave={() => {
        setIsStopped(true);
        setIsPaused(true);
      }}
    >
      <div className="w-16 h-16 mr-4">
        <Lottie options={defaultOptions} height={64} width={64} isStopped={isStopped} isPaused={isPaused} />
      </div>
      <div className="flex flex-col justify-start">
        <h3 className="text-lg font-bold text-left">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const CardPilling = ({ loop = true }) => {
  const [visibleRectangles, setVisibleRectangles] = useState([]);
  const [triggerExit, setTriggerExit] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const rectRef = useRef(null);
  const [rectHeight, setRectHeight] = useState(0);
  const margin = 20;

  useEffect(() => {
    if (rectRef.current) {
      setRectHeight(rectRef.current.offsetHeight + margin);
    }
  }, [rectRef.current]);

  useEffect(() => {
    if (!triggerExit) {
      const interval = setInterval(() => {
        setVisibleRectangles((prev) => {
          if (prev.length < rectangles.length) {
            return [rectangles[prev.length], ...prev];
          } else {
            clearInterval(interval);
            setTimeout(() => setTriggerExit(true), 1500);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (loop) {
      setTimeout(() => {
        setTriggerExit(false);
        setVisibleRectangles([]);
        setLoopCount(loopCount + 1);
      }, 3000);
    }
  }, [triggerExit, loop, loopCount]);

  return (
    <div className="relative flex items-start justify-center pt-10 h-[700px]">
      <AnimatePresence>
        {!triggerExit &&
          visibleRectangles.map((rect, index) => (
            <motion.div
              key={rect.id}
              ref={index === 0 ? rectRef : null}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: index * rectHeight }}
              exit={{ opacity: 0, y: 50 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute mb-5 w-[300px] sm:w-[400px] h-[100px]"
            >
              <NotifTemplate {...rect} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

const Skills = () => {
  return (

      <div className="h-screen mt-24 text-center">
        <CardPilling />
      </div>

  );
};

export default Skills;