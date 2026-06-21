import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FlyingCup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const size = 300; // Bigger size for diagnostics
    const scene = new THREE.Scene();
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 3.5, 7);
    camera.lookAt(0, 0.5, 0);

    const textCanvas = document.createElement('canvas');
    textCanvas.width = 512;
    textCanvas.height = 256;
    const ctx = textCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 512, 256);
      ctx.fillStyle = '#2b1a4a';
      ctx.font = 'bold 54px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AREA 51', 256, 128);
    }
    const logoTexture = new THREE.CanvasTexture(textCanvas);

    const cupMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.5, 
      side: THREE.DoubleSide
    });

    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.6, 0));
    points.push(new THREE.Vector2(0.7, 0.08));
    points.push(new THREE.Vector2(0.72, 0.1));
    points.push(new THREE.Vector2(1.1, 1.1));
    points.push(new THREE.Vector2(1.2, 1.4));
    points.push(new THREE.Vector2(1.16, 1.4));
    points.push(new THREE.Vector2(1.06, 1.1));
    points.push(new THREE.Vector2(0.66, 0.14));
    points.push(new THREE.Vector2(0, 0.12));

    const cupBodyGeo = new THREE.LatheGeometry(points, 64);
    const cupBody = new THREE.Mesh(cupBodyGeo, cupMaterial);
    const cupGroup = new THREE.Group();
    cupGroup.add(cupBody);

    const handleGeo = new THREE.TorusGeometry(0.35, 0.09, 16, 64, Math.PI * 1.2);
    const handle = new THREE.Mesh(handleGeo, cupMaterial);
    handle.position.set(1.05, 0.7, 0);
    handle.rotation.z = -Math.PI / 0.75;
    cupGroup.add(handle);

    const logoGeo = new THREE.CylinderGeometry(1.11, 1.11, 0.6, 32, 1, true, -Math.PI / 4, Math.PI / 2);
    const logoMat = new THREE.MeshPhysicalMaterial({
      map: logoTexture,
      transparent: true,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 0.65, 0);
    logoMesh.rotation.y = Math.PI;
    cupGroup.add(logoMesh);

    const coffeeGeo = new THREE.CylinderGeometry(1.08, 0.95, 0.1, 32);
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x4a2c11, roughness: 0.2 });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.position.set(0, 1.22, 0);
    cupGroup.add(coffee);

    scene.add(cupGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    cupGroup.position.y = -0.4;

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cupGroup.rotation.y += 0.01; // Continuous spin
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      cupBodyGeo.dispose();
      handleGeo.dispose();
      logoGeo.dispose();
      coffeeGeo.dispose();
      cupMaterial.dispose();
      logoMat.dispose();
      coffeeMat.dispose();
      logoTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: 300, 
        height: 300, 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        pointerEvents: 'none',
        zIndex: 99999,
        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Soft red box to prove container exists
        borderRadius: '50%'
      }} 
    />
  );
}