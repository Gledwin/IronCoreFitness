"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { 
    Dumbbell, Play, Plus, Timer, Activity, ChevronRight, Save, Trash2, MapPin, Lock
} from 'lucide-react';

// --- DATABASE & CONSTANTS ---
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

const EXERCISE_DB = [
    { id: 1, name: "Barbell Bench Press", muscle: "Chest", category: "Strength" },
    { id: 2, name: "Deadlift", muscle: "Back/Legs", category: "Power" },
    { id: 3, name: "Back Squat", muscle: "Legs", category: "Strength" },
    { id: 4, name: "Overhead Press", muscle: "Shoulders", category: "Strength" },
    { id: 5, name: "Pilates Hundred", muscle: "Core", category: "Mobility" },
    { id: 6, name: "Plank to Pike", muscle: "Core", category: "Mobility" },
];

export default function WorkoutsPage() {
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('browse'); 
    const [filter, setFilter] = useState('All');
    // PROXIMITY SENSOR (Set to true for demo purposes so buttons work)
    const [isAtGym, setIsAtGym] = useState(true); 

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (session) setUser(JSON.parse(session));
    }, []);

    const allWorkouts = [...STATIC_PROGRAMS]; 
    const categories = ['All', 'Strength', 'Conditioning', 'Mobility'];
    
    const filteredPrograms = filter === 'All' 
        ? allWorkouts 
        : allWorkouts.filter(p => p.category === filter);

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white font-roboto pb-20">
            <Header isLoggedIn={true} userName={user?.fullName} />

            {/* HEADER SECTION */}
            <section className="bg-[#2B2B2B] border-b border-white/5 py-16 mt-16">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase italic tracking-tighter mb-8">
                        Training Programs
                    </h1>
                    
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => setActiveTab('browse')} 
                            className={`px-8 py-4 font-oswald font-bold uppercase text-sm tracking-widest transition-all ${activeTab === 'browse' ? 'bg-[#F5E6B3] text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                        >
                            Explore Plans
                        </button>
                        <button 
                            onClick={() => setActiveTab('forge')} 
                            className={`px-8 py-4 font-oswald font-bold uppercase text-sm tracking-widest transition-all flex items-center gap-2 ${activeTab === 'forge' ? 'bg-[#F5E6B3] text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                        >
                            <Plus className="w-4 h-4" /> Create Own Workout
                        </button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-20 py-12">
                {activeTab === 'browse' ? (
                    <>
                        <div className="flex flex-wrap gap-3 mb-12 justify-center">
                            {categories.map((cat) => (
                                <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/40'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPrograms.map((p, idx) => (
                                <WorkoutCard key={p.id || idx} program={p} isAtGym={isAtGym} />
                            ))}
                        </div>
                    </>
                ) : (
                    <CreateWorkoutView user={user} onSave={() => setActiveTab('browse')} />
                )}
            </div>
            <Footer />
        </main>
    );
}

// --- WORKOUT CARD SUB-COMPONENT ---

function WorkoutCard({ program, isAtGym }: { program: any, isAtGym: boolean }) {
    const router = useRouter();
    const primaryMuscle = program.muscles && program.muscles.length > 0 
        ? program.muscles[0] 
        : "Full Body";

    return (
        <div className="group bg-[#2B2B2B] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F5E6B3]/30 transition-all duration-500 shadow-xl">
            <div className="relative h-64">
                <img src={program.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={program.title} />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-white/10">
                    <p className="text-[9px] font-bold text-[#F5E6B3] uppercase tracking-widest">{program.level || "Standard"}</p>
                </div>
            </div>
            <div className="p-8">
                <p className="text-[#F5E6B3] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{program.category || "Training"}</p>
                <h3 className="text-2xl font-oswald font-bold uppercase mb-4 leading-none">{program.title}</h3>
                <div className="flex gap-4 mb-8 text-xs text-gray-500 font-bold uppercase">
                    <span className="flex items-center gap-1"><Timer className="w-3 h-3"/> {program.duration || "Var."}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> {primaryMuscle}</span>
                </div>

                {/* UPDATED: Takes user to the dynamic training info page */}
                <button 
                    onClick={() => router.push(`/workouts/${program.id}`)}
                    className="w-full py-4 bg-[#1F1F1F] group-hover:bg-[#F5E6B3] group-hover:text-black font-oswald font-bold uppercase text-sm transition-all flex items-center justify-center gap-2"
                >
                    Access Training <Play className="w-3 h-3 fill-current" />
                </button>
            </div>
        </div>
    );
}

// --- CREATE WORKOUT VIEW SUB-COMPONENT ---

function CreateWorkoutView({ onSave, user }: { onSave: () => void, user: any }) {
    const [routineName, setRoutineName] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const addExercise = (ex: any) => {
        setSelectedExercises([...selectedExercises, { ...ex, instanceId: Date.now() }]);
        setSearchTerm("");
    };

    const removeExercise = (id: number) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.instanceId !== id));
    };

    const handleSave = () => {
        if (!routineName) return alert("Please name your routine.");
        if (selectedExercises.length === 0) return alert("Add at least one exercise.");
        if (!user) return alert("Please log in to save workouts.");

        const newRoutine = {
            id: Date.now(),
            title: routineName,
            category: 'Custom',
            duration: "Var.",
            muscles: Array.from(new Set(selectedExercises.map(ex => ex.muscle))),
            exercises: selectedExercises,
            creatorEmail: user.email,
            isCustom: true,
            date: new Date().toLocaleDateString('en-GB')
        };

        const existing = JSON.parse(localStorage.getItem('gym_workouts') || '[]');
        localStorage.setItem('gym_workouts', JSON.stringify([...existing, newRoutine]));
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
            <div className="flex-1 space-y-8">
                <div className="bg-[#2B2B2B] p-8 rounded-2xl border border-white/5 shadow-2xl">
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] block mb-4">Routine Designation</label>
                    <input 
                        type="text"
                        placeholder="E.G. MAXIMUM HYPERTROPHY A"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                        className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl p-6 font-oswald text-2xl uppercase text-[#F5E6B3] outline-none"
                    />
                </div>

                <div className="space-y-4">
                    {selectedExercises.map((ex) => (
                        <div key={ex.instanceId} className="bg-[#2B2B2B] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                            <div>
                                <h4 className="font-oswald font-bold uppercase text-lg">{ex.name}</h4>
                                <p className="text-[9px] text-[#F5E6B3] font-bold uppercase tracking-widest">{ex.muscle}</p>
                            </div>
                            <button onClick={() => removeExercise(ex.instanceId)} className="text-gray-500 hover:text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-96">
                <div className="bg-[#2B2B2B] p-6 rounded-2xl border border-white/5 sticky top-24 shadow-2xl">
                    <input 
                        type="text"
                        placeholder="Search movement..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1F1F1F] border border-white/10 rounded-xl p-4 text-sm mb-6 outline-none"
                    />
                    <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                        {EXERCISE_DB.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase())).map(ex => (
                            <button key={ex.id} onClick={() => addExercise(ex)} className="w-full text-left p-4 bg-[#1F1F1F] rounded-xl border border-white/5 hover:border-[#F5E6B3]/50 transition-all">
                                <p className="font-oswald font-bold uppercase text-sm">{ex.name}</p>
                            </button>
                        ))}
                    </div>
                    <button onClick={handleSave} className="w-full mt-8 py-4 bg-[#F5E6B3] text-black font-oswald font-bold uppercase text-sm tracking-widest flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-[#F5E6B3]/10">
                        <Save className="w-4 h-4" /> Save to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}