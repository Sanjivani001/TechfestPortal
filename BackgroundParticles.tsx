import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 35;
    camera.position.y = 5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Create floating particle constellation
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color("#00f2fe");
    const purpleColor = new THREE.Color("#7f00ff");
    const pinkColor = new THREE.Color("#ff007f");

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a large space
      positions[i * 3] = (Math.random() - 0.5) * 120; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

      // Distribute random glowing colors
      const r = Math.random();
      let col = cyanColor;
      if (r > 0.66) {
        col = purpleColor;
      } else if (r > 0.33) {
        col = pinkColor;
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // 5. Create a futuristic grid structure
    const gridGeometry = new THREE.PlaneGeometry(120, 120, 30, 30);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x7f00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const floorGrid = new THREE.Mesh(gridGeometry, gridMaterial);
    floorGrid.rotation.x = -Math.PI / 2;
    floorGrid.position.y = -15;
    scene.add(floorGrid);

    // 6. Interactive lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 2, 50);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    // 7. Event listeners for mouse interaction and scroll
    let mouseX = 0;
    let mouseY = 0;
    let scrollPercent = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = "scrollTop";
      const sh = "scrollHeight";
      scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // 8. Handle window resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation render loop
    let reqId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow rotational drift of background stars
      starField.rotation.y = elapsedTime * 0.015;
      starField.rotation.x = elapsedTime * 0.005;

      // Rotate floor grid
      floorGrid.rotation.z = -elapsedTime * 0.01;

      // Mouse tracking inertia (interpolated camera movement)
      const targetCamX = mouseX * 8;
      const targetCamY = 5 - (mouseY * 8) - (scrollPercent * 15); // camera shifts down as scroll goes down
      const targetCamZ = 35 - (scrollPercent * 15); // camera zooms in as user scrolls

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      // Point camera at center with subtle lag
      camera.lookAt(new THREE.Vector3(0, -scrollPercent * 8, 0));

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(render);
    };

    render();

    // 10. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(reqId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="3d-background-container"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
