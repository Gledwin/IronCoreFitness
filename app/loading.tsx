"use client";

import { Dumbbell } from 'lucide-react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1E1E1E]">
            {/* The Dumbbell with a heavy bounce animation to fit the gym theme */}
            <div className="animate-bounce" style={{ animationDuration: '1s' }}>
                <Dumbbell className="w-12 h-12 text-[#F5E6B3]" />
            </div>
            
            <p className="mt-4 text-gray-500 font-oswald uppercase tracking-widest text-xs animate-pulse">
                Synchronizing IronCore Data
            </p>
        </div>
    );
}