"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../components/magicui/animated-beam";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef(null);
  const refs = Array.from({ length: 7 }, () => useRef(null));

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={refs[0]}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={refs[4]}>
            <Icons.googleDocs />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={refs[1]}>
            <Icons.telegram />
          </Circle>
          <Circle ref={refs[3]} className="size-16">
            <Icons.openai />
          </Circle>
          <Circle ref={refs[5]}>
            <Icons.zapier />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={refs[2]}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={refs[6]}>
            <Icons.messenger />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[0]}
        toRef={refs[3]}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[1]}
        toRef={refs[3]}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[2]}
        toRef={refs[3]}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[4]}
        toRef={refs[3]}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[5]}
        toRef={refs[3]}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={refs[6]}
        toRef={refs[3]}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

const Icons = {
  telegram: () => (
    <a href="https://t.me/Nurbek_2255" aria-label="Telegram " target="_blank" rel="noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 256 256"
      >
        <path
          fill="#37aee2"
          d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        />
        <path
          fill="#c8daea"
          d="M66.89 123.723c29.358-12.951 48.922-21.404 58.692-25.358 27.95-11.364 33.794-13.238 37.64-13.302 0.835-0.014 2.695 0.194 3.905 1.184 1.008 0.829 1.288 1.941 1.423 2.725 0.135 0.785 0.31 2.565 0.175 3.955-1.573 16.314-8.409 56.055-11.872 74.407-1.471 7.833-4.372 10.47-7.181 10.744-6.104 0.563-10.742-4.019-16.667-7.896-9.246-6.038-14.462-9.788-23.333-15.569-10.348-6.846-3.635-10.613 2.261-16.802 1.555-1.619 28.525-26.146 29.066-28.377 0.065-0.262 0.123-1.233-0.464-1.741-0.586-0.507-1.45-0.334-2.075-0.194-0.892 0.193-15.059 9.577-42.498 28.152-4.025 2.816-7.673 4.184-10.944 4.096-3.603-0.097-10.552-2.039-15.732-3.716-6.344-2.02-11.391-3.088-10.951-6.478 0.226-1.747 2.635-3.537 7.315-5.365z"
        />
      </svg>
    </a>
  ),
  openai: () => <img src="/assets/nurbek-logo.svg" alt="logo" />,
  googleDrive: () => (
    <a
    href="https://www.instagram.com/nurbek.ldm"
    target="_blank"
    aria-label="Instagram"
    rel="noreferrer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      style={{ fill: "rgba(10, 10, 10, 0.88)" }}
    >
      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
      <circle cx="16.806" cy="7.207" r="1.078"></circle>
      <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
    </svg>
  </a>
  ),
  whatsapp: () => (
    <a href="https://github.com/NurbekLDM" aria-label="Github" target="_blank" rel="noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.6-4.04-1.6a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.08-.74.08-.74a2.54 2.54 0 0 1 1.85 1.24 2.6 2.6 0 0 0 3.57 1 2.62 2.62 0 0 1 .78-1.65c-2.67-.3-5.48-1.34-5.48-5.94a4.65 4.65 0 0 1 1.24-3.24 4.34 4.34 0 0 1 .12-3.19s1-.32 3.3 1.23a11.39 11.39 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23a4.34 4.34 0 0 1 .12 3.19 4.65 4.65 0 0 1 1.24 3.24c0 4.61-2.81 5.64-5.49 5.94a2.91 2.91 0 0 1 .83 2.26v3.35c0 .32.22.69.83.58A12 12 0 0 0 12 0z" />
      </svg>
    </a>
  ),
  googleDocs: () => (
    <a
      href="https://www.linkedin.com/in/nurbekldm"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="blue"
      >
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.3c0-1.26-.03-2.89-1.76-2.89-1.76 0-2.02 1.38-2.02 2.8v5.39h-3v-10h2.87v1.37h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.62 2.01 3.62 4.62v5.57z" />
      </svg>
    </a>
  ),
  zapier: () => (
    <a href="https://dev.to/nurbekldm" target="_blank" aria-label="Devto" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="black"
      >
        <path d="M7.73 6.52h-2.94a.8.8 0 0 0-.8.8v9.36c0 .44.36.8.8.8h2.93c2.26 0 3.46-1.21 3.46-3.6v-3.76c0-2.39-1.2-3.6-3.46-3.6Zm-.24 6.88c0 .96-.24 1.44-1.07 1.44h-.78V9.16h.78c.83 0 1.07.48 1.07 1.44v2.8Zm5.75 2.96h2.62c.79 0 1.47-.54 1.47-1.33v-8.17h-2.16v6.67h-.84v-6.67h-2.16v8.17c0 .79.68 1.33 1.47 1.33Zm9.06-12.36a1.07 1.07 0 0 0-.77-.32H2.46c-.3 0-.56.11-.77.32a1.1 1.1 0 0 0-.32.77v13.36c0 .3.11.56.32.77.2.2.47.32.77.32h19.28c.3 0 .56-.11.77-.32.2-.2.32-.47.32-.77V4.77c0-.3-.11-.56-.32-.77Zm-1.41 12.96h-2.22v-6.7h2.22v6.7Z"></path>
      </svg>
    </a>
  ),
  messenger: () => (
    <a href="https://www.reddit.com/user/Informal_Cream_7895/" aria-label="reddit" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: "rgba(236, 98, 20, 1)" }}
      >
        <circle cx="9.67" cy="13" r="1.001"></circle>
        <path d="M14.09 15.391A3.28 3.28 0 0 1 12 16a3.271 3.271 0 0 1-2.081-.63.27.27 0 0 0-.379.38c.71.535 1.582.809 2.471.77a3.811 3.811 0 0 0 2.469-.77v.04a.284.284 0 0 0 .006-.396.28.28 0 0 0-.396-.003zm.209-3.351a1 1 0 0 0 0 2l-.008.039c.016.002.033 0 .051 0a1 1 0 0 0 .958-1.038 1 1 0 0 0-1.001-1.001z"></path>
        <path d="M12 2C6.479 2 2 6.477 2 12c0 5.521 4.479 10 10 10s10-4.479 10-10c0-5.523-4.479-10-10-10zm5.859 11.33c.012.146.012.293 0 .439 0 2.24-2.609 4.062-5.83 4.062s-5.83-1.82-5.83-4.062a2.681 2.681 0 0 1 0-.439 1.46 1.46 0 0 1-.455-2.327 1.458 1.458 0 0 1 2.063-.063 7.145 7.145 0 0 1 3.899-1.23l.743-3.47v-.004A.313.313 0 0 1 12.82 6l2.449.49a1.001 1.001 0 1 1-.131.61L13 6.65l-.649 3.12a7.123 7.123 0 0 1 3.85 1.23 1.46 1.46 0 0 1 2.469 1c.01.563-.307 1.08-.811 1.33z"></path>
      </svg>
    </a>
  ),
};
