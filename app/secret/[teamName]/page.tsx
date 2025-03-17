"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function TeamPage() {
    const { teamName } = useParams();
    const formattedTeamName = typeof teamName === 'string'
        ? teamName.charAt(0).toUpperCase() + teamName.slice(1)
        : '';

    // Get team-specific color
    const getTeamColor = (name: string) => {
        const teamColors = {
            cruisers: "#ff5a5f",
            techies: "#00a699",
            lovers: "#fc642d",
            ara: "#4f46e5"
        };

        return teamColors[name.toLowerCase() as keyof typeof teamColors] || "#4f46e5";
    };

    // Get team-specific image
    const getTeamImage = (name: string) => {
        const teamImages = {
            cruisers: "/car.png",
            techies: "/computer.png",
            lovers: "/heart.png",
            ara: "/heart.png" // Default image for Ara team
        };

        return teamImages[name.toLowerCase() as keyof typeof teamImages] || "/heart.png";
    };

    const teamColor = getTeamColor(formattedTeamName);
    const teamImage = getTeamImage(formattedTeamName);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
            style={{ backgroundColor: `${teamColor}20` }} // Light version of team color
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20
                }}
                className="bg-background rounded-xl p-8 shadow-xl max-w-md w-full"
            >
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                        src={teamImage}
                        alt={`${formattedTeamName} team image`}
                        fill
                        className="object-contain"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -right-2 -top-2"
                    >
                        <Sparkles size={24} className="text-yellow-400" />
                    </motion.div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: teamColor }}>
                    You've joined Team {formattedTeamName}
                </h2>

                <p className="mb-8 text-gray-600 dark:text-gray-300">
                    Welcome to our exclusive community. You're now part of something special.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                    >
                        <ArrowLeft size={16} />
                        Return Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
} 