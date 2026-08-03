import { useRef, useMemo, Suspense, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

// ---------- Glowing education globe ----------
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.4, 6]} />
          <meshStandardMaterial
            color="#0891b2"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.6}
            wireframe={false}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh scale={1.01}>
          <icosahedronGeometry args={[1.4, 3]} />
          <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.25} />
        </mesh>
        {/* Orbiting ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 80]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

// ---------- Floating 3D book ----------
function Book({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number]; color: string; rotation?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Pages */}
        <mesh>
          <boxGeometry args={[0.9, 0.08, 1.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} />
        </mesh>
        {/* Cover */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.95, 0.04, 1.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// ---------- Floating math symbols (as small glowing octahedrons) ----------
function FloatingShapes() {
  const positions: [number, number, number][] = useMemo(
    () => [
      [-3.2, 1.8, -1],
      [3, 1.5, -0.5],
      [-2.8, -1.6, 0.5],
      [2.6, -1.8, 0],
      [0, 2.6, -1.5],
      [-1.5, 0.5, 1.5],
    ],
    [],
  );
  const colors = ['#22d3ee', '#10b981', '#3b82f6', '#a78bfa', '#f59e0b', '#ec4899'];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1.2}>
          <mesh position={pos}>
            <octahedronGeometry args={[0.18 + (i % 3) * 0.05, 0]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={50} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#10b981" />
      <pointLight position={[0, 4, -3]} intensity={20} color="#3b82f6" />

      <Globe />
      <FloatingShapes />
      <Book position={[-2.2, 0.8, 0.5]} color="#0891b2" rotation={[0.2, 0.4, 0.1]} />
      <Book position={[2.3, -0.6, 0.3]} color="#059669" rotation={[-0.1, -0.5, 0.05]} />
      <Book position={[1.6, 2, -0.5]} color="#7c3aed" rotation={[0.3, 0.2, -0.1]} />

      <Sparkles count={60} scale={8} size={2} speed={0.3} color="#67e8f9" opacity={0.6} />
      <Stars radius={50} depth={30} count={1500} factor={3} fade speed={1} />
    </>
  );
}

export function HeroCanvas3D({ className }: { className?: string }) {
  const theme = useStore((s) => s.theme);
  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
      >
        <Suspense fallback={null}>
          <Scene />
          <ContactShadows position={[0, -2.2, 0]} opacity={0.2} scale={10} blur={2.5} far={4} color={theme === 'dark' ? '#0f172a' : '#94a3b8'} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
