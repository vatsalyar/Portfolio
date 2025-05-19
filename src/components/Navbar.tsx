import { useEffect, useRef, useState } from "react";
import { menu, close, logo } from "../assets";

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
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md bg-whie/30 rounded-xl p-6 shadow-lg`}
    >
      <div className="px-6 flex justify-between w-full overflow-visible">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
            <img src={logo} alt="logo" className="animate-fade-in-left w-20 h-12"/> 
        </a>

      <nav className="group/navigation-menu max-w-max flex-1 items-center justify-center absolute top-1/2 left-1/2 hidden w-fit -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-md md:flex">
        <div className="relative">
          <ul className="group flex-1 list-none items-center justify-center gap-1 relative hidden rounded-full border border-white/10 bg-white/5 px-1.5 py-1 md:flex">
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
        </div>
      </nav>
        

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
              } flex-col p-6  bg-black/80
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
