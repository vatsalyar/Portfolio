import { hi } from "@/assets";
import { useEffect, useState } from "react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';


const Hero = () => {
  return (
    <>
    <section className="relative w-full h-full min-h-screen flex items-center justify-center mx-auto">
        <div className="absolute w-full inset-0 max-w-7xl sm:px-16 px-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:mt-[120px] mx-auto justify-center sm:mb-175 mt-auto ">
            <div className="flex flex-col justify-center items-center">
            <img 
                alt="hi"
                src={hi}
                className="w-[150px] h-[150px] rounded-full object-cover"
            />
            </div>
            <div className="bg-glass p-5 rounded-xl">
            <h1 className="mt-5 mb-5 text-5xl text-white font-garamond">
                Hi, I'm <span className="gradient-sunset"><TypingText text="Vatsalya" /></span>
            </h1>
            </div>
        </div>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ">
            <a href="#About">
            <ChevronDoubleDownIcon className="w-8 h-8 text-white animate-bounce cursor-pointer" />
            </a>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-25">
        <svg
          className="w-full h-[100px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
          <linearGradient id="heroFade" x1="1" y1="1" x2="0" y2="1">
            <stop offset="0%" stopColor="#770a04" />
            <stop offset="50%" stopColor="#9b3107" />
            <stop offset="65%" stopColor="#000000" />
          </linearGradient>

          </defs>
          <path
            fill="url(#heroFade)"
            d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,197.3C672,181,768,139,864,106.7C960,75,1056,53,1152,74.7C1248,96,1344,160,1392,192L1440,224V0H0Z"
          />
        </svg>
      </div>
    </>
  );
};

interface TypingTextProps {
  text: string;
  speed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="text-5xl font-garamond">
      {displayedText}
      <span className="animate-blink gradient-sunset">|</span>
    </span>
  );
};

export default Hero;
