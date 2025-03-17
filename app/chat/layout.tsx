'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 border-b">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-200"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                    <h2 className="font-medium">Ara Intelligence</h2>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
} 