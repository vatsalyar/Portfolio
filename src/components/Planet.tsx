import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useSpring, a } from "@react-spring/three";
import * as THREE from 'three';

export const Planet = ({
  orbitRadius = 0,
  speed = 0,
  texturePath,
  size = 2,
  onClick,
  name,
  startAngle = 0,
  children,
  isPlanetSelected = false,
  setIsPlanetSelected,
  isSelected = false,
}: {
  orbitRadius: number;
  speed: number;
  texturePath: string;
  size: number;
  name: string;
  startAngle?: number;
  onClick: (skillName: string, position: THREE.Vector3) => void;
  children?: (planetPosition: THREE.Vector3) => React.ReactNode;
  isPlanetSelected?: boolean;
  setIsPlanetSelected?: (val: boolean) => void;
  isSelected?: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const angle = useRef(startAngle);
  const [planetPosition, setPlanetPosition] = useState<THREE.Vector3 | null>(null);
  // const [hovered, setHovered] = useState(false);

  const { opacity } = useSpring({
    opacity: isSelected ? 1 : 0.1,
    config: { mass: 1, tension: 120, friction: 20 },
  });

  useFrame(() => {
    angle.current += speed;

    const x = orbitRadius * Math.cos(angle.current);
    const z = orbitRadius * Math.sin(angle.current);

    if (meshRef.current) {
      meshRef.current.position.set(isSelected ? x : 0, 0, isSelected ? z : 0);
      setPlanetPosition(meshRef.current.position.clone());
    }
  });

  const handleClick = () => {
    if (meshRef.current && !isPlanetSelected) {
      onClick(name, meshRef.current.position.clone());
      setIsPlanetSelected?.(true);
    }
  };

  return (
    <>
      <a.mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          // setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          // setHovered(false);
        }}
        scale={isSelected ? 1.2 : 1}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <a.meshStandardMaterial map={texture} opacity={opacity} transparent />
      </a.mesh>
      {planetPosition && children?.(planetPosition)}
    </>
  );
};
