import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import bg from "./assets/wave.jpg";


const App = () => {

  return (
    <div>
    <div
      className="relative z-0 dark min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
    <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <Navbar />
      <Hero />
    </div>
    <div className="bg-gradient-to-b from-black via-gray-800 to-black">
      <About />
    </div>
    </div>
  );
}

export default App;
