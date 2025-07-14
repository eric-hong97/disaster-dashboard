// === ThreeDashboard.tsx ===
import React, { useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader, Mesh } from 'three';
import ShipmentMarker from './ShipmentMarkers';
import type Shipment from '../utils/util';

interface Props {
  shipments: Shipment[];
  selectedIds: string[];
}

const Earth: React.FC<{ shipments: Shipment[]; selectedIds: string[] }> = ({ shipments, selectedIds }) => {
  const texture = useMemo(() => new TextureLoader().load('/textures/earth.jpg'), []);
  const rotationRef = React.useRef<Mesh>(null);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (rotationRef.current) rotationRef.current.rotation.y += 0.0015;
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);
  // console.log('| ThreeDashboard | selectedIds:', selectedIds);

  return (
    <group ref={rotationRef}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {shipments.map((s) => (
        <ShipmentMarker
          key={String(s.id)}
          shipment={s}
          isSelected={selectedIds.includes(String(s.id))}
        />
      ))}
    </group>
  );
};

const ThreeDashboard: React.FC<Props> = ({ shipments, selectedIds }) => {
  // Step 1: Add this useMemo to debug IDs and selection matching
  const selectedShipments = useMemo(() => {
    // console.log('All shipment IDs:', shipments.map(s => s.id));
    // console.log('Selected IDs:', selectedIds);

    // Filter shipments whose ID matches selectedIds (all converted to string)
    return shipments.filter(s => selectedIds.some(id => id.toString() === s.id.toString()));
  }, [shipments, selectedIds]);

  // Also log selectedShipments so you see if the filtering works
  useEffect(() => {
    // console.log('Selected Shipments:', selectedShipments);
  }, [selectedShipments]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <fog attach="fog" args={['#000011', 8, 14]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <Earth shipments={shipments} selectedIds={selectedIds} />
        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
};

export default ThreeDashboard;
