import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function CameraController({ scrollYRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = scrollYRef.current;
    const viewportHeight = window.innerHeight;
    const bottomCupY = -(scrollY / viewportHeight); // Adjust the multiplier for desired scroll speed

    // Update the camera position to follow the bottom cup
    camera.position.set(0, bottomCupY+0.25, 1);  // Keep the cup centered in view

    // Keep the camera looking forward
    camera.lookAt(0, bottomCupY, 0);
  });

  return null;
}

export default CameraController;
