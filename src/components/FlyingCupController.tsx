import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FlyingCupController() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Core Scene & High-Performance WebGL Engine Configurations
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance", // Forces dedicated GPU use
      precision: "mediump"                 // Dramatically cuts down shader compilation lag
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped at 1.5 to save mobile GPUs
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6; 
    mountRef.current.appendChild(renderer.domElement);

    // 2. Camera Rig
    const camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    // 3. Static Environment Mapping (Generated ONCE outside the loop)
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 256; envCanvas.height = 256;
    const envCtx = envCanvas.getContext('2d');
    if (envCtx) {
      const grad = envCtx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#ffffff');
      grad.addColorStop(0.5, '#888888');
      grad.addColorStop(0.8, '#111111');
      envCtx.fillStyle = grad; envCtx.fillRect(0, 0, 256, 256);
    }
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;

    // 4. Optimized Physical Materials Construction
    // FIXED: Using rough/metal workflows instead of expensive refraction transmission layers
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.0,
      metalness: 0.1,
      envMap: envTexture,
      envMapIntensity: 2.0,
      side: THREE.FrontSide // Renders only the front faces, saving 50% computing power
    });

    const liquidCanvas = document.createElement('canvas');
    liquidCanvas.width = 256; liquidCanvas.height = 512;
    const liqCtx = liquidCanvas.getContext('2d');
    if (liqCtx) {
      const grad = liqCtx.createLinearGradient(0, 512, 0, 0);
      grad.addColorStop(0, '#1c0c04'); 
      grad.addColorStop(0.25, '#2e1407');
      grad.addColorStop(0.40, '#5c3114'); 
      grad.addColorStop(0.60, '#aa7442');
      grad.addColorStop(0.72, '#cca37a');
      grad.addColorStop(0.76, '#eae5df'); 
      grad.addColorStop(0.82, '#f6f4f0');
      grad.addColorStop(1, '#ffffff');
      liqCtx.fillStyle = grad; liqCtx.fillRect(0, 0, 256, 512);
    }
    const liquidTexture = new THREE.CanvasTexture(liquidCanvas);

    const liquidMaterial = new THREE.MeshStandardMaterial({
      map: liquidTexture,
      roughness: 0.2,
      metalness: 0.0,
      envMap: envTexture,
      envMapIntensity: 0.5
    });

    const strawMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.1,
      metalness: 0.1,
      envMap: envTexture,
      envMapIntensity: 1.0
    });

    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2216,
      roughness: 0.5
    });

    // 5. Build Model Hierarchy
    const masterGlassGroup = new THREE.Group();

    // Glass Outer Shell
    const glassPoints = [
      new THREE.Vector2(0, -1.2),
      new THREE.Vector2(0.58, -1.2),
      new THREE.Vector2(0.62, -1.1),
      new THREE.Vector2(0.66, 1.2),
      new THREE.Vector2(0, 1.2)
    ];
    const glassGeo = new THREE.LatheGeometry(glassPoints, 48); // Optimized segment counts
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    masterGlassGroup.add(glassMesh);

    // Liquid Core
    const liquidPoints = [
      new THREE.Vector2(0, -1.01),
      new THREE.Vector2(0.575, -1.01),
      new THREE.Vector2(0.645, 1.18),
      new THREE.Vector2(0, 1.18)
    ];
    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 48);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
    masterGlassGroup.add(liquidMesh);

    // Drinking Straw
    const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.7, 8, 1, true);
    const strawMesh = new THREE.Mesh(strawGeo, strawMaterial);
    strawMesh.position.set(0.18, 0.3, 0);
    strawMesh.rotation.set(0, 0, -0.18);
    masterGlassGroup.add(strawMesh);

    // Floating Cocoa Beans Array
    const beansGroup = new THREE.Group();
    const beanGeo = new THREE.SphereGeometry(0.12, 8, 8); // Scaled back vertex intensity
    beanGeo.scale(1.6, 1.0, 0.9);
    
    const beanData: { mesh: THREE.Mesh; offset: number }[] = [];
    const totalBeans = 6; // Dropped count slightly for massive rendering relief

    for (let i = 0; i < totalBeans; i++) {
      const beanMesh = new THREE.Mesh(beanGeo, beanMaterial);
      const angle = (i / totalBeans) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 1.1 + Math.random() * 0.4;
      const height = -0.7 + Math.random() * 1.6;
      
      beanMesh.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      beanMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      beansGroup.add(beanMesh);
      beanData.push({ mesh: beanMesh, offset: i * 2.5 });
    }
    masterGlassGroup.add(beansGroup);

    const wrapperPivot = new THREE.Group();
    wrapperPivot.add(masterGlassGroup);
    scene.add(wrapperPivot);

    // Lights Array
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const mainStudioKey = new THREE.DirectionalLight(0xffffff, 2.5);
    mainStudioKey.position.set(5, 10, 5);
    scene.add(mainStudioKey);

    // 6. Direct Viewport Bounds Synchronization Engine (Throttled Coordinates calculation)
    let currentX = -2.0, currentY = 1.9, currentScale = 0.1;
    let targetX = -2.0, targetY = 1.9, targetScale = 0.1;
    let targetRotX = 0.15, targetRotY = -0.4, targetRotZ = 0;
    let targetOpacity = 1;
    
    let isScrolling = false;
    let scrollTimeout: number;
    let autoSpinY = -0.4;

    const screenToWorld = (screenX: number, screenY: number) => {
      const vector = new THREE.Vector3(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(distance));
    };

    // Storing fixed anchor points statically to stop runtime layout polling hammering
    let pNav = { x: -2.1, y: 1.95, scale: 0.15, rx: 0.15, ry: -0.4, rz: 0 };
    let pMenu = { x: 2.3, y: 0.5, scale: 0.3, rx: 0.25, ry: Math.PI * 0.4, rz: 0.04 };
    let pAbout = { x: 2.3, y: -0.5, scale: 0.3, rx: 0.20, ry: -Math.PI * 0.3, rz: -0.04 };
    let pGallery = { x: -2.4, y: -1.5, scale: 0.3, rx: 0.12, ry: Math.PI * 0.1, rz: 0.02 };
    let pFindUs = { x: 2.4, y: -2.5, scale: 0.3, rx: 0.22, ry: -0.4, rz: 0 };

    const recalculateAnchors = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const baseScale = isMobile ? 0.22 : 0.36;

      pNav = { x: isMobile ? -1.1 : -2.1, y: isMobile ? 1.6 : 1.95, scale: baseScale * 0.42, rx: 0.15, ry: -0.4, rz: 0 };
      pMenu = { x: 2.3, y: 0.5, scale: baseScale * 0.82, rx: 0.25, ry: Math.PI * 0.4, rz: 0.04 };
      pAbout = { x: 2.3, y: -0.5, scale: baseScale * 0.82, rx: 0.20, ry: -Math.PI * 0.3, rz: -0.04 };
      pGallery = { x: -2.4, y: -1.5, scale: baseScale * 0.80, rx: 0.12, ry: Math.PI * 0.1, rz: 0.02 };
      pFindUs = { x: 2.4, y: -2.5, scale: baseScale * 0.78, rx: 0.22, ry: -0.4, rz: 0 };

      const anchorMenu = document.getElementById('cup-anchor-menu');
      const anchorAbout = document.getElementById('cup-anchor-about');
      const anchorGallery = document.getElementById('cup-anchor-gallery');
      const anchorFindUs = document.getElementById('cup-anchor-findus');

      if (anchorMenu) { const r = anchorMenu.getBoundingClientRect(); const pt = screenToWorld(r.left + r.width / 2 + (isMobile ? 35 : 185), window.innerHeight/2); pMenu.x = pt.x; }
      if (anchorAbout) { const r = anchorAbout.getBoundingClientRect(); const pt = screenToWorld(r.left + r.width / 2 + (isMobile ? 35 : 185), window.innerHeight/2); pAbout.x = pt.x; }
      if (anchorGallery) { const r = anchorGallery.getBoundingClientRect(); const pt = screenToWorld(r.left + r.width / 2 - (isMobile ? 35 : 185), window.innerHeight/2); pGallery.x = pt.x; }
      if (anchorFindUs) { const r = anchorFindUs.getBoundingClientRect(); const pt = screenToWorld(r.left + r.width / 2 + (isMobile ? 35 : 185), window.innerHeight/2); pFindUs.x = pt.x; }
    };

    window.addEventListener('resize', recalculateAnchors);
    setTimeout(recalculateAnchors, 100);

    const runViewportBoundSynchronizer = () => {
      const h = window.innerHeight;
      const anchorMenu = document.getElementById('cup-anchor-menu');
      const anchorAbout = document.getElementById('cup-anchor-about');
      const anchorGallery = document.getElementById('cup-anchor-gallery');
      const anchorFindUs = document.getElementById('cup-anchor-findus');

      targetOpacity = 1;
      let targetState = 'navbar';
      let progress = 0;

      if (anchorFindUs && anchorFindUs.getBoundingClientRect().top < h * 0.85) {
        targetState = 'findus';
        const rect = anchorFindUs.getBoundingClientRect(); progress = Math.max(0, Math.min(1, (h * 0.85 - rect.top) / (rect.height || 1)));
      } else if (anchorGallery && anchorGallery.getBoundingClientRect().top < h * 0.85) {
        targetState = 'gallery';
        const rect = anchorGallery.getBoundingClientRect(); progress = Math.max(0, Math.min(1, (h * 0.85 - rect.top) / (rect.height || 1)));
      } else if (anchorAbout && anchorAbout.getBoundingClientRect().top < h * 0.85) {
        targetState = 'about';
        const rect = anchorAbout.getBoundingClientRect(); progress = Math.max(0, Math.min(1, (h * 0.85 - rect.top) / (rect.height || 1)));
      } else if (anchorMenu && anchorMenu.getBoundingClientRect().top < h * 0.85) {
        targetState = 'menu';
        const rect = anchorMenu.getBoundingClientRect(); progress = Math.max(0, Math.min(1, (h * 0.85 - rect.top) / (rect.height || 1)));
      }

      if (targetState === 'navbar') {
        targetX = pNav.x; targetY = pNav.y; targetScale = pNav.scale; targetRotX = pNav.rx; targetRotZ = pNav.rz; targetRotY = isScrolling ? pNav.ry : autoSpinY;
      } else if (targetState === 'menu') {
        targetX = THREE.MathUtils.lerp(pNav.x, pMenu.x, progress); targetY = THREE.MathUtils.lerp(pNav.y, pMenu.y, progress);
        targetScale = THREE.MathUtils.lerp(pNav.scale, pMenu.scale, progress); targetRotX = THREE.MathUtils.lerp(pNav.rx, pMenu.rx, progress);
        targetRotZ = THREE.MathUtils.lerp(pNav.rz, pMenu.rz, progress); targetRotY = isScrolling ? THREE.MathUtils.lerp(pNav.ry, pMenu.ry, progress) : autoSpinY;
      } else if (targetState === 'about') {
        targetRotX = THREE.MathUtils.lerp(pMenu.rx, pAbout.rx, progress); targetRotZ = THREE.MathUtils.lerp(pMenu.rz, pAbout.rz, progress);
        targetScale = THREE.MathUtils.lerp(pMenu.scale, pAbout.scale, progress); targetRotY = isScrolling ? THREE.MathUtils.lerp(pMenu.ry, pAbout.ry, progress) : autoSpinY;
        if (progress < 0.4) {
          const t = progress / 0.4; targetX = THREE.MathUtils.lerp(pMenu.x, 4, t); targetY = THREE.MathUtils.lerp(pMenu.y, pMenu.y - 0.5, t); targetOpacity = THREE.MathUtils.lerp(1, 0, t);
        } else {
          const t = (progress - 0.4) / 0.6; targetX = THREE.MathUtils.lerp(-4, pAbout.x, t); targetY = THREE.MathUtils.lerp(pAbout.y + 0.5, pAbout.y, t); targetOpacity = THREE.MathUtils.lerp(0, 1, t);
        }
      } else if (targetState === 'gallery') {
        targetX = THREE.MathUtils.lerp(pAbout.x, pGallery.x, progress); targetY = THREE.MathUtils.lerp(pAbout.y, pGallery.y, progress);
        targetScale = THREE.MathUtils.lerp(pAbout.scale, pGallery.scale, progress); targetRotX = THREE.MathUtils.lerp(pAbout.rx, pGallery.rx, progress);
        targetRotZ = THREE.MathUtils.lerp(pAbout.rz, pGallery.rz, progress); targetRotY = isScrolling ? THREE.MathUtils.lerp(pAbout.ry, pGallery.ry, progress) : autoSpinY;
      } else if (targetState === 'findus') {
        targetRotX = THREE.MathUtils.lerp(pGallery.rx, pFindUs.rx, progress); targetRotZ = THREE.MathUtils.lerp(pGallery.rz, pFindUs.rz, progress);
        targetScale = THREE.MathUtils.lerp(pGallery.scale, pFindUs.scale, progress); targetRotY = isScrolling ? THREE.MathUtils.lerp(pGallery.ry, pFindUs.ry, progress) : autoSpinY;
        if (progress < 0.4) {
          const t = progress / 0.4; targetX = THREE.MathUtils.lerp(pGallery.x, -4, t); targetY = THREE.MathUtils.lerp(pGallery.y, pGallery.y - 0.5, t); targetOpacity = THREE.MathUtils.lerp(1, 0, t);
        } else {
          const t = (progress - 0.4) / 0.6; targetX = THREE.MathUtils.lerp(4, pFindUs.x, t); targetY = THREE.MathUtils.lerp(pFindUs.y + 0.5, pFindUs.y, t); targetOpacity = THREE.MathUtils.lerp(0, 1, t);
        }
      }
    };

    // 7. Stable Framerate Integration Loop (Optimized math equations)
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = performance.now();
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      runViewportBoundSynchronizer();

      const posEase = 0.12; 
      const rotEase = 0.08;

      currentX += (targetX - currentX) * posEase;
      currentY += (targetY - currentY) * posEase;
      wrapperPivot.position.set(currentX, currentY, 0);

      currentScale = THREE.MathUtils.lerp(currentScale, targetScale, posEase);
      wrapperPivot.scale.set(currentScale, currentScale, currentScale);

      autoSpinY += 0.005; 

      wrapperPivot.rotation.x += (targetRotX - wrapperPivot.rotation.x) * rotEase;
      wrapperPivot.rotation.z += (targetRotZ - wrapperPivot.rotation.z) * rotEase;

      if (Math.abs(targetRotY - wrapperPivot.rotation.y) < Math.PI) {
        wrapperPivot.rotation.y += (targetRotY - wrapperPivot.rotation.y) * rotEase;
      } else {
        wrapperPivot.rotation.y = targetRotY;
      }

      // Smooth floating animation using pre-computed math offsets
      const waveTime = time * 0.0015;
      for (let i = 0; i < beanData.length; i++) {
        const bean = beanData[i];
        bean.mesh.position.y += Math.sin(waveTime + bean.offset) * 0.001;
        bean.mesh.rotation.x += 0.003;
        bean.mesh.rotation.y += 0.004;
      }

      glassMaterial.opacity = THREE.MathUtils.lerp(glassMaterial.opacity, targetOpacity * 0.35, posEase);
      liquidMaterial.opacity = THREE.MathUtils.lerp(liquidMaterial.opacity, targetOpacity, posEase);
      strawMaterial.opacity = THREE.MathUtils.lerp(strawMaterial.opacity, targetOpacity, posEase);
      beanMaterial.opacity = THREE.MathUtils.lerp(beanMaterial.opacity, targetOpacity, posEase);

      renderer.render(scene, camera);
    };
    animate();

    const handleScrollState = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
        autoSpinY = wrapperPivot.rotation.y; 
      }, 100);
    };
    window.addEventListener('scroll', handleScrollState);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScrollState);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', recalculateAnchors);
      clearTimeout(scrollTimeout);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      glassGeo.dispose();
      liquidGeo.dispose();
      strawGeo.dispose();
      beanGeo.dispose();
      glassMaterial.dispose();
      liquidMaterial.dispose();
      strawMaterial.dispose();
      beanMaterial.dispose();
      liquidTexture.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 9999, 
        pointerEvents: 'none',
        userSelect: 'none'
      }} 
    />
  );
}