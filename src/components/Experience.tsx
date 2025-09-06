import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import city from "../assets/city.png";
import uow from "../assets/uow.jpg";
import eztrackrLogo from "../assets/eztrackrLogo.svg";
import glendor from "../assets/glendor.svg";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  {
    title: "AI Research Intern",
    company_name: "Glendor",
    icon: glendor,
    date: "Sep 2025 - Present",
    points: [
      "Analyzed Federated Learning methods and models in AI/Medicine/Privacy sectors",
      "Developed automatic tools for PHI deidentification in medical images and data",
      "Contributed to scalable solutions enabling medical research data sharing while protecting patient privacy"
    ],
  },
  {
    title: "Frontend Developer & Design System Architect",
    company_name: "EZTRACKR INC.",
    icon: eztrackrLogo,
    date: "Jul 2025 - Sep 2025",
    points: [
      "Designed and implemented comprehensive design system with React, Tailwind CSS, and Shadcn",
      "Built reusable component library with accessibility and responsive design standards",
      "Delivered complete documentation and implementation support for production integration"
    ],
  },
  {
    title: "Teaching Assistant - Computer Science",
    company_name: "University of Windsor",
    icon: uow,
    date: "Sep 2024 - Apr 2025",
    points: [
      "Conducted lab sessions for 20-25 students in Algorithms, Programming, and CS fundamentals",
      "Guided students in C/C++ programming, debugging, and advanced algorithm concepts",
      "Graded 160+ assignments/exams and provided office hours, improving course performance by 15-20%"
    ],
  },
  {
    title: "Crew Member",
    company_name: "City of Windsor",
    icon: city,
    date: "May 2024 - Aug 2024",
    points: [
      "Maintained 10+ city parks focusing on environmental stewardship and community beautification",
      "Performed essential maintenance tasks including grass cutting, litter collection, and facility cleaning",
      "Developed teamwork and communication skills while serving 500+ daily park visitors"
    ],
  },
];

type ExperienceType = {
  title: string;
  company_name: string;
  icon: string;
  date: string;
  points: string[];
};

type ExperienceCardProps = {
  experience: ExperienceType;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: `linear-gradient(180deg, #3b0a0a, #7c2d12)`,
        color: "#ffe9d6",
        border: "1px solid #8b2c0f",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(252, 165, 66, 0.4)",
      }}
      contentArrowStyle={{ borderRight: "7px solid #fb923c" }}
      date={experience.date}
      iconStyle={{
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain drop-shadow-md"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] font-bold text-[#ffe9d6]">{experience.title}</h3>
        <p className="text-[16px] font-semibold text-[#fcd9c1]" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 ml-5 space-y-2 list-disc">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-[#fef3c7] text-[15px] leading-relaxed tracking-wide"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};


const Experience: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <p className="text-xl text-white font-medium tracking-wider">
          What I have done so far
        </p>
        <h2 className="text-5xl font-extrabold animated-sunset mt-2">
          Work Experience
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col max-w-4xl mx-auto">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Experience;
