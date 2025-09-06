import { useState, useEffect, useRef } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Planet } from "./Planet";
import { Moon } from "./Moon"; 
import { FaArrowRight } from "react-icons/fa";

const skills = [
  {
    name: "Languages",
    tools: {
      Python: {
        description: "Versatile language for scripting, data, and backend.",
        experience: "3 years",
        projectsAppliedIn: "Data Analysis, Backend APIs",
        projectName: "AI Research Project",
        status: "ACTIVE"
      },
      C: {
        description: "Low-level systems programming.",
        experience: "3 years",
        projectsAppliedIn: "System Programming, Algorithms",
        projectName: "Operating System Course",
        status: "LEARNING"
      },
      Java: {
        description: "OOP and enterprise-grade development.",
        experience: "3 years",
        projectsAppliedIn: "Enterprise Applications, Android",
        projectName: "OOP and enterprise-grade development.",
        status: "ACTIVE"
      },
      JavaScript: {
        description: "Dynamic web development.",
        experience: "2.5 years",
        projectsAppliedIn: "Web Apps, Full-stack Projects",
        projectName: "Reactutor",
        status: "ACTIVE"
      },
      TypeScript: {
        description: "Typed superset of JavaScript.",
        experience: "2 years",
        projectsAppliedIn: "React Apps, Node.js Backends",
        projectName: "Portfolio Website",
        status: "ACTIVE"
      },
    },
    texturePath: "/textures/makemake.jpg",
  },
  {
    name: "Web & Frameworks",
    tools: {
      React: {
        description: "Declarative UI library.",
        experience: "2.5 years",
        projectsAppliedIn: "Portfolio, E-commerce Apps",
        projectName: "Portfolio, Reactutor, Virtual Bank of Canada",
        status: "ACTIVE"
      },
      "Express.js": {
        description: "Minimal backend web framework for Node.js.",
        experience: "2 years",
        projectsAppliedIn: "REST APIs, Microservices",
        projectName: "Virtual Bank of Canada",
        status: "ACTIVE"
      },
      "Node.js": {
        description: "JavaScript runtime for server-side development.",
        experience: "3 years",
        projectsAppliedIn: "Backend Services, Real-time Apps",
        projectName: "Virtual Bank of Canada",
        status: "ACTIVE"
      },
      Vite: {
        description: "Fast frontend build tool.",
        experience: "1.5 years",
        projectsAppliedIn: "React Projects, Portfolio",
        projectName: "Portfolio Website, Reactutor",
        status: "ACTIVE"
      },
      Tailwind: {
        description: "Utility-first CSS framework.",
        experience: "2 years",
        projectsAppliedIn: "UI Components, Responsive Design",
        projectName: "Portfolio, Reactutor, Virtual Bank of Canada",
        status: "ACTIVE"
      },
      HTML: {
        description: "Structure of web content.",
        experience: "4 years",
        projectsAppliedIn: "All Web Projects",
        projectName: "Portfolio, Reactutor, Virtual Bank of Canada",
        status: "ACTIVE"
      },
      CSS: {
        description: "Styling and layout.",
        experience: "4 years",
        projectsAppliedIn: "All Web Projects",
        projectName: "Animated Landing Pages",
        status: "ACTIVE"
      },
      "Three.js": {
        description: "3D graphics in the browser.",
        experience: "1 year",
        projectsAppliedIn: "3D Portfolio, Interactive Demos",
        projectName: "Portfolio Website",
        status: "LEARNING"
      },
      FramerMotion: {
        description: "Animation library for React.",
        experience: "1 year",
        projectsAppliedIn: "Portfolio Animations, UI Transitions",
        projectName: "Portfolio Website",
        status: "LEARNING"
      },
    },
    texturePath: "/textures/venus.jpg",
  },
  {
    name: "Cloud & DevOps",
    tools: {
      Firebase: {
        description: "Backend as a service platform.",
        experience: "2 years",
        projectsAppliedIn: "Firebase Storage, Authentication",
        projectName: "Reactutor, Virtual Bank of Canada",
        status: "ACTIVE"
      },
      Docker: {
        description: "Containerization platform.",
        experience: "1 year",
        projectsAppliedIn: "Microservices, Development Environment",
        projectName: "Reactutor",
        status: "LEARNING"
      },
      "AWS S3": {
        description: "Object storage service.",
        experience: "1 year",
        projectsAppliedIn: "File Storage, Static Websites",
        projectName: "Personal Projects",
        status: "LEARNING"
      },
      "AWS EC2": {
        description: "Scalable virtual servers.",
        experience: "1 year",
        projectsAppliedIn: "Web Hosting, API Servers",
        projectName: "Personal Projects",
        status: "LEARNING"
      },
      "AWS Lambda": {
        description: "Serverless compute — learning in progress.",
        experience: "6 months",
        projectsAppliedIn: "Serverless Functions",
        projectName: "Personal Projects",
        status: "LEARNING"
      },
    },
    texturePath: "/textures/earth.jpg",
  },
  {
    name: "Database",
    tools: {
      MongoDB: {
        description: "NoSQL document database.",
        experience: "2 years",
        projectsAppliedIn: "Web Apps, Data Storage",
        projectName: "Virtual Bank of Canada",
        status: "ACTIVE"
      },
      MySQL: {
        description: "Relational database system.",
        experience: "1.5 years",
        projectsAppliedIn: "Web Applications, Data Management",
        projectName: "Professional projects",
        status: "ACTIVE"
      },
      NoSQL: {
        description: "Non-relational databases for flexible data models.",
        experience: "2 years",
        projectsAppliedIn: "Scalable Applications, Real-time Data",
        projectName: "Professional projects, Virtual Bank of Canada",
        status: "ACTIVE"
      },
      Mongoose: {
        description: "MongoDB ODM for Node.js.",
        experience: "1.5 years",
        projectsAppliedIn: "Node.js Backends, API Development",
        projectName: "Virtual Bank of Canada",
        status: "ACTIVE"
      },
    },
    texturePath: "/textures/mars.jpg",
  },
  {
    name: "Mission Control",
    tools: {
      "CI/CD": {
        description: "Automated build, test, and deploy processes.",
        experience: "8 months",
        projectsAppliedIn: "All Projects, GitHub Actions",
        projectName: "Professional projects",
        status: "LEARNING"
      },
      "AGILE": {
        description: "Iterative project management.",
        experience: "1 year",
        projectsAppliedIn: "Team Projects, Sprint Planning",
        projectName: "Professional projects",
        status: "LEARNING"
      },
      "REST APIs": {
        description: "Standard for client-server communication.",
        experience: "1.5 years",
        projectsAppliedIn: "Backend Services, Microservices",
        projectName: "Professional projects",
        status: "ACTIVE"
      },
    },
    texturePath: "/textures/jupiter.jpg",
  },
];

