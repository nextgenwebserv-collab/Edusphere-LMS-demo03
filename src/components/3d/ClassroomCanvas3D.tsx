import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

// Futuristic teacher avatar podium with glowing rings + floating diplomas
function Podium() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group position={[0, -1.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
        <meshStandardMaterial color="#0e7490" emissive="#0891b2" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.2, 0]}>
        <torusGeometry args={[1.1, 0.03, 16, 64]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Diploma({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <cylinderGeometry args={[0.25, 0.25, 0.5, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Ribbon */}
      <mesh position={[position[0], position[1] - 0.35, position[2]]}>
        <boxGeometry args={[0.06, 0.25, 0.06]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 4, 3]} intensity={40} color="#22d3ee" />
      <pointLight position={[-3, 2, 2]} intensity={25} color="#10b981" />

      <Podium />
      <Diploma position={[-1.8, 1.2, 0]} color="#0891b2" />
      <Diploma position={[1.9, 0.8, -0.5]} color="#059669" />
      <Diploma position={[0.2, 2, 0.8]} color="#3b82f6" />

      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 1.5, 0]}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Sparkles count={40} scale={6} size={2} speed={0.4} color="#67e8f9" opacity={0.5} />
    </>
  );
}

export function ClassroomCanvas3D({ className }: { className?: string }) {
  const theme = useStore((s) => s.theme);
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <Scene />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.25} scale={8} blur={2.5} far={4} color={theme === 'dark' ? '#0f172a' : '#94a3b8'} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
