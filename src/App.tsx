import About from "./components/About";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import StarCanvas from "./components/Stars";
import Experience from "./components/Experience";
import { Tech } from "./components/Tech";
import bg from "./assets/wave.jpg";

const App = () => {
  return (
      <div className="bg-black">
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
          <StarCanvas />
        </div>
        <div className="relative z-50">
          <Navbar />
        </div>
        <div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black/30 z-15 "/>
          <Hero />
        </div>
        <div className="bg-black relative z-10">
          <section id="Skills" className="mt-20" >
            <Tech />
          </section>
          <section id="Projects" className="mb=20">
            <Projects />
          </section>
          <section id="Experience" className="py-20">
            <Experience />
          </section>
          <section id="About" className="overflow-hidden relative top-1/2 bg-black">
            <About />
          </section>
        </div>
      </div>
  );
};

export default App;
