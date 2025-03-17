"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Individual draggable image component
export const DraggableImage = ({ 
  src = "/car.png", 
  alt, 
  size = 120,
  initialX,
  initialY,
  zIndex = 0,
  rotation = 0,
  children
}: { 
  src?: string; 
  alt: string; 
  size?: number;
  initialX: number;
  initialY: number;
  zIndex?: number;
  rotation?: number;
  children?: ReactNode;
}) => {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const scale = useTransform(y, [-100, 0, 100], [1.1, 1, 1.1]);
  const rotate = useTransform(x, [-100, 0, 100], [rotation - 5, rotation, rotation + 5]);
  const boxShadow = useTransform(
    y, 
    [-100, 0, 100], 
    ["0px 20px 25px rgba(0, 0, 0, 0.2)", "0px 10px 15px rgba(0, 0, 0, 0.1)", "0px 20px 25px rgba(0, 0, 0, 0.2)"]
  );

  const [isDragging, setIsDragging] = useState(false);
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);

  return (
    <motion.div
      className="absolute"
      style={{ 
        x, 
        y, 
        zIndex: isDragging ? 50 : currentZIndex,
        width: size, 
        height: size 
      }}
      onDragStart={() => {
        setIsDragging(true);
        setCurrentZIndex(currentZIndex + 1);
      }}
      onDragEnd={() => setIsDragging(false)}
    >
      <motion.div
        drag
        dragMomentum={true}
        dragTransition={{ 
          power: 0.2,
          timeConstant: 200,
          modifyTarget: (target) => target // No snapping
        }}
        whileTap={{ 
          cursor: "grabbing",
          scale: 1.1,
          boxShadow: "0px 25px 30px rgba(0, 0, 0, 0.25)"
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.2)"
        }}
        style={{ 
          scale, 
          rotate,
          boxShadow,
          cursor: "grab"
        }}
        className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        {children ? (
          children
        ) : (
          <div className="w-full h-full pointer-events-none">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 33vw"
              draggable="false"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Container for all draggable images
export const DraggableContainer = ({ 
  children,
  height = 500
}: { 
  children: ReactNode;
  height?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height });
  const [isClient, setIsClient] = useState(false);
  
  // Update dimensions on resize and initial load
  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {children}
    </div>
  );
}; 