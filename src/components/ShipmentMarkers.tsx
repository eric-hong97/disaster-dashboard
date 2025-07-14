import React, { useRef, useState } from 'react';
import { Mesh } from 'three';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import type Shipment from '../utils/util';

interface Props {
  shipment: Shipment;
  isSelected: boolean;
}

const statusColors: Record<string, string> = {
  Active: '#4caf50',
  Delayed: '#ff9800',
  Delivered: '#2196f3',
  Blocked: '#f44336',
  Default: '#9e9e9e',
};

const ShipmentMarker: React.FC<Props> = ({ shipment, isSelected }) => {
  const markerRef = useRef<Mesh>(null);
  const { camera } = useThree();

  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(1);
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟠';
      case 'Low': return '🟢';
      default: return '❔';
  }
  };
  
  // Update opacity based on distance every frame
  useFrame(() => {
    if (!markerRef.current) return;


    const markerPos = markerRef.current.position.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
  
    const dot = markerPos.dot(cameraDir); // -1 (opposite) → 1 (facing)
  
    // Log-style visibility: boost contrast between front/back
    const visibility = Math.max(dot, 0.001); // prevent log(0)
    const newOpacity = Math.min(1, Math.log(visibility * 10 + 1)); // sharp falloff
  
    setOpacity(newOpacity);
  
    // Pulse animation
    if (isSelected) {
      const scale = 1 + 0.2 * Math.sin(performance.now() / 200);
      markerRef.current.scale.set(scale, scale, scale);
    } else {
      markerRef.current.scale.set(1, 1, 1);
    }
  });
  
  const color = statusColors[shipment.status] || statusColors.Default;
  const lat = shipment.lat;
  const lng = shipment.lng;
  const radius = 2.5;

  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return (
    <mesh
      ref={markerRef}
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={isSelected ? color : '#000'}
        emissiveIntensity={isSelected ? 1.5 : 0}
      />

      {(hovered || isSelected) && (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
          <div
            style={{
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '5px',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              opacity: opacity, // ← 🔥 this makes the label fade
              transition: 'opacity 0.2s ease',
            }}
          >
            {getPriorityIcon(shipment.priority)} {shipment.id} | {shipment.location} | {shipment.eta}
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default ShipmentMarker;
