import reactutor from "../assets/reactutor.png";
import bank from "../assets/bank.png";
import portfolio from "../assets/portfolio.png";

const projects = [
    {
      name: "Reactutor",
      description:
        "Reactutor is an interactive online learning platform for React that integrates AI-driven guidance with guided tutorials, real‑time coding challenges, and an interactive coding environment for hands‑on practice. It’s designed to help both beginners and experienced developers quickly grasp and apply React concepts.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "green-text-gradient",
        },
        {
          name: "typescript",
          color: "pink-text-gradient",
        },{
          name: "sandboxAPI",
          color: "cyber-cyan-text-gradient",
        },{
          name: "groq-sdk",
          color: "purple-text-gradient",
        },{
          name: "firebase",
          color: "orange-text-gradient",
        },
      ],
      image: reactutor,
      source_code_link: "https://github.com/vatsalyar/Reactutor",
    },
    {
      name: "VBC-Virtual Bank of Canada",
      description:
        "A banking app that allows users to manage transactions, track financial activity, and access a personalized dashboard displaying recent transactions. Designed with a main focus backend server, with future enhancements planned for security and functionality.",
      tags: [
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restAPI",
          color: "orange-text-gradient",
        },
        {
          name: "node.js",
          color: "pink-text-gradient",
        },
        {
          name: "express.js",
          color: "cyber-cyan-text-gradient",
        },
      ],
      image: bank,
      source_code_link: "https://github.com/",
    },
    {
      name: "Portfolio Website",
      description:
        "This portfolio website blends interactive 3D elements, smooth animations powered by Framer Motion, and sleek design with React.js, Three.js, and Tailwind CSS. It delivers an engaging, responsive experience that showcases advanced web development techniques while maintaining optimal performance across all devices.",
      tags: [
        {
          name: "three.js",
          color: "green-text-gradient",
        },
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "orange-text-gradient",
        },
        {
          name: "framerMotion",
          color: "pink-text-gradient",
        },
      ],
      image: portfolio,
      source_code_link: "https://github.com/",
    },
  ];
export { projects };