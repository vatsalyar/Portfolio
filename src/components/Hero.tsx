import { hi } from "@/assets";
import { useEffect, useState } from "react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';


const Hero = () => {
  return (
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
