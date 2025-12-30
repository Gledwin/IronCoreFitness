// components/dashboard/StatusCard.tsx
import { Play, Pause, X } from 'lucide-react';

interface StatusCardProps {
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
}

export default function StatusCard({ status }: StatusCardProps) {
    
    // 1. Determine style based on status
    const { label, color, icon: Icon } = (() => {
        switch (status) {
            case 'ACTIVE':
                return { label: 'ACTIVE', color: 'bg-green-700/50 border-green-500 text-green-300', icon: Play };
            case 'PAUSED':
                return { label: 'PAUSED', color: 'bg-yellow-700/50 border-yellow-500 text-yellow-300', icon: Pause };
            case 'CANCELLED':
                return { label: 'CANCELLED', color: 'bg-red-700/50 border-red-500 text-red-300', icon: X };
            default:
                return { label: 'UNKNOWN', color: 'bg-gray-700/50 border-gray-500 text-gray-300', icon: X };
        }
    })();

    // 2. Render the card
    return (
        <div className={`p-6 rounded-xl border-2 ${color} flex flex-col items-center justify-center space-y-3`}>
            <Icon className="w-10 h-10" />
            <div className="text-sm font-oswald tracking-widest uppercase">
                Membership Status
            </div>
            <div className="text-3xl font-oswald font-bold uppercase">
                {label}
            </div>
            {status === 'ACTIVE' && (
                <button className="text-sm text-[#1F1F1F] bg-[#F5E6B3] px-4 py-2 rounded-md font-semibold hover:brightness-90 transition">
                    Pause Membership
                </button>
            )}
        </div>
    );
}