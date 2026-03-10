import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { X, Info, Move } from 'lucide-react';
import { motion } from 'motion/react';

interface VirtualTourViewerProps {
  imageUrl: string;
  onClose: () => void;
  title: string;
}

function Scene({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  
  return (
    <>
      <ambientLight intensity={1.5} />
      <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </Sphere>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={-0.5}
        autoRotate={false}
      />
    </>
  );
}

export default function VirtualTourViewer({ imageUrl, onClose, title }: VirtualTourViewerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col"
    >
      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-10 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-white text-2xl font-serif font-bold">{title}</h2>
          <p className="text-white/60 text-sm flex items-center gap-2">
            <Move className="w-4 h-4" /> Click and drag to explore the space
          </p>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 cursor-move">
        <Canvas camera={{ position: [0, 0, 0.1] }}>
          <Suspense fallback={null}>
            <Scene imageUrl={imageUrl} />
          </Suspense>
        </Canvas>
      </div>

      {/* Footer Controls/Info */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-8 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live 3D View
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Interactive Hotspots Enabled
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-serif text-xl">Loading Immersive Tour...</p>
          </div>
        </div>
      }>
        <div className="hidden" />
      </Suspense>
    </motion.div>
  );
}
