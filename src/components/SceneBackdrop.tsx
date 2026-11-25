import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { IMAGE_ASSETS } from '../data/menuData';
import type { PageId } from '../types';

interface SceneBackdropProps {
  activePage: PageId;
  pageScrollProgress: number;
  reducedMotion: boolean;
}

interface SceneUpdateParams {
  progress: number;
  elapsed: number;
  dt: number;
  mouseX: number;
  mouseY: number;
  motionMult: number;
  camera: THREE.PerspectiveCamera;
}

interface ManagedScene {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  update: (params: SceneUpdateParams) => void;
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.35, 'rgba(240, 255, 220, 0.55)');
    grad.addColorStop(0.7, 'rgba(180, 235, 140, 0.14)');
    grad.addColorStop(1, 'rgba(180, 235, 140, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createLeafTexture(anisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    ctx.save();
    ctx.translate(128, 230.4);
    const grad = ctx.createLinearGradient(0, 0, 0, -204.8);
    grad.addColorStop(0, '#092B20');
    grad.addColorStop(0.45, '#0F4533');
    grad.addColorStop(0.85, '#C89B3C');
    grad.addColorStop(1, '#F5C451');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(64, -36, 78, -110, 0, -199.68);
    ctx.bezierCurveTo(-78, -110, -64, -36, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 196, 81, 0.52)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(0, -184.32);
    ctx.stroke();
    ctx.lineWidth = 1.4;
    for (let i = 1; i <= 5; i++) {
      const y = -i * 28;
      const w = (6 - i) * 9;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(w * 0.6, y - 10, w, y - 22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(-w * 0.6, y - 10, -w, y - 22);
      ctx.stroke();
    }
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  return tex;
}

function createSolidTexture(hex: string): THREE.DataTexture {
  const c = new THREE.Color(hex);
  const data = new Uint8Array([
    Math.round(c.r * 255),
    Math.round(c.g * 255),
    Math.round(c.b * 255),
    255,
  ]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildHomeScene(anisotropy: number): ManagedScene {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const glowTex = createGlowTexture();
  const leafTex = createLeafTexture(anisotropy);
  const t1 = createSolidTexture('#0B1E13');
  const t2 = createSolidTexture('#0E2A19');
  const t3 = createSolidTexture('#091910');
  const t4 = createSolidTexture('#0D2417');
  disposables.push(glowTex, leafTex, t1, t2, t3, t4);

  const uniforms = {
    uTex1: { value: t1 as THREE.Texture },
    uTex2: { value: t2 as THREE.Texture },
    uTex3: { value: t3 as THREE.Texture },
    uTex4: { value: t4 as THREE.Texture },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uParallax: { value: new THREE.Vector2(0, 0) },
  };

  const loader = new THREE.TextureLoader();
  const loadStage = (url: string, key: 'uTex1' | 'uTex2' | 'uTex3' | 'uTex4') => {
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = anisotropy;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      uniforms[key].value = tex;
      disposables.push(tex);
    });
  };
  loadStage(IMAGE_ASSETS.chickenQorma, 'uTex1');
  loadStage(IMAGE_ASSETS.chickenAchaari, 'uTex2');
  loadStage(IMAGE_ASSETS.chickenBiryani, 'uTex3');
  loadStage(IMAGE_ASSETS.mutanjanZarda, 'uTex4');

  const bgGeo = new THREE.PlaneGeometry(25, 14.5, 28, 18);
  const pos = bgGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, x * x * 0.015 + y * y * 0.012);
  }
  bgGeo.computeVertexNormals();

  const bgMat = new THREE.ShaderMaterial({
    uniforms,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTex1;
      uniform sampler2D uTex2;
      uniform sampler2D uTex3;
      uniform sampler2D uTex4;
      uniform float uProgress;
      uniform float uTime;
      uniform vec2 uParallax;
      varying vec2 vUv;
      vec2 coverUv(vec2 uv, float zoom, vec2 pan) {
        vec2 centered = (uv - 0.5) / zoom + 0.5 + pan;
        return clamp(centered, 0.002, 0.998);
      }
      void main() {
        float heatMask = smoothstep(0.95, 0.05, vUv.y);
        float shimmerX = sin(vUv.y * 28.0 - uTime * 2.6 - uProgress * 18.0) * 0.0028 * heatMask;
        float shimmerY = cos(vUv.x * 20.0 + uTime * 2.0 + uProgress * 14.0) * 0.0018 * heatMask;
        float zoom = 1.08 + abs(sin(uProgress * 9.4247)) * 0.14;
        vec2 scrollPan = vec2(sin(uProgress * 12.566) * 0.032, cos(uProgress * 9.42) * 0.022);
        vec2 pan = uParallax * 0.026 + scrollPan + vec2(shimmerX, shimmerY);
        vec2 uv = coverUv(vUv, zoom, pan);
        float cycle = mod(uProgress * 2.35, 1.0) * 4.0;
        vec3 va = texture2D(uTex1, uv).rgb;
        vec3 vb = texture2D(uTex2, uv).rgb;
        vec3 vc = texture2D(uTex3, uv).rgb;
        vec3 vd = texture2D(uTex4, uv).rgb;
        vec3 col = va;
        if (cycle < 1.0) {
          float k = smoothstep(0.05, 0.95, cycle);
          col = mix(va, vb, k);
          col *= mix(vec3(0.88, 1.02, 0.86), vec3(0.84, 1.08, 0.84), k);
        } else if (cycle < 2.0) {
          float k = smoothstep(0.05, 0.95, cycle - 1.0);
          col = mix(vb, vc, k);
          col *= mix(vec3(0.84, 1.08, 0.84), vec3(0.94, 1.0, 0.88), k);
        } else if (cycle < 3.0) {
          float k = smoothstep(0.05, 0.95, cycle - 2.0);
          col = mix(vc, vd, k);
          col *= mix(vec3(0.94, 1.0, 0.88), vec3(0.96, 1.04, 0.84), k);
        } else {
          float k = smoothstep(0.05, 0.95, cycle - 3.0);
          col = mix(vd, va, k);
          col *= mix(vec3(0.96, 1.04, 0.84), vec3(0.88, 1.02, 0.86), k);
        }
        float dist = length((vUv - 0.5) * vec2(1.1, 1.0));
        float vignette = smoothstep(0.95, 0.22, dist);
        float leftScrim = mix(0.48, 1.0, smoothstep(0.08, 0.62, vUv.x));
        vec3 forestShadow = vec3(0.025, 0.11, 0.08);
        col = mix(forestShadow, col * 0.72 * leftScrim, vignette * 0.86 + 0.14);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const bgMesh = new THREE.Mesh(bgGeo, bgMat);
  bgMesh.position.set(0, 0, -5.4);
  group.add(bgMesh);
  disposables.push(bgGeo, bgMat);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xeab344,
    metalness: 0.9,
    roughness: 0.22,
    transparent: true,
    opacity: 0.38,
  });
  const limeMat = new THREE.MeshStandardMaterial({
    color: 0xd4a64a,
    emissive: 0x855e14,
    emissiveIntensity: 0.42,
    transparent: true,
    opacity: 0.24,
  });
  const torus1Geo = new THREE.TorusGeometry(4.2, 0.028, 12, 100);
  const torus2Geo = new THREE.TorusGeometry(3.15, 0.024, 10, 88);
  const torus1 = new THREE.Mesh(torus1Geo, brassMat);
  const torus2 = new THREE.Mesh(torus2Geo, limeMat);
  torus1.position.set(1.55, 0, -2.8);
  torus2.position.set(1.55, 0, -2.8);
  group.add(torus1, torus2);
  disposables.push(torus1Geo, torus2Geo, brassMat, limeMat);

  const leafGeo = new THREE.PlaneGeometry(0.42, 0.42);
  const leafMat = new THREE.MeshBasicMaterial({
    map: leafTex,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const leafCount = 26;
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
  leaves.frustumCulled = false;
  const leafData = Array.from({ length: leafCount }, (_, i) => ({
    angle: (i / leafCount) * Math.PI * 2,
    radius: 2.2 + (i % 4) * 0.9,
    yBase: ((i % 5) - 2) * 0.8,
    speed: 0.22 + (i % 3) * 0.09,
    scale: 0.65 + (i % 4) * 0.2,
  }));
  group.add(leaves);
  disposables.push(leafGeo, leafMat);

  const dummy = new THREE.Object3D();

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      uniforms.uProgress.value = progress;
      uniforms.uTime.value = elapsed * motionMult;
      uniforms.uParallax.value.set(mouseX, -mouseY);

      torus1.rotation.set(0.6 + progress * 1.4, elapsed * 0.16 * motionMult, 0.25);
      torus2.rotation.set(-0.5 - progress * 1.1, -elapsed * 0.22 * motionMult, -0.3);

      for (let i = 0; i < leafData.length; i++) {
        const d = leafData[i];
        const a = d.angle + elapsed * d.speed * motionMult + progress * 2.4;
        dummy.position.set(
          1.2 + Math.cos(a) * d.radius,
          d.yBase + Math.sin(elapsed * 0.8 + i) * 0.3,
          -3.2 + Math.sin(a) * d.radius * 0.45
        );
        dummy.rotation.set(elapsed * 0.4 + i, a, elapsed * 0.3);
        dummy.scale.setScalar(d.scale);
        dummy.updateMatrix();
        leaves.setMatrixAt(i, dummy.matrix);
      }
      leaves.instanceMatrix.needsUpdate = true;

      camera.position.set(mouseX * 0.36 * motionMult, -mouseY * 0.22 * motionMult, 6.2 - progress * 0.55);
      camera.lookAt(0, 0, -3);
    },
  };
}

