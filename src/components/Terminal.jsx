import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
  } from "../components/magicui/terminal";
  
  export function TerminalDemo() {
    return (
<Terminal className="sm:mt-24">
  <TypingAnimation>&gt; Aliqo'ziyev Nurbek</TypingAnimation>

  <AnimatedSpan delay={1500} className="text-green-500">
    <span>✔ From Namangan, Uzbekistan</span>
  </AnimatedSpan>

  <AnimatedSpan delay={2000} className="text-green-500">
    <span>✔ Born on December 3, 2005</span>
  </AnimatedSpan>

  <AnimatedSpan delay={2500} className="text-green-500">
    <span>✔ 2nd-year student at PDP University</span>
  </AnimatedSpan>

  <AnimatedSpan delay={3000} className="text-green-500">
    <span>✔ Software Development & Programming</span>
  </AnimatedSpan>

  <AnimatedSpan delay={3500} className="text-green-500">
    <span>✔ Frontend Developer</span>
  </AnimatedSpan>

  <AnimatedSpan delay={4000} className="text-green-500">
    <span>✔ Web Development, UI/UX Enthusiast</span>
  </AnimatedSpan>

  <AnimatedSpan delay={4500} className="text-green-500">
    <span>✔ Passionate about Problem Solving</span>
  </AnimatedSpan>

  <AnimatedSpan delay={5000} className="text-green-500">
    <span>✔ Enjoys building scalable & responsive UIs</span>
  </AnimatedSpan>

  <AnimatedSpan delay={5500} className="text-green-500">
    <span>✔ Open-source contributor</span>
  </AnimatedSpan>

  <AnimatedSpan delay={6000} className="text-green-500">
    <span>✔ Hobby: Playing football & online games</span>
  </AnimatedSpan>

  <TypingAnimation delay={6500} className="text-muted-foreground">
    Success! Profile initialized.
  </TypingAnimation>
</Terminal>

    );
  }
  