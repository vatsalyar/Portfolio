import { hi } from "@/assets";
import { useEffect, useState } from "react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';


const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect (() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll);

    return () => { window.removeEventListener("scroll", handleScroll)}
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center mx-auto z-20 -top-20 sm:top-0 overflow-hidden">
        <div className="absolute w-full  inset-0 max-w-7xl sm:px-16 px-6 flex flex-col sm:flex-row sm:self-start sm:items-center gap-5 sm:mt-[120px] mx-auto justify-center sm:mb-175 mt-auto ">
            <div className="flex flex-col justify-center items-center">
            <img 
                alt="avatar"
                src={hi}
                className="w-[150px] h-[150px] rounded-full object-cover animate-hello-wave"
            />
            </div>
            <div className=" bg-glass p-5 rounded-xl mx-auto sm:mx-0">
              <h1 className=" py-5 text-5xl text-white font-garamond">
                  Hi, I'm <span className="gradient-sunset"><TypingText text="Vatsalya" /></span>
              </h1>
            </div>
            <div className="sm:hidden"><Statement /></div>
            <div className="sm:hidden mx-auto">
              <div className=" flex gap-2">
                <LiveButton /> 
                <a
                  href="mailto:vatsalyarastogi04@gmail.com"
                  className="
                    group
                    flex items-center gap-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    px-4 py-2
                    text-xs
                    font-semibold
                    transition-all duration-500 ease-in-out
                    hover:bg-white hover:text-black hover:shadow-lg hover:scale-105
                    ring-1 ring-white/20 hover:ring-black/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  "
                >
                  <span>Let's Connect</span>
                  <span
                    className="
                      flex items-center justify-center
                      rounded-full
                      bg-white text-black
                      p-1
                      transition-all duration-300
                      "
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        {!scrolled && (<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 ">
            <a href="#About">
            <ChevronDoubleDownIcon className="w-8 h-8 text-white animate-bounce cursor-pointer" />
            </a>
        </div>
        )}
        <div className="hidden sm:flex absolute sm:top-1/3 flex-col items-center justify-center gap-4">
          <div className=" lg:mx-7 md:mx-5 "><Statement /></div>
          <div className="flex gap-4">
            <LiveButton />
            <a
                  href="https://linkedin.com/in/vatsalya-rastogi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex items-center gap-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    px-4 py-2
                    text-xs
                    font-semibold
                    transition-all duration-500 ease-in-out
                    hover:bg-white hover:text-black hover:shadow-lg hover:scale-105
                    ring-1 ring-white/20 hover:ring-black/30
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  "
                >
                  <span>Let's Connect</span>
                  <span
                    className="
                      flex items-center justify-center
                      rounded-full
                      bg-white text-black
                      p-1
                      transition-all duration-300
                      "
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
        </div>
      </section>
  );
};

const Statement = () => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative left-1/2 transform -translate-x-1/2 z-30 text-center px-4"
    >
      <div className="text-xl py-4 sm:text-2xl md:text-3xl font-bold drop-shadow-lg">
        <span className="py-px my-2 w-full text-center font-semibold text-balance opacity-90 md:text-3xl lg:text-4xl text-zinc-100 ">I design AI-powered web apps and engineer scalable cloud systems that are <span className="font-dancing animated-sunset leading-relaxed px-2 text-3xl md:text-5xl lg:text-6xl">fast, reliable, and production-ready.</span></span>
      </div>
    </motion.div>
  </>
)

const LiveButton = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://reactutor.vatsalya.wiki"
    className="group backdrop-blur-md bg-white/10 rounded-full text-white flex p-2 gap-2 items-center hover:border text-xs font-bold transition-all ease-in-out w-fit"
  >
    <div className="bg-blue-500 rounded-full px-2 py-0.5 text-white text-[10px] font-semibold">
      New
    </div>
    <span className="flex items-center gap-1 light-sweep">
      Reactutor is live!
    </span>
    <span className="transform transition-transform duration-150 group-hover:translate-x-1">
        <FontAwesomeIcon icon={faArrowRight} />
    </span>
  </a>
);

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
    <span className="font-garamond">
      {displayedText}
      <span className="animate-blink gradient-sunset inline-block w-[1ch]">|</span>
    </span>
  );
};


export default Hero;