export const Tech = () => {
  const isMobile = useIsMobile();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [zoom, setZoom] = useState(20);
  const [isPlanetSelected, setIsPlanetSelected] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(new THREE.Vector3(5, 5, zoom));
  const [isAnyHologramVisible, setIsAnyHologramVisible] = useState(false);


  const texture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  const handleZoomIn = () => setZoom((prev) => Math.max(prev - 1, 5));
  const handleZoomOut = () => setZoom((prev) => Math.min(prev + 1, 40));
  const handlePlanetClick = (skillName: string, pos: THREE.Vector3) => {
    setSelectedSkill(skillName);
    setCameraPosition(pos);
  };

  const selectedData = skills.find((s) => s.name === selectedSkill);

  return (
    <div className="relative w-full h-screen bg-black text-center leading-tight top-20">
      {selectedData ? (
        <div className=" z-10">
          <h2 className="text-4xl p-3 text-white">
            You've landed on the <span className="animated-sunset text-6xl font-dancing leading-tight px-2 font-extrabold">{selectedSkill}</span> Planet!
          </h2>
          <p className="text-center text-gray-300 px-4 sm:px-0">
            🌙 Navigate the orbiting moons and unlock the secrets of my coding mastery across the galaxy.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-4xl font-bold p-3 animated-sunset">
            Welcome to My Tech System!
          </h2>
          <p className="text-center text-gray-300 px-4 sm:px-0">
            ✨ Spin, zoom, and explore! Each planet unlocks tech I've mastered.
          </p>
        </div>
      )}
      <div
        className="absolute right-6 top-1/2 transform -translate-y-1/2 flex-col items-center hidden sm:flex justify-between gap-4 sm:gap-15 z-30"
      >
        <button
          onClick={handleZoomIn}
          className="text-white text-xl cursor-pointer"
        >
          +
        </button>
        <input
          type="range"
          min="5"
          max="40"
          value={zoom}
          defaultValue={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="custom-thumb w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{ transform: "rotate(90deg)" }}
        />

        <button
          onClick={handleZoomOut}
          className="text-white text-xl cursor-pointer"
        >
          −
        </button>
        
      </div>
      {isPlanetSelected && (<button
          className="text-white text-xl cursor-pointer absolute top-50 right-10 z-100"
          onClick={() => {
            setSelectedSkill(null);
            setIsPlanetSelected(false);
            setCameraPosition(new THREE.Vector3(5, 5, zoom));
            setIsAnyHologramVisible(false);
            }
          }
          >Back to the solar system. <FaArrowRight /></button>)}
      <Canvas camera={{ position: cameraPosition, fov: 60 }} className="touch-auto sm:h-[400px] h-[200px]">
        <CameraController zoom={zoom} targetPosition={cameraPosition} isPlanetSelected={isPlanetSelected}/>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={500} factor={4} fade />
        <OrbitControls enableZoom={isMobile} enablePan={false} enableRotate />
        

        <>
          <mesh>
            <sphereGeometry args={[1.75, 32, 32]} />
            <meshStandardMaterial map={texture} />
          </mesh>

          {skills
            .filter((skill) => !selectedSkill || skill.name === selectedSkill)
            .map((skill, i) => (
              <Planet
                key={skill.name}
                {...skill}
                name={skill.name}
                speed={selectedSkill ? 0 : 0.001 + i * 0.0001}
                orbitRadius={selectedSkill ? 0 : 5 + i * 2}
                size={selectedSkill ? 2 : 1}
                startAngle={(i * Math.PI) / 3}
                onClick={handlePlanetClick}
                isPlanetSelected={isPlanetSelected}
                setIsPlanetSelected={setIsPlanetSelected}
                isSelected={selectedSkill === skill.name || !selectedSkill}
              >
                {(planetPos) =>
                  selectedSkill === skill.name &&
                  Object.entries(skill.tools).map(([toolName, toolData], index) => (
                    <Moon
                      key={toolName}
                      name={toolName}
                      experience={toolData.experience}
                      projectsAppliedIn={toolData.projectsAppliedIn}
                      projectName={toolData.projectName}
                      status={toolData.status}
                      distance={3 + index * 0.75}
                      speed={0.001}
                      parentPosition={planetPos}
                      setIsHologramVisible={setIsAnyHologramVisible}
                      isHologramVisible={isAnyHologramVisible}
                      setCameraPosition={setCameraPosition}
                    />
                  ))
                }
              </Planet>
          ))}
        </>

        {/* {selectedData && (
          <Planet
            key={selectedData.name}
            {...selectedData}
            name={selectedData.name}
            speed={0}
            orbitRadius={0}
            size={2}
            startAngle={0}
            onClick={handlePlanetClick}
          >
            {(planetPos) =>
              Object.entries(selectedData.tools).map(([toolName, description], index) => (
                <Moon
                  key={toolName}
                  name={toolName}
                  description={description}
                  distance={3 + index * 0.75}
                  speed={0.001}
                  parentPosition={planetPos}
                  setIsHologramVisible={setIsAnyHologramVisible}
                  isHologramVisible={isAnyHologramVisible}
                />
              ))
            }
          </Planet>
        )} */}
      </Canvas>
    </div>
  );
};

const CameraController = ({
  zoom,
  targetPosition,
  isPlanetSelected,
}: {
  zoom: number;
  targetPosition: THREE.Vector3;
  isPlanetSelected: boolean;
}) => {
  const { camera } = useThree();
  const isAnimatingRef = useRef(false);
  const desiredPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {

    desiredPositionRef.current = targetPosition.clone().normalize().multiplyScalar(zoom);
    isAnimatingRef.current = true;

  }, [zoom, targetPosition, isPlanetSelected]);

  useFrame(() => {
    if (!isAnimatingRef.current) return;

    const desiredPosition = desiredPositionRef.current;

    camera.position.lerp(desiredPosition, 0.05);
    camera.lookAt(targetPosition);

    if (camera.position.distanceTo(desiredPosition) < 0.01) {
      camera.position.copy(desiredPosition);
      isAnimatingRef.current = false;
    }
  });

  return null;
};