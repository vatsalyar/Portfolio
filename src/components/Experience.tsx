import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import city from "../assets/city.png";
import uow from "../assets/uow.jpg";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  {
    title: "TA - Algorithms and Programming II",
    company_name: "University of Windsor",
    icon: uow,
    date: "Jan 2025 - Apr 2025",
    points: [
      "Delivered interactive lab sessions for classes of 25+ students, focusing on advanced programming concepts such as time and space complexities of high-level algorithms and data structures.",
      "Guided students in debugging code and mastering C/C++ programming techniques, fostering a 20% improvement in overall lab performance.",
      "Evaluated assignments and exams with meticulous attention to fairness and accuracy.",
    ],
  },
  {
    title: "TA - Key Concepts in Computer Science",
    company_name: "University of Windsor",
    icon: uow,
    date: "Sep 2024 - Dec 2024",
    points: [
      "Conducted lab sessions for a class of 20 students, addressing individual and group questions on foundational topics in computer science, including propositional logic, proof techniques, and basic mathematics",
      "Graded over 80 assignments and exams, ensuring fair evaluation and adherence to academic integrity; assisted in proctoring examinations for up to 150 students, supervising a secure testing environment",
      "Provided office hours for personalized support, enhancing student understanding and contributing to a 15% increase in overall course performance.",
    ],
  },
  {
    title: "Crew Member",
    company_name: "City of Windsor",
    icon: city,
    date: "May 2024 - Aug 2024",
    points: [
      "Collaborated with a team to maintain 10+ city parks, focusing on environmental stewardship and community beautification, directly impacting local quality of life",
      "Developed teamwork, time management, and communication skills while contributing to a positive work atmosphere during summer months",
      "Performed essential tasks, including cutting grass, collecting litter, setting up baseball fields, and cleaning restrooms, ensuring a safe and welcoming environment for over 500 park visitors daily",
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
