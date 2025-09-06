import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Hologram } from "./Hologram";

export const Moon = ({
  name,
  distance,
  speed,
  parentPosition,
  isHologramVisible,
  setIsHologramVisible,
  setCameraPosition
}: {
  name: string;
  distance: number;
  speed: number;
  parentPosition: THREE.Vector3;
  isHologramVisible: boolean;
  setIsHologramVisible: (val: boolean) => void;
  setCameraPosition: (position: THREE.Vector3) => void;
}) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const isHologramVisibleRef = useRef(false);
  const texture = useLoader(THREE.TextureLoader, "/textures/haumea.jpg");

  const [frozenHologramPosition, setFrozenHologramPosition] = useState<THREE.Vector3 | null>(null);

  useEffect(() => {
    isHologramVisibleRef.current = isHologramVisible;
  }, [isHologramVisible]);

  const rotationMatrix = useMemo(() => {
    const axis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const angle = Math.random() * Math.PI * 2;
    const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    return new THREE.Matrix4().makeRotationFromQuaternion(q);
  }, []);

  useFrame(() => {
    if (!isHologramVisibleRef.current) {
      angleRef.current += speed;
    }
    const localPos = new THREE.Vector3(
      Math.cos(angleRef.current) * distance,
      0,
      Math.sin(angleRef.current) * distance
    );

    localPos.applyMatrix4(rotationMatrix);

    if (moonRef.current) {
      moonRef.current.position.copy(parentPosition.clone().add(localPos));
    }
  });

  const handleClick = () => {
   
    if (moonRef.current && !isHologramVisible) {
      const position = moonRef.current.position.clone();
      setFrozenHologramPosition(position);
      setIsHologramVisible(true);
      setCameraPosition(new THREE.Vector3(0,0,10)); 
    }
  };

  const handleCloseHologram = () => {
    setIsHologramVisible(false);
    setFrozenHologramPosition(null);

  };

  return (
    <>
      <mesh
        ref={moonRef}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
        onClick={handleClick}
        renderOrder={999}
      >
        <sphereGeometry args={[0.65, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {isHologramVisible && frozenHologramPosition && (
        <Hologram
          name={name}
          onClose={handleCloseHologram}
        />
      )}
    </>
  );
};