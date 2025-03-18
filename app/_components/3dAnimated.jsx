import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import { MathUtils } from 'three';
import styles from '../styles/AnimatedText3D.module.css';

const AnimatedText = ({ text }) => {
  const textRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  
  useFrame((state, delta) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      
      textRef.current.rotation.x = MathUtils.lerp(
        textRef.current.rotation.x,
        targetRotation.current.x,
        0.1
      );
      textRef.current.rotation.y = MathUtils.lerp(
        textRef.current.rotation.y,
        targetRotation.current.y,
        0.1
      );
    }
  });
  
  // Update rotation target on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      targetRotation.current.x = ((clientY - windowHalfY) / windowHalfY) * 0.1;
      targetRotation.current.y = ((clientX - windowHalfX) / windowHalfX) * 0.1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <Center>
      <Text3D 
        ref={textRef}
        font="/fonts/inter_bold.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
};

export default function AnimatedText3D({ text = "VFest" }) {
  return (
    <div className={styles.canvasContainer}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedText text={text} />
      </Canvas>
    </div>
  );
}