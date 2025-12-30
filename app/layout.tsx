"use client";

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import "./globals.css";

// --- CUSTOM DUMBBELL SPINNER ---
function GlobalSpinner() {
    return (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1E1E1E]">
            <div className="relative flex flex-col items-center">
                {/* Large Background Glow */}
                <div className="absolute inset-0 w-32 h-32 bg-[#F5E6B3] rounded-full blur-[80px] opacity-10 animate-pulse"></div>
                
                {/* Rotating Dumbbell Icon */}
                <div className="relative bg-[#2B2B2B] p-6 rounded-full border border-white/5 shadow-2xl animate-spin [animation-duration:1.5s]">
                    <Dumbbell className="w-12 h-12 text-[#F5E6B3]" strokeWidth={1.5} />
                </div>
                
                {/* Status Text */}
                <div className="mt-8 text-center">
                  
                    <div className="flex justify-center gap-1">
                        <span className="w-1 h-1 bg-[#F5E6B3] animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-[#F5E6B3] animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-[#F5E6B3] animate-bounce"></span>
                    </div>
                
                </div>
            </div>
        </div>
    );
}

// --- ROOT LAYOUT ---
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(true);

        // INCREASED DURATION: Set to 1.5 seconds (1500ms) for a more deliberate feel
        const timer = setTimeout(() => {
            setIsNavigating(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:wght@100..900&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-[#1E1E1E] selection:bg-[#F5E6B3] selection:text-black">
                {/* Fixed Overlay Spinner */}
                {isNavigating && <GlobalSpinner />}
                
                {/* Wrap content in Suspense for Next.js navigation stability */}
                <Suspense fallback={<GlobalSpinner />}>
                    <div className={isNavigating ? "opacity-20 transition-opacity duration-700" : "opacity-100 transition-opacity duration-500"}>
                        {children}
                    </div>
                </Suspense>
            </body>
        </html>
    );
}