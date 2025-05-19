import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import bg from "./assets/wave.jpg";

const App = () => {
  return (
    <div>
      <div
        className="relative z-0 min-h-screen bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30 z-10" />
        <Navbar />
        <Hero />
      </div>
      <div className="bg-black">
        <About />
      </div>
    </div>
  );
};

export default App;
