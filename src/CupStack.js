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
        bottomCup.position.y = -(scrollY / window.innerHeight); // Adjust this value for smooth scroll and keeping it at the center
      }
    }
  });

  return <primitive object={scene} ref={groupRef} />;
}

export default CupStack;
