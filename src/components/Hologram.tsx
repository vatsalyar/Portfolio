import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useIsMobile";

export const Hologram = ({
  name,
  onClose,
}: {
  name: string;
  onClose?: () => void;
}) => {
  const hologramRef = useRef<THREE.Group>(null);
  const backgroundRef = useRef<THREE.Mesh>(null);
  const borderLinesRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const noiseOverlayRef = useRef<THREE.Mesh>(null);
  const energyRingsRef = useRef<THREE.Group>(null);
  const dataStreamRef = useRef<THREE.Group>(null);

  const [isHovered, setIsHovered] = useState(false);

  // 🔥 Skill data mapped to space-style labels
  const skillData = useMemo(
    () => ({
      years: "2.5 years", // ORBITAL VELOCITY
      projects: "4 Projects", // ENERGY OUTPUT
      context: "Hackathon + Personal", // IMPACT RADIUS
      status: Math.random() > 0.5 ? "ACTIVE" : "LEARNING", // STATUS
    }),
    []
  );

  const isMobile = useIsMobile();

  // ✨ Particle geometry (gold shimmer)
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xffcc33, // golden shimmer
        size: 0.025,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (hologramRef.current) {
      const breathing = Math.sin(t * 0.8) * 0.05;
      const floating = Math.sin(t * 1.5) * 0.1;
      hologramRef.current.position.y = floating + breathing;

      const scale = isHovered ? 1.02 + Math.sin(t * 4) * 0.01 : 1;
      hologramRef.current.scale.setScalar(scale);

      hologramRef.current.rotation.y = Math.sin(t * 0.3) * 0.02;
    }

    if (borderLinesRef.current) {
      borderLinesRef.current.children.forEach((line, i) => {
        if ((line as THREE.Mesh).material) {
          const material = (line as THREE.Mesh)
            .material as THREE.MeshStandardMaterial;
          material.opacity = 0.6 + Math.sin(t * 2 + i) * 0.4;
          material.emissiveIntensity =
            0.5 + Math.sin(t * 3 + i * 0.5) * 0.3;
        }
      });
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z = t * 0.1;
    }

    if (noiseOverlayRef.current) {
      const material = noiseOverlayRef.current
        .material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = t;
      }
    }

    if (energyRingsRef.current) {
      energyRingsRef.current.rotation.z = t * 0.5;
      energyRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (1 + i * 0.3);
        const material = (ring as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        material.opacity = 0.3 + Math.sin(t * 2 + i) * 0.2;
      });
    }

    if (dataStreamRef.current) {
      dataStreamRef.current.children.forEach((stream, i) => {
        stream.position.y = -5 + ((t * (2 + i * 0.5)) % 10);
        const material = (stream as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        material.opacity = Math.sin(t * 4 + i) * 0.3 + 0.4;
      });
    }
  });

  // ✨ Sunset color palette
  const SUNSET_ORANGE = 0xffa500;
  const SUNSET_GOLD = 0xffd700;

  // Noise overlay
  const noiseMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          float random(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }
          void main() {
            float noise = random(vUv + time * 0.1) * 0.1;
            float flicker = sin(time * 60.0) * 0.02 + 0.98;
            gl_FragColor = vec4(1.0, 0.6, 0.0, noise * flicker); // orange flicker
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <>
      <group
        ref={hologramRef}
        position={[-10, 0, 2]}
        renderOrder={2000}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Background */}
        <mesh ref={backgroundRef} position={[0, 0, -0.01]} renderOrder={1001}>
          <planeGeometry args={isMobile ? [6, 6] : [10, 8]} />
          <meshStandardMaterial
            color={0x331100}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Particles */}
        <points
          ref={particlesRef}
          geometry={particleGeometry}
          material={particleMaterial}
          renderOrder={1002}
        />

        {/* Noise overlay */}
        <mesh ref={noiseOverlayRef} position={[0, 0, 0.01]} renderOrder={1005}>
          <planeGeometry args={isMobile ? [6, 6] : [10, 8]} />
          <primitive object={noiseMaterial} />
        </mesh>

        {/* Border lines */}
        <group ref={borderLinesRef} renderOrder={1006}>
          <mesh position={[0, 4, 0.01]}>
            <planeGeometry args={[10, 0.08]} />
            <meshStandardMaterial
              color={SUNSET_ORANGE}
              transparent
              opacity={0.8}
              emissive={SUNSET_ORANGE}
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[0, -4, 0.01]}>
            <planeGeometry args={[10, 0.08]} />
            <meshStandardMaterial
              color={SUNSET_ORANGE}
              transparent
              opacity={0.8}
              emissive={SUNSET_ORANGE}
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[-5, 0, 0.01]}>
            <planeGeometry args={[0.08, 8]} />
            <meshStandardMaterial
              color={SUNSET_ORANGE}
              transparent
              opacity={0.8}
              emissive={SUNSET_ORANGE}
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[5, 0, 0.01]}>
              <planeGeometry args={[0.08, 8]} />
            <meshStandardMaterial
              color={SUNSET_ORANGE}
              transparent
              opacity={0.8}
              emissive={SUNSET_ORANGE}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Energy Rings */}
        <group ref={energyRingsRef} position={[0, 0, -0.5]} renderOrder={1008}>
          {[1.5, 2.0, 2.5].map((radius, i) => (
            <mesh key={i}>
              <ringGeometry args={[radius - 0.02, radius + 0.02, 32]} />
              <meshStandardMaterial
                color={SUNSET_GOLD}
                transparent
                opacity={0.3}
                emissive={SUNSET_GOLD}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>

        {/* Data Streams */}
        <group ref={dataStreamRef} renderOrder={1009}>
          {[-4, -2, 2, 4].map((x, i) => (
            <mesh key={i} position={[x, -5, 0.02]}>
              <planeGeometry args={[0.05, 1]} />
              <meshStandardMaterial
                color={SUNSET_ORANGE}
                transparent
                opacity={0.6}
                emissive={SUNSET_ORANGE}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* Title */}
        <Text
          position={[0, 3.2, 0.02]}
          fontSize={0.8}
          color="#FFA500"
          anchorX="center"
          renderOrder={1007}
        >
          {name.toUpperCase()}
        </Text>

        {/* Status */}
        <mesh position={[-4, 3.2, 0.02]}>
          <circleGeometry args={[0.12, 8]} />
          <meshStandardMaterial
            color={skillData.status === "ACTIVE" ? 0xffd700 : 0xff6600}
            emissive={skillData.status === "ACTIVE" ? 0xffd700 : 0xff6600}
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text
          position={[-3.7, 3.2, 0.02]}
          fontSize={0.3}
          color={skillData.status === "ACTIVE" ? "#FFD700" : "#FF6600"}
          anchorX="left"
          renderOrder={1011}
        >
          {skillData.status}
        </Text>

        {/* Divider */}
        <mesh position={[0, 2.5, 0.02]}>
          <planeGeometry args={[8, 0.03]} />
          <meshStandardMaterial
            color={SUNSET_ORANGE}
            emissive={SUNSET_ORANGE}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Skill Stats */}
        <Text
          position={[-4.5, 2.0, 0.02]}
          fontSize={0.35}
          color="#FFD700"
          anchorX="left"
        >
          ORBITAL VELOCITY
        </Text>
        <Text
          position={[-4.5, 1.5, 0.02]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="left"
        >
          {skillData.years}
        </Text>

        <Text
          position={[-4.5, 0.8, 0.02]}
          fontSize={0.35}
          color="#FFD700"
          anchorX="left"
        >
          ENERGY OUTPUT
        </Text>
        <Text
          position={[-4.5, 0.3, 0.02]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="left"
        >
          {skillData.projects}
        </Text>

        <Text
          position={[-4.5, -0.4, 0.02]}
          fontSize={0.35}
          color="#FFD700"
          anchorX="left"
        >
          IMPACT RADIUS
        </Text>
        <Text
          position={[-4.5, -0.9, 0.02]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="left"
        >
          {skillData.context}
        </Text>

        {/* Close Button */}
        {onClose && (
          <group position={[4.5, 3.5, 0.1]}>
            <mesh
              onClick={onClose}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "default")}
            >
              <circleGeometry args={[0.35, 16]} />
              <meshStandardMaterial
                color={0xff4444}
                transparent
                opacity={0.8}
                emissive={0xff4444}
                emissiveIntensity={0.4}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[0.35, 0.38, 16]} />
              <meshStandardMaterial
                color={0xff6666}
                emissive={0xff6666}
                emissiveIntensity={0.6}
              />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.4}
              color="#ffffff"
              anchorX="center"
            >
              ×
            </Text>
          </group>
        )}
      </group>
    </>
  );
};