function buildOrbitalRingsScene(
  primaryHex: number,
  secondaryHex: number,
  glowHex: number
): ManagedScene {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const domeGeo = new THREE.SphereGeometry(24, 32, 24);
  const domeUniforms = { uTime: { value: 0 }, uProgress: { value: 0 } };
  const domeMat = new THREE.ShaderMaterial({
    uniforms: domeUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      varying vec3 vPos;
      void main() {
        float y = vPos.y;
        float band = sin(vPos.x * 4.2 + uTime * 0.35 + uProgress * 6.0)
                   * cos(vPos.z * 3.2 - uTime * 0.25 + uProgress * 4.0);
        float ribbon = smoothstep(0.12, 0.85, band * 0.5 + 0.5) * exp(-abs(y + 0.04) * 2.8);
        vec3 abyss = vec3(0.02, 0.09, 0.065);
        vec3 canopy = vec3(0.045, 0.19, 0.135);
        vec3 goldGlow = vec3(0.92, 0.70, 0.27);
        vec3 col = mix(abyss, canopy, smoothstep(-0.6, 0.6, y)) + goldGlow * ribbon * 0.22;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  group.add(new THREE.Mesh(domeGeo, domeMat));
  disposables.push(domeGeo, domeMat);

  const wirePlaneGeo = new THREE.PlaneGeometry(32, 24, 32, 24);
  wirePlaneGeo.rotateX(-Math.PI / 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: glowHex,
    wireframe: true,
    transparent: true,
    opacity: 0.14,
  });
  const wireMesh = new THREE.Mesh(wirePlaneGeo, wireMat);
  wireMesh.position.set(0, -2.6, -4);
  group.add(wireMesh);
  disposables.push(wirePlaneGeo, wireMat);

  const m1 = new THREE.MeshStandardMaterial({ color: primaryHex, metalness: 0.9, roughness: 0.2 });
  const m2 = new THREE.MeshStandardMaterial({
    color: secondaryHex,
    emissive: 0x7a5612,
    emissiveIntensity: 0.45,
    metalness: 0.72,
    roughness: 0.24,
  });

  const t1 = new THREE.TorusGeometry(4.2, 0.045, 14, 110);
  const t2 = new THREE.TorusGeometry(3.2, 0.035, 14, 100);
  const t3 = new THREE.TorusGeometry(5.2, 0.03, 14, 120);
  const ring1 = new THREE.Mesh(t1, m1);
  const ring2 = new THREE.Mesh(t2, m2);
  const ring3 = new THREE.Mesh(t3, m1);
  ring1.position.set(0, 0, -3);
  ring2.position.set(0, 0, -3);
  ring3.position.set(0, 0, -3);
  group.add(ring1, ring2, ring3);
  disposables.push(t1, t2, t3, m1, m2);

  const shardGeo = new THREE.OctahedronGeometry(0.18, 0);
  const shardMat = new THREE.MeshPhysicalMaterial({
    color: secondaryHex,
    emissive: 0x855e14,
    emissiveIntensity: 0.35,
    roughness: 0.18,
    metalness: 0.65,
    clearcoat: 1,
  });
  const shardCount = 32;
  const shards = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
  shards.frustumCulled = false;
  const shardMeta = Array.from({ length: shardCount }, (_, i) => ({
    angle: (i / shardCount) * Math.PI * 2,
    radius: 3.1 + (i % 3) * 1.0,
    y: ((i % 6) - 2.5) * 0.65,
    speed: 0.35 + (i % 4) * 0.12,
  }));
  group.add(shards);
  disposables.push(shardGeo, shardMat);

  const dummy = new THREE.Object3D();

  return {
    group,
    disposables,
    update: ({ progress, elapsed, mouseX, mouseY, motionMult, camera }) => {
      domeUniforms.uTime.value = elapsed * motionMult;
      domeUniforms.uProgress.value = progress;
      ring1.rotation.set(0.9 + progress * 1.5, elapsed * 0.28 * motionMult, 0.4);
      ring2.rotation.set(-0.7 - progress * 1.1, -elapsed * 0.36 * motionMult, 0.2);
      ring3.rotation.set(1.2, elapsed * 0.18 * motionMult + progress * 2, -0.5);
      wireMesh.position.z = -4 + ((elapsed * 0.6 * motionMult + progress * 3) % 1);

      for (let i = 0; i < shardMeta.length; i++) {
        const s = shardMeta[i];
        const a = s.angle + elapsed * s.speed * motionMult + progress * 2.5;
        dummy.position.set(
          Math.cos(a) * s.radius,
          s.y + Math.sin(a * 2) * 0.3,
          -3 + Math.sin(a) * s.radius * 0.45
        );
        dummy.rotation.set(elapsed + i, a, elapsed * 0.5);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        shards.setMatrixAt(i, dummy.matrix);
      }
      shards.instanceMatrix.needsUpdate = true;

      camera.position.set(mouseX * 0.4 * motionMult, -mouseY * 0.25 * motionMult, 6.2 - progress * 0.8);
      camera.lookAt(0, 0, -3);
    },
  };
}

export function SceneBackdrop({
  activePage,
  pageScrollProgress,
  reducedMotion,
}: SceneBackdropProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fallbackActive, setFallbackActive] = useState(false);

  const stateRef = useRef({
    activePage,
    prevPage: activePage,
    transitionFade: 0,
    targetProgress: pageScrollProgress,
    smoothProgress: pageScrollProgress,
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    reducedMotion,
  });

  useEffect(() => {
    if (stateRef.current.activePage !== activePage) {
      stateRef.current.prevPage = stateRef.current.activePage;
      stateRef.current.activePage = activePage;
      stateRef.current.transitionFade = 1;
    }
    stateRef.current.targetProgress = pageScrollProgress;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activePage, pageScrollProgress, reducedMotion]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const rendererInfo = ext
          ? ext.UNMASKED_RENDERER_WEBGL
          : gl.RENDERER;
        const rendererName = String(gl.getParameter(rendererInfo));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererName);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareWebGL,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setFallbackActive(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareWebGL ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setFallbackActive(true);
    };
    const onContextRestored = () => setFallbackActive(false);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061e16);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTex.texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 60);
    camera.position.set(0, 0, 6.2);

    const hemi = new THREE.HemisphereLight(0xfdf9ee, 0x061e16, 0.85);
    scene.add(hemi);
    const keyLight = new THREE.DirectionalLight(0xf5c451, 1.45);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xd4a64a, 0.75);
    rimLight.position.set(-5, -2, 3);
    scene.add(rimLight);

    const anisotropy = renderer.capabilities.getMaxAnisotropy();
    const scenes: Record<PageId, ManagedScene> = {
      home: buildHomeScene(anisotropy),
      menu: buildOrbitalRingsScene(0xd4a64a, 0xf5c451, 0xc89b3c),
      health: buildOrbitalRingsScene(0xeab344, 0x15803d, 0xd4a64a),
      orders: buildOrbitalRingsScene(0xf3c969, 0xd4a64a, 0xc89b3c),
      story: buildOrbitalRingsScene(0xeab344, 0x166534, 0xd4a64a),
      branches: buildOrbitalRingsScene(0xf5c451, 0xd4a64a, 0x15803d),
      reserve: buildOrbitalRingsScene(0xd4a64a, 0xf5c451, 0xeab344),
      contact: buildOrbitalRingsScene(0xeab344, 0xf3c969, 0x166534),
      privacy: buildOrbitalRingsScene(0xd4a64a, 0x855e14, 0x14532d),
    };

    (Object.keys(scenes) as PageId[]).forEach((key) => {
      scenes[key].group.visible = key === stateRef.current.activePage;
      scene.add(scenes[key].group);
    });

    const fadeGeo = new THREE.PlaneGeometry(3, 3);
    const fadeMat = new THREE.MeshBasicMaterial({
      color: 0x061e16,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    const fadePlane = new THREE.Mesh(fadeGeo, fadeMat);
    fadePlane.renderOrder = 999;
    camera.add(fadePlane);
    fadePlane.position.set(0, 0, -0.5);
    scene.add(camera);

    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    if (!isSoftwareWebGL) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(Math.floor(width / 2), Math.floor(height / 2)),
        0.34,
        0.55,
        0.74
      );
      composer.addPass(bloomPass);
      renderer.compile(scene, camera);
    }

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer?.setSize(w, h);
      bloomPass?.resolution.set(Math.floor(w / 2), Math.floor(h / 2));
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameHandle = 0;
    let disposed = false;

    const scheduleSoftwareFrame = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameHandle = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const check = () => {
        if (disposed) return;
        const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (status === gl.UNSIGNALED) {
          frameHandle = window.setTimeout(check, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameHandle = window.setTimeout(cb, 80);
        }
      };
      frameHandle = window.setTimeout(check, 5);
    };

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();
      const s = stateRef.current;
      const motionMult = s.reducedMotion ? 0.15 : 1;

      s.smoothProgress = THREE.MathUtils.damp(s.smoothProgress, s.targetProgress, 16, delta);
      s.smoothMouseX = THREE.MathUtils.damp(s.smoothMouseX, s.mouseX, 4.5, delta);
      s.smoothMouseY = THREE.MathUtils.damp(s.smoothMouseY, s.mouseY, 4.5, delta);
      s.transitionFade = THREE.MathUtils.damp(s.transitionFade, 0, 6, delta);

      fadeMat.opacity = s.transitionFade * 0.68;
      fadePlane.visible = fadeMat.opacity > 0.01;

      const clampedProgress = THREE.MathUtils.clamp(s.smoothProgress, 0, 1);
      (Object.keys(scenes) as PageId[]).forEach((key) => {
        const active = key === s.activePage;
        scenes[key].group.visible = active;
        if (active) {
          scenes[key].update({
            progress: clampedProgress,
            elapsed,
            dt: delta,
            mouseX: s.smoothMouseX,
            mouseY: s.smoothMouseY,
            motionMult,
            camera,
          });
        }
      });

      if (isSoftwareWebGL || !composer) {
        renderer.render(scene, camera);
        scheduleSoftwareFrame(tick);
      } else {
        composer.render();
        frameHandle = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareWebGL) {
      scheduleSoftwareFrame(tick);
    } else {
      frameHandle = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameHandle);
      clearTimeout(frameHandle);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      (Object.keys(scenes) as PageId[]).forEach((key) => {
        scenes[key].disposables.forEach((d) => d.dispose());
      });
      fadeGeo.dispose();
      fadeMat.dispose();
      envTex.dispose();
      composer?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (fallbackActive) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#072118] via-[#0B2E22] to-[#051811]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
