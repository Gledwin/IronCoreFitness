"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { 
    Play, Plus, Timer, Activity, Save, Trash2, Dumbbell 
} from 'lucide-react';

const STATIC_PROGRAMS = [
    {
        id: 'push-a',
        category: 'Strength',
        title: "Push Power",
        duration: "75 min",
        level: "Advanced",
        muscles: ["Chest", "Triceps"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 'pilates-core',
        category: 'Mobility',
        title: "Industrial Pilates",
        duration: "45 min",
        level: "Intermediate",
        muscles: ["Core", "Glutes"],
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600"
    }
];

export default function WorkoutsPage() {
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('browse'); 

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (session) setUser(JSON.parse(session));
    }, []);

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white font-roboto pb-20">
            <Header isLoggedIn={true} userName={user?.fullName} />

            <section className="bg-[#2B2B2B] border-b border-white/5 py-16 mt-16">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase italic tracking-tighter mb-8">
                        Training Programs
                    </h1>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setActiveTab('browse')} className={`px-8 py-4 font-oswald font-bold uppercase text-sm tracking-widest transition-all ${activeTab === 'browse' ? 'bg-[#F5E6B3] text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>
                            Explore Plans
                        </button>
                        <button onClick={() => setActiveTab('forge')} className={`px-8 py-4 font-oswald font-bold uppercase text-sm tracking-widest transition-all flex items-center gap-2 ${activeTab === 'forge' ? 'bg-[#F5E6B3] text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>
                            <Plus className="w-4 h-4" /> Create Own
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-20 py-12">
                {activeTab === 'browse' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {STATIC_PROGRAMS.map((p) => (
                            <WorkoutCard key={p.id} program={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 uppercase tracking-widest font-oswald">Forge View Active</div>
                )}
            </div>
            <Footer />
        </main>
    );
}

function WorkoutCard({ program }: { program: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleAccess = () => {
        setLoading(true);
        // The Root Layout's GlobalSpinner will handle the 1.5s transition
        router.push(`/workouts/${program.id}`);
    };

    return (
        <div className="group bg-[#2B2B2B] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F5E6B3]/30 transition-all duration-500 shadow-xl">
            <div className="relative h-64">
                <img src={program.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={program.title} />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-white/10">
                    <p className="text-[9px] font-bold text-[#F5E6B3] uppercase tracking-widest">{program.level}</p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[#F5E6B3] text-[10px] font-bold uppercase tracking-[0.2em]">{program.category}</p>
                    <Dumbbell className={`w-4 h-4 ${loading ? 'animate-spin text-[#F5E6B3]' : 'text-gray-700'}`} />
                </div>
                <h3 className="text-2xl font-oswald font-bold uppercase mb-4 leading-none">{program.title}</h3>
                <div className="flex gap-4 mb-8 text-xs text-gray-500 font-bold uppercase">
                    <span className="flex items-center gap-1"><Timer className="w-3 h-3"/> {program.duration}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> {program.muscles[0]}</span>
                </div>
                <button 
                    onClick={handleAccess}
                    className="w-full py-4 bg-[#1F1F1F] group-hover:bg-[#F5E6B3] group-hover:text-black font-oswald font-bold uppercase text-sm transition-all flex items-center justify-center gap-2"
                >
                    {loading ? "Syncing..." : "Access Training"} <Play className="w-3 h-3 fill-current" />
                </button>
            </div>
        </div>
    );
}