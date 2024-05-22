import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function CupStack({ scrollYRef }) {
  const groupRef = useRef();
  const { scene } = useLoader(GLTFLoader, '/cups3.glb');

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(0, -0.1, 0); // Adjusting position
      groupRef.current.scale.set(1.5, 1.5, 1.5);

      groupRef.current.traverse((object) => {
        console.log("Object name: ", object.name);
      });
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;

      const bottomCup = groupRef.current.getObjectByName('BottomCup');
      if (bottomCup) {
        const scrollY = scrollYRef.current;
        const viewportHeight = window.innerHeight;

        // Adjust the bottom cup to stay aligned with the scroll position
        console.log(scrollY);
        console.log(viewportHeight);
        bottomCup.position.y = -(scrollY / viewportHeight) * 0.7 ; // Adjust the multiplier for desired scroll speed
        console.log(bottomCup.position.y);
        // Keep the bottom cup in the center of the screen
        bottomCup.position.x = 0;
        bottomCup.position.z = 0;
      }
    }
  });

  return <primitive object={scene} ref={groupRef} />;
}

export default CupStack;
