import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useIsMobile";

export const Hologram = ({
  name,
  description,
  onClose,
}: {
  name: string;
  description: string;
  onClose?: () => void;
}) => {
  const hologramRef = useRef<THREE.Group>(null);
  const backgroundRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const borderLinesRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const noiseOverlayRef = useRef<THREE.Mesh>(null);
  const hexGridRef = useRef<THREE.Mesh>(null);
  const dataStreamRef = useRef<THREE.Group>(null);
  const energyRingsRef = useRef<THREE.Group>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  const techData = useMemo(() => ({
    speed: `${(Math.random() * 50 + 10).toFixed(1)} mi/s`,
    distance: `${(Math.random() * 200000000 + 50000000).toLocaleString()} mi`,
    size: `${(Math.random() * 5000 + 1000).toFixed(0)} mi`,
    temperature: `${(Math.random() * 500 - 200).toFixed(0)}°C`,
    composition: Math.random() > 0.5 ? "Silicon/Carbon" : "Iron/Nickel",
    status: Math.random() > 0.3 ? "ACTIVE" : "DORMANT",
    threat: Math.random() > 0.7 ? "HIGH" : Math.random() > 0.4 ? "MEDIUM" : "LOW",
    energy: `${(Math.random() * 999 + 1).toFixed(0)} TW`
  }), []);

  const isMobile = useIsMobile();

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;     
      positions[i + 1] = (Math.random() - 0.5) * 10; 
      positions[i + 2] = (Math.random() - 0.5) * 2;  
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
  }, []);

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

    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = t;
      }
    }

    if (hexGridRef.current) {
      const material = hexGridRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = t;
      }
    }

    if (borderLinesRef.current) {
      borderLinesRef.current.children.forEach((line, i) => {
        if ((line as THREE.Mesh).material) {
          const material = (line as THREE.Mesh).material as THREE.MeshStandardMaterial;
          material.opacity = 0.6 + Math.sin(t * 2 + i) * 0.4;
          material.emissiveIntensity = 0.5 + Math.sin(t * 3 + i * 0.5) * 0.3;
        }
      });
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(t + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      particlesRef.current.rotation.z = t * 0.1;
    }

    if (noiseOverlayRef.current) {
      const material = noiseOverlayRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = t;
      }
    }

    if (dataStreamRef.current) {
      dataStreamRef.current.children.forEach((stream, i) => {
        stream.position.y = -5 + ((t * (2 + i * 0.5)) % 10);
        const material = (stream as THREE.Mesh).material as THREE.MeshStandardMaterial;
        material.opacity = Math.sin(t * 4 + i) * 0.3 + 0.4;
      });
    }

    if (energyRingsRef.current) {
      energyRingsRef.current.rotation.z = t * 0.5;
      energyRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (1 + i * 0.3);
        const material = (ring as THREE.Mesh).material as THREE.MeshStandardMaterial;
        material.opacity = 0.3 + Math.sin(t * 2 + i) * 0.2;
      });
    }
  });

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        
        void main() {
          vec2 grid = abs(fract(vUv * 20.0) - 0.5);
          float line = min(grid.x, grid.y);
          float mask = 1.0 - step(0.02, line);
          
          float pulse = sin(time * 3.0 + vUv.y * 10.0) * 0.5 + 0.5;
          float scanline = sin(vUv.y * 100.0 + time * 10.0) * 0.1 + 0.9;
          float alpha = mask * (0.3 + pulse * 0.2) * scanline;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  const hexGridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x0066ff) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        
        float hexDist(vec2 p) {
          p = abs(p);
          return max(dot(p, normalize(vec2(1.0, 1.73))), p.x);
        }
        
        vec2 hexCoord(vec2 uv) {
          vec2 r = vec2(1.0, 1.73);
          vec2 h = r * 0.5;
          vec2 a = mod(uv, r) - h;
          vec2 b = mod(uv - h, r) - h;
          return dot(a, a) < dot(b, b) ? a : b;
        }
        
        void main() {
          vec2 coord = hexCoord(vUv * 15.0);
          float dist = hexDist(coord);
          float hex = 1.0 - step(0.4, dist);
          float pulse = sin(time * 2.0 + length(coord) * 5.0) * 0.5 + 0.5;
          
          gl_FragColor = vec4(color, hex * 0.2 * pulse);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  const noiseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
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
          gl_FragColor = vec4(0.0, 1.0, 1.0, noise * flicker);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  return (
    <>
      <group 
        ref={hologramRef} 
        position={[-10, 0, 2]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
      <mesh ref={backgroundRef} position={[0, 0, -0.01]}>
        <planeGeometry args={isMobile ? [6, 5] : [12, 10]} />
        <meshStandardMaterial
          color={0x001122}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
      <mesh ref={gridRef} position={[0, 0, 0]}>
        <planeGeometry args={isMobile ? [6, 5] : [12, 10]} />
        <primitive object={gridMaterial} />
      </mesh>
      <mesh ref={hexGridRef} position={[0, 0, 0.005]}>
        <planeGeometry args={isMobile ? [6, 5] : [12, 10]} />
        <primitive object={hexGridMaterial} />
      </mesh>
      <mesh ref={noiseOverlayRef} position={[0, 0, 0.01]}>
        <planeGeometry args={isMobile ? [6, 5] : [12, 10]} />
        <primitive object={noiseMaterial} />
      </mesh>
      <group ref={borderLinesRef}>
        <mesh position={[0, 5, 0.01]}>
          <planeGeometry args={[12, 0.08]} />
          <meshStandardMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.8}
            emissive={0x00ffff}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, -5, 0.01]}>
          <planeGeometry args={[12, 0.08]} />
          <meshStandardMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.8}
            emissive={0x00ffff}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[-6, 0, 0.01]}>
          <planeGeometry args={[0.08, 10]} />
          <meshStandardMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.8}
            emissive={0x00ffff}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[6, 0, 0.01]}>
          <planeGeometry args={[0.08, 10]} />
          <meshStandardMaterial 
            color={0x00ffff} 
            transparent 
            opacity={0.8}
            emissive={0x00ffff}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      <group ref={energyRingsRef} position={[0, 0, -0.5]}>
        {[1.5, 2.0, 2.5].map((radius, i) => (
          <mesh key={i}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 32]} />
            <meshStandardMaterial
              color={0x00ffff}
              transparent
              opacity={0.3}
              emissive={0x00ffff}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
      <group ref={dataStreamRef}>
        {[-4, -2, 2, 4].map((x, i) => (
          <mesh key={i} position={[x, -5, 0.02]}>
            <planeGeometry args={[0.05, 1]} />
            <meshStandardMaterial
              color={0x00ff88}
              transparent
              opacity={0.6}
              emissive={0x00ff88}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={scanLineRef} position={[0, -4, 0.02]}>
        <planeGeometry args={[12, 0.15]} />
        <meshStandardMaterial 
          color={0x00ffff} 
          transparent 
          opacity={0.7}
          emissive={0x00ffff}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text 
        position={[0, 4.2, 0.02]} 
        fontSize={0.8} 
        color="#00ffff" 
        anchorX="center"
      >
        {name.toUpperCase()}
      </Text>
      <mesh position={[-4.5, 4.2, 0.02]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshStandardMaterial 
          color={techData.threat === "HIGH" ? 0xff0000 : techData.threat === "MEDIUM" ? 0xffaa00 : 0x00ff00}
          transparent
          opacity={0.6}
          emissive={techData.threat === "HIGH" ? 0xff0000 : techData.threat === "MEDIUM" ? 0xffaa00 : 0x00ff00}
          emissiveIntensity={0.3}
        />
      </mesh>
      <Text 
        position={[-4.5, 4.2, 0.03]} 
        fontSize={0.25} 
        color="#ffffff" 
        anchorX="center"
      >
        THREAT: {techData.threat}
      </Text>
      <mesh position={[4.5, 4.2, 0.02]}>
        <circleGeometry args={[0.12, 8]} />
        <meshStandardMaterial 
          color={techData.status === "ACTIVE" ? 0x00ff00 : 0xff4444}
          emissive={techData.status === "ACTIVE" ? 0x00ff00 : 0xff4444}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Text 
        position={[5.2, 4.2, 0.02]} 
        fontSize={0.3} 
        color={techData.status === "ACTIVE" ? "#00ff00" : "#ff4444"} 
        anchorX="left"
      >
        {techData.status}
      </Text>
      <mesh position={[0, 3.5, 0.02]}>
        <planeGeometry args={[10, 0.03]} />
        <meshStandardMaterial 
          color={0x00ffff} 
          emissive={0x00ffff} 
          emissiveIntensity={0.8} 
        />
      </mesh>
      <Text position={[-5, 2.8, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        ORBITAL VELOCITY
      </Text>
      <Text position={[-5, 2.3, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.speed}
      </Text>
      <Text position={[-5, 1.6, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        DISTANCE TO EARTH
      </Text>
      <Text position={[-5, 1.1, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.distance}
      </Text>
      <Text position={[-5, 0.4, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        DIAMETER
      </Text>
      <Text position={[-5, -0.1, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.size}
      </Text>
      <Text position={[1, 2.8, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        SURFACE TEMP
      </Text>
      <Text position={[1, 2.3, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.temperature}
      </Text>
      <Text position={[1, 1.6, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        COMPOSITION
      </Text>
      <Text position={[1, 1.1, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.composition}
      </Text>
      <Text position={[1, 0.4, 0.02]} fontSize={0.35} color="#00ffff" anchorX="left">
        ENERGY OUTPUT
      </Text>
      <Text position={[1, -0.1, 0.02]} fontSize={0.5} color="#ffffff" anchorX="left">
        {techData.energy}
      </Text>
      <Text position={[0, -1, 0.02]} fontSize={0.35} color="#00ffff" anchorX="center">
        TECHNICAL OVERVIEW
      </Text>
      <mesh position={[0, -1.4, 0.02]}>
        <planeGeometry args={[8, 0.02]} />
        <meshStandardMaterial 
          color={0x00ffff} 
          emissive={0x00ffff} 
          emissiveIntensity={0.3} 
        />
      </mesh>
      <Text
        position={[0, -2.2, 0.02]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        maxWidth={10}
        textAlign="center"
      >
        {description}
      </Text>
      {[
        [-5.8, 4.8], [5.8, 4.8], [-5.8, -4.8], [5.8, -4.8]
      ].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.02]}>
          <mesh>
            <planeGeometry args={[0.4, 0.06]} />
            <meshStandardMaterial 
              color={0x00ffff} 
              emissive={0x00ffff} 
              emissiveIntensity={0.5} 
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.4, 0.06]} />
            <meshStandardMaterial 
              color={0x00ffff} 
              emissive={0x00ffff} 
              emissiveIntensity={0.5} 
            />
          </mesh>
          <mesh position={[0.15, 0.15, 0.01]}>
            <circleGeometry args={[0.03, 8]} />
            <meshStandardMaterial 
              color={0x00ffff} 
              emissive={0x00ffff} 
              emissiveIntensity={0.8} 
            />
          </mesh>
        </group>
      ))}
      {onClose && (
        <group position={[5.5, 4.5, 0.1]}>
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
          <Text position={[0, 0, 0.01]} fontSize={0.4} color="#ffffff" anchorX="center">
            ×
          </Text>
        </group>
      )}
      </group>
    </>
  );
};