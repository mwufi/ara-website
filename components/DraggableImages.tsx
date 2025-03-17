"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface DraggableImageProps {
  src?: string;
  alt: string;
  size?: number;
  initialX: number;
  initialY: number;
  zIndex?: number;
  rotation?: number;
  children?: ReactNode;
  teamName?: string;
}

// Super simple draggable image component
export const DraggableImage = ({
  src = "/car.png",
  alt,
  size = 120,
  initialX,
  initialY,
  zIndex = 10,
  rotation = 0,
  children,
  teamName = "Ara"
}: DraggableImageProps) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 1000
  });

  // Create a reference for drag constraints
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle team navigation when selecting from context menu
  const handleJoinTeam = () => {
    router.push(`/secret/${teamName.toLowerCase()}`);
  };

  return (
    <>
      {/* Full page constraint reference div */}
      <div
        ref={constraintsRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}
      />

      <ContextMenu>
        <ContextMenuTrigger>
          <motion.div
            drag
            initial={{ x: initialX, y: initialY, rotate: rotation }}
            // Use the ref-based constraint instead of explicit values
            dragConstraints={constraintsRef}
            // Reduce momentum with lower power and shorter time constant
            dragMomentum={true}
            dragTransition={{
              power: 0.1, // Lower power means less momentum
              timeConstant: 200, // Shorter time constant means momentum dissipates faster
              bounceStiffness: 400,
              bounceDamping: 40
            }}
            whileDrag={{
              scale: 1.1,
              zIndex: 50
            }}
            whileHover={{ scale: 1.05 }}
            style={{
              width: size,
              height: size,
              zIndex: isDragging ? 50 : zIndex,
              position: "absolute",
              cursor: "grab",
              // Increase hit area even more
              padding: "15px",
              margin: "-15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: 'transparent'
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover pointer-events-none rounded-2xl"
              sizes="(max-width: 768px) 100vw, 33vw"
              draggable="false"
            />
          </motion.div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleJoinTeam}>
            Join {teamName}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

// Simple pass-through container for backward compatibility
export const DraggableContainer = ({
  children,
  height = 500
}: {
  children: ReactNode;
  height?: number;
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      {children}
    </div>
  );
};

// Global provider - just returns children directly
export const DraggableProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
}; 