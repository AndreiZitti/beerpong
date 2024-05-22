import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CupStack from './CupStack';

function App() {
  const scrollYRef = useRef(0);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    scrollYRef.current = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '30000vh', backgroundColor: 'black' }}>  {/* Increased height */}
      <Canvas 
        style={{ background: 'black', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
        camera={{ position: [0.5, 0, 0.8], fov: 35 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CupStack scrollYRef={scrollYRef} />
          <OrbitControls enableZoom={false} />  {/* Disable zoom on touchpad scroll */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
