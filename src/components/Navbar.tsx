import { useEffect, useRef, useState } from "react";
import { menu, close } from "../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 100 ? setScrolled(true) : setScrolled(false);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "auto";
  }, [toggle]);
  

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      } text-white`}
    >
      <div className="px-6 flex justify-between w-full overflow-visible">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
            <p className={`text-4xl font-bold leading-normal pb-1 vatsalya-gradient-mobile`}>
                Vatsalya
            </p>
        </a>

        <ul className="list-none hidden sm:flex gap-4 md:gap-6 items-center">
          {["About", "Projects", "Experience", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="hover-glow-gradient px-3 py-1 transition-all duration-300 ease-in-out"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div ref={menuRef} className="sm:hidden flex justify-end items-center cursor-pointer">
        <img
            alt="menu"
            src={toggle ? close : menu}
            className="w-[28px] h-[28px] object-contain z-20"
            onClick={(e) => {
                e.stopPropagation();
                setToggle(!toggle);
            }}
        />
          <div
            className={`${
                !toggle ? "hidden" : "flex"
              } flex-col p-6 bg-gradient-to-b from-black/80 via-red-800/80 to-orange-700/80 
                backdrop-blur-md border border-white/10 
                absolute top-20 right-6 min-w-[160px] 
                z-10 rounded-xl shadow-2xl shadow-black/40 
                animate-fade-in-up transition-all duration-300`}
              
          >
            <ul className="list-none flex flex-col gap-4">
              {["About", "Projects", "Experience", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover-glow-gradient">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
