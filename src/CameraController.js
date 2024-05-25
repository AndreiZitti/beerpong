import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function CameraController({ scrollYRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = scrollYRef.current;
    const viewportHeight = window.innerHeight;
    const bottomCupY = -(scrollY / viewportHeight) * 0.4; // Adjust the multiplier for desired scroll speed

    // Initial camera settings
    const initialPositionZ = 1; // Start closer to the cup
    const zoomStartScroll = 100 * viewportHeight / 100;
    const zoomEndScroll = 120 * viewportHeight / 100;

    // Update the camera position to follow the bottom cup
    camera.position.set(0, bottomCupY + 0.25, initialPositionZ);  // Keep the cup centered in view

    // Zoom in on the bottom part of the cup between 100vh and 120vh
    if (scrollY >= zoomStartScroll && scrollY <= zoomEndScroll) {
      const zoomProgress = (scrollY - zoomStartScroll) / (zoomEndScroll - zoomStartScroll);
      camera.position.z = initialPositionZ - (0.5 * zoomProgress); // Adjust the Z position to zoom in
    } else if (scrollY > zoomEndScroll) {
      camera.position.z = initialPositionZ - 0.5; // Final zoomed-in position
    }

    // Keep the camera looking forward
    camera.lookAt(0, bottomCupY, 0);
  });

  return null;
}

export default CameraController;
