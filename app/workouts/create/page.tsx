"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { 
    Plus, Trash2, Save, ChevronLeft, 
    Dumbbell, Search, Zap, Activity, Info
} from 'lucide-react';

const EXERCISE_DB = [
    { id: 1, name: "Barbell Bench Press", muscle: "Chest", category: "Strength" },
    { id: 2, name: "Deadlift", muscle: "Back/Legs", category: "Power" },
    { id: 3, name: "Back Squat", muscle: "Legs", category: "Strength" },
    { id: 4, name: "Overhead Press", muscle: "Shoulders", category: "Strength" },
    { id: 5, name: "Pilates Hundred", muscle: "Core", category: "Mobility" },
    { id: 6, name: "Plank to Pike", muscle: "Core", category: "Mobility" },
];

export default function CreateWorkoutPage() {
    const [routineName, setRoutineName] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const addExercise = (ex: any) => {
        setSelectedExercises([...selectedExercises, { ...ex, sets: 4, reps: 12, weight: 0, instanceId: Date.now() }]);
        setSearchTerm("");
    };

    const removeExercise = (id: number) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.instanceId !== id));
    };

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white font-roboto pb-20">
            <Header isLoggedIn={true} />

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* LEFT SIDE: THE FORGE FORM */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.back()} className="p-2 bg-white/5 rounded-full hover:bg-[#F5E6B3] hover:text-black transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter">Forge <span className="text-[#F5E6B3]">Workout</span></h1>
                        </div>

                        {/* ROUTINE NAME INPUT */}
                        <div className="bg-[#2B2B2B] p-8 rounded-2xl border border-white/5 shadow-2xl">
                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] block mb-4">Routine Designation</label>
                            <input 
                                type="text"
                                placeholder="E.G. MAXIMUM HYPERTROPHY A"
                                value={routineName}
                                onChange={(e) => setRoutineName(e.target.value)}
                                className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl p-6 font-oswald text-2xl uppercase text-[#F5E6B3] placeholder:text-gray-800 outline-none focus:border-[#F5E6B3]/50 transition-all"
                            />
                        </div>

                        {/* EXERCISE LIST */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-oswald font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Exercise Sequence
                            </h3>
                            
                            {selectedExercises.map((ex, idx) => (
                                <div key={ex.instanceId} className="bg-[#2B2B2B] border border-white/5 rounded-2xl overflow-hidden group animate-in slide-in-from-right duration-300">
                                    <div className="bg-[#333333] px-6 py-3 flex justify-between items-center border-b border-white/5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Exercise 0{idx + 1}</span>
                                        <button onClick={() => removeExercise(ex.instanceId)} className="text-gray-500 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            <h4 className="font-oswald font-bold uppercase text-lg leading-tight">{ex.name}</h4>
                                            <p className="text-[9px] text-[#F5E6B3] font-bold uppercase tracking-widest">{ex.muscle}</p>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-4 md:col-span-3 justify-end">
                                            <NumberInput label="Sets" value={ex.sets} />
                                            <NumberInput label="Reps" value={ex.reps} />
                                            <div className="hidden md:block w-px h-10 bg-white/5 mx-2" />
                                            <div className="text-right min-w-[80px]">
                                                <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Target Intensity</p>
                                                <p className="text-xs font-bold uppercase text-white">RPE 8-9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {selectedExercises.length === 0 && (
                                <div className="text-center py-20 bg-[#2B2B2B] rounded-2xl border border-dashed border-white/10">
                                    <Dumbbell className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                                    <p className="text-gray-600 font-oswald uppercase tracking-widest text-sm">Select exercises from the database to begin</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE: THE DATABASE SELECTOR */}
                    <div className="w-full lg:w-96">
                        <div className="bg-[#2B2B2B] p-6 rounded-2xl border border-white/5 sticky top-24 shadow-2xl">
                            <div className="flex items-center gap-2 mb-6 text-[#F5E6B3]">
                                <Search className="w-5 h-5" />
                                <h3 className="font-oswald font-bold uppercase tracking-wider">Exercise Bank</h3>
                            </div>

                            <input 
                                type="text"
                                placeholder="Search movement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#1F1F1F] border border-white/10 rounded-xl p-4 text-sm mb-6 outline-none focus:border-[#F5E6B3]/50"
                            />

                            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {EXERCISE_DB.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase())).map(ex => (
                                    <button 
                                        key={ex.id}
                                        onClick={() => addExercise(ex)}
                                        className="w-full text-left p-4 bg-[#1F1F1F] rounded-xl border border-white/5 hover:border-[#F5E6B3]/50 hover:bg-[#252525] transition-all group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-oswald font-bold uppercase text-sm tracking-wide">{ex.name}</p>
                                            <Plus className="w-4 h-4 text-gray-600 group-hover:text-[#F5E6B3]" />
                                        </div>
                                        <p className="text-[9px] text-gray-500 uppercase font-bold mt-1 tracking-tighter">{ex.category} • {ex.muscle}</p>
                                    </button>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-4 bg-[#F5E6B3] text-black font-oswald font-bold uppercase text-sm tracking-widest flex items-center justify-center gap-2 hover:brightness-110 shadow-lg">
                                <Save className="w-4 h-4" /> Save Final Routine
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}

// Custom Styled Number Input for Sets/Reps
function NumberInput({ label, value }: { label: string, value: number }) {
    return (
        <div className="bg-[#1F1F1F] px-4 py-2 rounded-xl border border-white/5 text-center min-w-[70px]">
            <p className="text-[8px] text-gray-500 uppercase font-bold mb-1 tracking-widest">{label}</p>
            <p className="text-lg font-oswald font-bold text-white leading-none">{value}</p>
        </div>
    );
}