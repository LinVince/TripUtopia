"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Box } from "@mui/material";

interface AnimatedPointSphereProps {
  width: number;
  height: number;
}

const AnimatedPointSphere: React.FC<AnimatedPointSphereProps> = ({
  width,
  height,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mountRef.current === null) return;

    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      4 / 3, // Set aspect ratio based on specific dimensions
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); // Set to specific dimensions
    mountRef.current.appendChild(renderer.domElement);

    // Create the sphere with points
    const createPointSphere = (radius: number, pointCount: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pointCount * 3);

      for (let i = 0; i < pointCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        positions.set([x, y, z], i * 3);
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      return geometry;
    };

    const pointCount = 1000;
    const radius = 5;
    const geometry = createPointSphere(radius, pointCount);
    const material = new THREE.PointsMaterial({ color: 0x040a2e, size: 0.05 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Position the camera
    camera.position.z = 10;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // GSAP Animation
      gsap.to(points.rotation, {
        y: "+=2 * Math.PI",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
      renderer.setClearColor(0xffffff);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <Box
      ref={mountRef}
      display="flex"
      justifyContent="center"
      sx={{ width: "100%", height: "auto" }}
    />
  );
};

export default AnimatedPointSphere;
