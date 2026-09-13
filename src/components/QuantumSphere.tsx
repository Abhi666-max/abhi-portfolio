"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// GLSL Simplex 3D Noise function
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const QuantumMaterial = shaderMaterial(
  {
    uTime: 0,
    uScroll: 0,
    uColorMain: new THREE.Color('#000000'), // Pitch Black core
    uColorAccent: new THREE.Color('#ff3366'), // Magma Orange/Pink
    uColorGlow: new THREE.Color('#ffffff') // Searing White highlights
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;

    ${noiseGLSL}

    void main() {
      vUv = uv;
      vNormal = normal;
      
      // Calculate noise based on position and time
      vec3 noisePos = position * 0.5 + uTime * 0.2;
      
      // Scroll intensity makes the noise wilder and sharper
      float scrollFactor = 1.0 + (uScroll * 2.0);
      
      float elevation = snoise(noisePos * scrollFactor) * 0.5;
      elevation += snoise(noisePos * 2.0 * scrollFactor - uTime) * 0.2;
      
      vElevation = elevation;

      // Displace vertex along its normal
      vec3 newPosition = position + normal * (elevation * (1.0 + uScroll));

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColorMain;
    uniform vec3 uColorAccent;
    uniform vec3 uColorGlow;
    
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;

    void main() {
      // Color mixing based on noise elevation
      float mixStrength = (vElevation + 0.5) * 1.2;
      
      vec3 color = mix(uColorMain, uColorAccent, mixStrength);
      
      // Add searing white highlights to the highest peaks
      float highlight = smoothstep(0.4, 0.8, vElevation);
      color = mix(color, uColorGlow, highlight);

      // Add a fresnel glow to the edges
      float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      color += uColorAccent * fresnel * 0.5;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ QuantumMaterial });

export default function QuantumSphere() {
  const materialRef = useRef<any>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      // Normalize scroll (assume 5000px max scroll for mapping)
      const normalizedScroll = Math.min(scrollYRef.current / 5000, 1.0);
      
      // Smoothly interpolate the scroll uniform so the physics don't jump instantly
      materialRef.current.uScroll = THREE.MathUtils.lerp(
        materialRef.current.uScroll, 
        normalizedScroll, 
        0.05
      );
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <icosahedronGeometry args={[8, 128]} />
      {/* @ts-ignore */}
      <quantumMaterial ref={materialRef} wireframe={false} />
    </mesh>
  );
}
