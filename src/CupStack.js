import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function CupStack({ scrollYRef }) {
  const groupRef = useRef();
  const { scene } = useLoader(GLTFLoader, '/cups6.glb');

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
      const scrollY = scrollYRef.current;
      const viewportHeight = window.innerHeight;
      const scrollLimit = 50 * viewportHeight / 100;
      const stopRotationScroll = scrollLimit;
      const hideHalfCupStartScroll = 90 * viewportHeight / 100;
      const hideHalfCupEndScroll = 150 * viewportHeight / 100;
      const bottomCup = groupRef.current.getObjectByName('BottomCup');
      const halfCup = groupRef.current.getObjectByName('HalfCup');

      // Stop rotating after reaching the specific viewpoint along the x-axis
      if (scrollY <= stopRotationScroll) {
        groupRef.current.rotation.y += 0.01;
      } else {
        groupRef.current.rotation.y = 4.75;
      }
      

     

      if (bottomCup) {
        // Adjust the bottom cup to stay aligned with the scroll position
        bottomCup.position.y = -(scrollY / viewportHeight) * 0.25; // Adjust this multiplier for correct speed

        // Keep the bottom cup in the center of the screen
        bottomCup.position.x = 0;
        bottomCup.position.z = 0;
      }

      // Gradually hide the half cup from left to right between 60vh and 100vh
      if (halfCup) {
        if (scrollY <= hideHalfCupStartScroll) {
          halfCup.position.y = -(scrollY / viewportHeight) * 0.25; // Adjust this multiplier for correct speed
        } else {
          halfCup.position.y = -(hideHalfCupStartScroll / viewportHeight) * 0.25;

          const hideProgress = (scrollY - hideHalfCupStartScroll) / (hideHalfCupEndScroll - hideHalfCupStartScroll);
          halfCup.scale.x = 1 - hideProgress; // Scale from 1 to 0

          if (hideProgress >= 1) {
            halfCup.visible = false;
          } else {
            halfCup.visible = true;
          }
        }
      }
    }
  });

  return <primitive object={scene} ref={groupRef} />;
}

export default CupStack;
