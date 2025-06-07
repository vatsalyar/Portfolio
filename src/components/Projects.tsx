import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import reactutor from "../assets/reactutor.png";
import portfolio from "../assets/portfolio.png";
import vbc from "../assets/VBC.png";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projectDescriptions = [
    {
      title: "Reactutor",
      tagline: "Master React the smart way — with AI by your side.",
      desc: "An interactive online learning platform for React that integrates AI-driven guidance with guided tutorials, real‑time coding challenges, and an interactive coding environment for hands‑on practice.",
      img: reactutor,
      link: "https://reactutor-aws.vatsalya.wiki",
      tech: ["React", "TypeScript", "AWS", "Firebase Storage", "SandboxAPI", "TailwindCSS", "Framer Motion", "Groq-AI"],
      features: [
        "Combines AI-driven guidance with interactive tutorials and real-time coding challenges",
        "Offers a hands-on coding environment for practical React learning",
        "Designed to support both beginners and experienced developers in mastering React efficiently",
      ],
      gradient: "reactutor-gradient",
      shadow: "shadow-[0_0_30px_#3B82F6]",
      taglineColor: "text-blue-300",
      descColor: "text-blue-500",
      bgcolor: "bg-blue-500"
    },
    {
      title: "Virtual Bank of Canada",
      tagline: "Bank smarter, track better — your finances, redefined.",
      desc: "A robust banking application that empowers users to manage transactions, monitor financial activity, and access a personalized dashboard showcasing recent activity. Built for scalability and security.",
      img: vbc,
      link: "https://github.com/vatsalyar",
      tech: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "TailwindCSS", "Framer Motion"],
      features: [
        "Enables users to manage transactions and track financial activity efficiently",
        "Provides a personalized dashboard displaying recent transactions",
        "Prioritizes backend architecture with plans for advanced security",
      ],
      gradient: "bg-gradient-to-t from-[#0f0f0f] via-[#1c1c1c] to-[#3b1f1f]",
      shadow: "shadow-[0_0_30px_#ef4444]",
      taglineColor: "text-red-300",
      descColor: "text-red-700",
      bgcolor: "bg-red-700"
    },
    {
      title: "Personal Portfolio",
      tagline: "A digital reflection of my craft — where code meets creativity.",
      desc: "My personal portfolio website showcases my skills as a full-stack developer through projects, blogs, and modern design. It's clean, responsive, and optimized for performance.",
      img: portfolio,
      link: "https://portfolio.vatsalya.wiki",
      tech: ["Vite", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
      features: [
        "SEO-optimized and fully responsive with a sleek, modern design",
        "Includes a dynamic blog and interactive guestbook",
        "Built using Next.js, TypeScript, Tailwind CSS with OAuth auth",
      ],
      gradient: "bg-gradient-to-b from-[#0f0c0c] via-[#8a4403] via-[#1b0d0d] via-[#ff6600] to-[#f5c698]",
      shadow: "shadow-[0_0_30px_#f97316] translate-y-7",
      taglineColor: "text-orange-300",
      descColor: "text-orange-500",
      bgcolor: "bg-orange-500"
    },
  ];

  const projectRefs = useRef(
    projectDescriptions.map(() => React.createRef<HTMLDivElement>())
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const newActive = projectRefs.current.findIndex((ref) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      });

      if (newActive !== -1 && newActive !== activeProject) {
        setActiveProject(newActive);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeProject]);

  return (
    <div className="relative top-36 mb-20">
      <div className="m-12 px-4 text-center ">
        <p className="text-2xl text-gray-400 uppercase font-bold tracking-widest mb-2 font-dancing">
          From Idea to Impact
        </p>

        <h2 className="text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animated-sunset px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Solutions Crafted
        </h2>
      </div>

      <div
        ref={containerRef}
        className="flex mx-auto text-white justify-center items-start max-w-7xl gap-24 min-h-screen px-4"
      >
        <div className="flex flex-col justify-center gap-16 py-24 w-full lg:max-w-[65%]">
          {projectDescriptions.map((project, index) => (
            <motion.div
              key={index}
              ref={projectRefs.current[index]}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, rotate: -2 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#f2f2f20c] p-1.5 shadow-2xl lg:h-[560px] lg:rounded-3xl lg:p-2"
            >
              <div className={`
                relative z-10 size-full
                p-4 rounded-xl shadow-lg 
                backdrop-blur-md border border-gray-700 cursor-pointer overflow-hidden
                ${project.gradient || ""}
              `}>
                <div className={`flex items-center mb-4 gap-20 ${project.taglineColor}`}>
                  <div className={`max-w-[90%] text-2xl ${project.taglineColor}`}>
                    {project.tagline}
                  </div>
                  <FaArrowRight className="text-lg mt-1" />
                </div>
                <motion.div
                  whileHover={{ rotate: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="w-full size-full translate-y-6 flex justify-center items-center overflow-hidden mt-4"
                >
                  <img
                    src={project.img}
                    alt={`project ${index + 1}`}
                    className={`object-cover w-full max-w-[85%] rounded-lg transition-transform border-[1.5px] border-white/20 duration-300 ${project.shadow || ""}`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          id="description"
          className="hidden lg:block lg:max-w-[35%] sticky top-15 py-28 self-start"
        >
          <div className="flex flex-row gap-4">
            <div className={`w-16 h-1 rounded-xl translate-y-4 ${projectDescriptions[activeProject].bgcolor}`} />
            <div className="bg-transparent rounded-xl shadow-xl duration-500">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {projectDescriptions[activeProject].title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {projectDescriptions[activeProject].desc}
              </p>

              <ul className="space-y-3 text-gray-200">
                {projectDescriptions[activeProject].features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      className={`w-4 h-4 mt-1 flex-shrink-0 ${projectDescriptions[activeProject].descColor}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-3.5 2.1L7.5 12 4 9.1l4.4-.4L10 5l1.6 3.7 4.4.4L12.5 12l1 5.1z" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Animated Tech Stack Badges */}
              <motion.div
                key={activeProject}
                className="mt-6 flex flex-wrap gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {projectDescriptions[activeProject].tech.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#181818] text-gray-100 text-sm font-medium rounded-full border border-white/10 shadow-sm"
                  >
                    {/* Logo placeholder — replace with actual logo if desired */}
                    <div className="w-4 h-4 rounded-sm bg-white/80" />
                    {tech}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
