"use client";

import { Dumbbell } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1E1E1E]/90 backdrop-blur-xl">
            <div className="relative">
                {/* Outer Glow Effect - Matches IronCore Branding */}
                <div className="absolute inset-0 bg-[#F5E6B3] blur-[60px] opacity-20 animate-pulse"></div>
                
                {/* The Dumbbell Loader */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="animate-bounce" style={{ animationDuration: '1.2s' }}>
                        <Dumbbell 
                            className="w-20 h-20 text-[#F5E6B3] drop-shadow-[0_0_15px_rgba(245,230,179,0.5)]" 
                        />
                    </div>
                    
                    {/* Floor shadow effect that scales with the bounce */}
                    <div className="w-12 h-1.5 bg-black/40 rounded-[100%] blur-md mt-2 animate-pulse" />
                </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-2">
                <p className="text-[#F5E6B3] font-oswald uppercase tracking-[0.5em] text-xs font-bold italic">
                    Syncing with Base
                </p>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#F5E6B3] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-[#F5E6B3] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-[#F5E6B3] rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}