import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import profilePic from '../assets/Hi.png';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="About"
      className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-10"
    >
      {/* Avatar */}
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

      {/* Text Content */}
      <div className="w-full lg:w-2/3 text-white space-y-6" data-aos="fade-left">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-400 to-pink-500">
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

        <a
          href="/Vatsalya_Resume.pdf"
          target="_blank"
          className="inline-block mt-6 text-white bg-gradient-to-r from-red-400 to-orange-400 px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default About;
