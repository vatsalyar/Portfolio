import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import profilePic from '../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="About"
      className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-10"
    >
      <div
        className="w-full lg:w-1/3 flex justify-center"
        data-aos="fade-right"
      >
        <img
          src={profilePic}
          alt="Vatsalya"
          className="rounded-2xl w-[250px] object-cover shadow-[0_8px_30px_rgb(255,255,255,0.12)] border-4 border-white/10"
        />
      </div>

      <div className="w-full lg:w-2/3 text-white space-y-6" data-aos="fade-left">
        <h2 className="text-4xl font-bold ">
          About Me
        </h2>

        <p className="text-lg leading-relaxed text-white/90">
          Hey! I'm Vatsalya — a developer who enjoys crafting beautiful, scalable web experiences. I specialize in building full-stack apps using React, TypeScript, Tailwind CSS, and Firebase.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {['React', 'Tailwind CSS', 'TypeScript', 'Firebase', 'Node.js', 'Figma'].map((skill, i) => (
            <span
              key={i}
              className="bg-white/10 text-sm px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow hover:scale-105 transition"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className='flex gap-3 sm:gap-7'><a
          href="https://www.linkedin.com/in/vatsalya-rastogi/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-white to-zinc-200 shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-gray-950 text-4xl group-hover:animate-bounce transition duration-300"
          />
        </a>
        <a
          href="mailto:vatsalyarastogi04@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-white to-zinc-200 shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-gray-950 text-4xl group-hover:animate-bounce transition duration-300"
          />
        </a><a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-white to-zinc-200 shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <FontAwesomeIcon
            icon={faFilePdf}
            className="text-gray-950 text-4xl group-hover:animate-bounce transition duration-300"
          />
        </a><a
          href="https://github.com/vatsalyar"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-white to-zinc-200 shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-gray-950 text-4xl group-hover:animate-bounce transition duration-300"
          />
        </a>
      </div>
      </div>
    </section>
  );
};

export default About;
