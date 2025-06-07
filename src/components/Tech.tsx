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
      Python: "Versatile language for scripting, data, and backend.",
      C: "Low-level systems programming.",
      Java: "OOP and enterprise-grade development.",
      JavaScript: "Dynamic web development.",
      TypeScript: "Typed superset of JavaScript.",
    },
    texturePath: "/textures/makemake.jpg",
  },
  {
    name: "Web & Frameworks",
    tools: {
      React: "Declarative UI library.",
      "Express.js": "Minimal backend web framework for Node.js.",
      "Node.js": "JavaScript runtime for server-side development.",
      Vite: "Fast frontend build tool.",
      Tailwind: "Utility-first CSS framework.",
      HTML: "Structure of web content.",
      CSS: "Styling and layout.",
      "Three.js": "3D graphics in the browser.",
      FramerMotion: "Animation library for React.",
    },
    texturePath: "/textures/venus.jpg",
  },
  {
    name: "Cloud & DevOps",
    tools: {
      Firebase: "Backend as a service platform.",
      "GitHub Actions": "CI/CD workflows for GitHub projects.",
      Docker: "Containerization platform.",
      "Docker Swarm": "Native clustering for Docker.",
      "AWS S3": "Object storage service.",
      "AWS EC2": "Scalable virtual servers.",
      "AWS Lambda": "Serverless compute — learning in progress.",
    },
    texturePath: "/textures/earth.jpg",
  },
  {
    name: "Database",
    tools: {
      MongoDB: "NoSQL document database.",
      MySQL: "Relational database system.",
      NoSQL: "Non-relational databases for flexible data models.",
      Mongoose: "MongoDB ODM for Node.js.",
    },
    texturePath: "/textures/mars.jpg",
  },
  {
    name: "Mission Control",
    tools: {
      "CI/CD pipelines": "Automated build, test, and deploy processes.",
      "AGILE Methodologies": "Iterative project management.",
      "REST APIs": "Standard for client-server communication.",
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
        

        {true && (
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
                    Object.entries(skill.tools).map(([toolName, description], index) => (
                      <Moon
                        key={toolName}
                        name={toolName}
                        description={description}
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
        )}

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