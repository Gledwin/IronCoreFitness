"use client";

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import "./globals.css";

function GlobalSpinner() {
    return (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1E1E1E]">
            <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 w-32 h-32 bg-[#F5E6B3] rounded-full blur-[80px] opacity-10 animate-pulse"></div>
                <div className="relative bg-[#2B2B2B] p-6 rounded-full border border-white/5 shadow-2xl animate-spin [animation-duration:1.5s]">
                    <Dumbbell className="w-12 h-12 text-[#F5E6B3]" strokeWidth={1.5} />
                </div>
                <div className="mt-8 text-center">
                    <h2 className="text-[#F5E6B3] font-oswald font-bold uppercase tracking-[0.6em] text-sm mb-2">IronCore Protocol</h2>
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(true);
        const timer = setTimeout(() => setIsNavigating(false), 1200); 
        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <html lang="en">
            <body className="bg-[#1E1E1E]">
                {isNavigating && <GlobalSpinner />}
                <Suspense fallback={<GlobalSpinner />}>
                    <div className={isNavigating ? "opacity-20 transition-opacity duration-700" : "opacity-100 transition-opacity duration-500"}>
                        {children}
                    </div>
                </Suspense>
            </body>
        </html>
    );
}