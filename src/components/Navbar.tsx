import { useEffect, useRef, useState } from "react";
import { menu, close, logo } from "../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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
    <nav className={`w-full fixed top-0 z-50 py-4 px-6 backdrop-blur-md bg-transparent shadow-lg transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="flex items-center justify-between w-full">
        <a href="#" className="flex items-center gap-2" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="logo" className="w-20 h-12 animate-fade-in-left" />
        </a>
        <ul className="hidden sm:flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full animate-fade-in-right">
          {["Skills", "Projects", "Experience", "About"].map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="hover-glow-gradient px-3 py-1 transition-all duration-300">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div ref={menuRef} className="sm:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 cursor-pointer z-20 animate-fade-in-right "
            onClick={(e) => {
              e.stopPropagation();
              setToggle(!toggle);
            }}
          />
          {toggle && (
            <div
              className="sm:hidden absolute top-20 right-6 min-w-[160px] flex flex-col gap-4 p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl shadow-black/40 animate-fade-in-up transition-all duration-300 z-10"
            >
              <ul className="flex flex-col gap-4">
                {["Skills", "Projects", "Experience", "About"].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} className="hover-glow-gradient">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
