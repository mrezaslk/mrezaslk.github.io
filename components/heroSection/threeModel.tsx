import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

export function ThreeModel({
  sectionRef,
  onLoaded,
}: {
  sectionRef: React.RefObject<HTMLDivElement>;
  onLoaded?: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    if (!mountRef.current || !sectionRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Fixed aspect ratio for square canvas
      0.1,
      1000,
    );
    camera.position.z = 4.5; // Closer to see the model better

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(1000, 1000); // Increased from 800x800 to 1000x1000
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;

    // Style the canvas element directly
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "50%";
    renderer.domElement.style.left = "50%";
    renderer.domElement.style.width = "1000px"; // Increased from 800px
    renderer.domElement.style.height = "1000px"; // Increased from 800px
    renderer.domElement.style.pointerEvents = "none";

    // Add responsive scaling
    const updateCanvasSize = () => {
      const scale =
        window.innerWidth < 768 ? 0.8 : window.innerWidth < 1024 ? 1 : 1.2; // Increased scale values
      renderer.domElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    mountRef.current.appendChild(renderer.domElement);

    // Ambient light — soft white glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // white with stronger intensity
    scene.add(ambientLight);

    // Directional light — clean white spotlight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // was yellow
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Secondary point light — subtle fill
    const secondaryLight = new THREE.PointLight(0xffffff, 0.4, 10); // was grayish
    secondaryLight.position.set(-3, 2, 3);
    scene.add(secondaryLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "/models/3d_clipart_webdev.glb", // Your 3D webdev model
      (gltf: { scene: any; animations: any[] }) => {
        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale model to fit - make it bigger
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim; // Increased from 2 to 2.5 for bigger model
        model.scale.setScalar(scale);

        // Setup animations if the model has them
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          animationRef.current = mixer;

          // Play all animations
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }

        // Mark three model as loaded
        onLoaded?.();
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100,
          "%",
        );
      },
      (error) => {
        console.error("Error loading model:", error);
        // Still mark as loaded even if there's an error
        onLoaded?.();
      },
    );

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current || !modelRef.current) return;

      const mousePositionX = event.clientX;
      const mappedRotation = gsap.utils.mapRange(
        0,
        sectionRef.current.offsetWidth,
        -Math.PI,
        Math.PI,
        mousePositionX,
      );

      gsap.to(modelRef.current.rotation, {
        y: mappedRotation,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const sectionElement = sectionRef.current;
    sectionElement.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update animations
      if (animationRef.current) {
        const delta = clockRef.current.getDelta();
        animationRef.current.update(delta);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!renderer) return;
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Update canvas scaling
      const scale =
        window.innerWidth < 768 ? 0.8 : window.innerWidth < 1024 ? 1 : 1.2; // Increased scale values
      renderer.domElement.style.transform = `translate(150%, 150%) scale(${scale})`;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (modelRef.current?.rotation) {
        gsap.killTweensOf(modelRef.current.rotation);
      }
      sectionElement.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }

      if (animationRef.current) {
        animationRef.current.stopAllAction();
      }
    };
  }, [sectionRef, onLoaded]);

  return (
    <div className="pointer-events-none absolute -top-28 left-[34.4%] z-[9999]">
      <div ref={mountRef} className="relative h-full w-full" />
    </div>
  );
}
