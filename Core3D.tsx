import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Core3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Central Quantum Core Sphere
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Inner glowing sphere wireframe
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    sphereGroup.add(innerCore);

    // Outer dense particle cloud (Core energy)
    const particleCount = 250;
    const coreParticleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f2fe);
    const color2 = new THREE.Color(0xff007f);

    for (let i = 0; i < particleCount; i++) {
      // Procedural sphere mapping (Fibonacci lattice)
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 2.6 + Math.random() * 0.4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    coreParticleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    coreParticleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom star point texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(0, 242, 254, 0.8)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const dotTexture = new THREE.CanvasTexture(canvas);

    const coreParticlesMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const coreParticles = new THREE.Points(coreParticleGeo, coreParticlesMat);
    sphereGroup.add(coreParticles);

    // 4. Counter-rotating outer rings (Orbit 1 & Orbit 2)
    const ringGroup1 = new THREE.Group();
    const ringGroup2 = new THREE.Group();
    scene.add(ringGroup1);
    scene.add(ringGroup2);

    ringGroup1.rotation.x = Math.PI / 4;
    ringGroup1.rotation.y = Math.PI / 6;
    ringGroup2.rotation.x = -Math.PI / 3;
    ringGroup2.rotation.y = -Math.PI / 6;

    // Ring 1 setup (Cyan orbit)
    const ringCount = 180;
    const rGeometry1 = new THREE.BufferGeometry();
    const rPos1 = new Float32Array(ringCount * 3);
    const radiusRing1 = 4.5;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const dev = (Math.random() - 0.5) * 0.2;
      rPos1[i * 3] = (radiusRing1 + dev) * Math.cos(angle);
      rPos1[i * 3 + 1] = dev;
      rPos1[i * 3 + 2] = (radiusRing1 + dev) * Math.sin(angle);
    }
    rGeometry1.setAttribute("position", new THREE.BufferAttribute(rPos1, 3));
    const ringMat1 = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.22,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringParticles1 = new THREE.Points(rGeometry1, ringMat1);
    ringGroup1.add(ringParticles1);

    // Ring 2 setup (Purple/Pink orbit)
    const rGeometry2 = new THREE.BufferGeometry();
    const rPos2 = new Float32Array(ringCount * 3);
    const radiusRing2 = 5.2;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const dev = (Math.random() - 0.5) * 0.25;
      rPos2[i * 3] = (radiusRing2 + dev) * Math.cos(angle);
      rPos2[i * 3 + 1] = (radiusRing2 + dev) * Math.sin(angle);
      rPos2[i * 3 + 2] = dev;
    }
    rGeometry2.setAttribute("position", new THREE.BufferAttribute(rPos2, 3));
    const ringMat2 = new THREE.PointsMaterial({
      color: 0xff007f,
      size: 0.22,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringParticles2 = new THREE.Points(rGeometry2, ringMat2);
    ringGroup2.add(ringParticles2);

    // 5. Ambient Lights
    const directLight1 = new THREE.DirectionalLight(0x00f2fe, 3);
    directLight1.position.set(5, 5, 5);
    scene.add(directLight1);

    const directLight2 = new THREE.DirectionalLight(0x7f00ff, 2);
    directLight2.position.set(-5, -5, -5);
    scene.add(directLight2);

    // 6. Interactive Mouse Tracking & Drag Variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    let isMouseOver = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseEnter = () => {
      setIsHovered(true);
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      isMouseOver = false;
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;

      if (isMouseOver && !isDragging) {
        // Core tilts toward mouse cursor
        targetRotationY = x * 1.5;
        targetRotationX = y * 1.5;
      }

      // Drag action
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        sphereGroup.rotation.y += deltaX * 0.01;
        sphereGroup.rotation.x += deltaY * 0.01;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch Support for Mobile Dragging
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastMouseX;
        const deltaY = e.touches[0].clientY - lastMouseY;

        sphereGroup.rotation.y += deltaX * 0.015;
        sphereGroup.rotation.x += deltaY * 0.015;

        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 7. Render Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous autonomous rotation
      if (!isDragging) {
        // Interpolate tilt towards cursor
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;

        sphereGroup.rotation.x = currentRotationX + time * 0.12;
        sphereGroup.rotation.y = currentRotationY + time * 0.18;
      }

      // Spin rings in counter directions
      ringGroup1.rotation.y += delta * 0.25;
      ringGroup2.rotation.z -= delta * 0.18;

      // Pulse the central wireframe size slightly for "energy heartbeat" feel
      const scaleVal = 1 + Math.sin(time * 3) * 0.04;
      innerCore.scale.set(scaleVal, scaleVal, scaleVal);

      // Pulse color light intensities
      directLight1.intensity = 3 + Math.sin(time * 5) * 1.0;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };

    render();

    // 8. Disposal & Cleanup
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerGeo.dispose();
      innerMat.dispose();
      coreParticleGeo.dispose();
      coreParticlesMat.dispose();
      rGeometry1.dispose();
      ringMat1.dispose();
      rGeometry2.dispose();
      ringMat2.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, [isDragging]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div
        ref={containerRef}
        id="3d-core-canvas-container"
        className={`w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full transition-all duration-700 ${
          isDragging ? "scale-95 cursor-grabbing" : "cursor-grab"
        } ${isHovered ? "drop-shadow-[0_0_50px_rgba(0,242,254,0.3)] scale-105" : ""}`}
      />
      
      {/* Floating UI telemetry ring overlays around core */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-brand-cyan/20 animate-slow-spin opacity-40 border-dashed" />
        <div className="absolute w-[290px] h-[290px] sm:w-[440px] sm:h-[440px] rounded-full border border-brand-purple/10 animate-[slow-spin_35s_linear_infinite_reverse] opacity-30" />
        <div className="absolute w-[350px] h-[350px] sm:w-[520px] sm:h-[520px] rounded-full border border-brand-pink/5 animate-slow-spin opacity-20 border-dotted" />
      </div>

      {/* Floating instructions */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-gray-400 tracking-wider flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
        DRAG TO SPIN REACTOR • HOVER TO FOCUS ENERGY
      </div>
    </div>
  );
}
