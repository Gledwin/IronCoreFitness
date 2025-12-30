"use client";

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Timer, Activity, Target, Zap, ChevronRight } from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const PROGRAM_DATA: any = {
    'push-a': {
        title: "Push Power",
        subtitle: "Maximum Force Production",
        description: "An elite-level strength protocol focusing on explosive pushing movements and mechanical tension. This program is designed to break plateaus in chest and tricep development.",
        duration: "75 min",
        level: "Advanced",
        focus: "Hypertrophy / Power",
        exercises: [
            { name: "Barbell Bench Press", sets: "5", reps: "5", notes: "85% 1RM" },
            { name: "Incline DB Press", sets: "4", reps: "8-10", notes: "Slow eccentric" },
            { name: "Weighted Dips", sets: "3", reps: "Failure", notes: "Lean forward" }
        ]
    },
    'pilates-core': {
        title: "Industrial Pilates",
        subtitle: "Mechanical Core Stability",
        description: "A high-intensity mobility and core conditioning circuit. Fusing traditional pilates with industrial resistance training to build a bulletproof midsection.",
        duration: "45 min",
        level: "Intermediate",
        focus: "Mobility / Stability",
        exercises: [
            { name: "The Hundred", sets: "1", reps: "100", notes: "Controlled breathing" },
            { name: "Plank to Pike", sets: "4", reps: "15", notes: "Use sliders if possible" },
            { name: "Criss Cross", sets: "3", reps: "20", notes: "Rotate from torso" }
        ]
    }
};

export default function TrainingDetails() {
    const params = useParams();
    const router = useRouter();
    const program = PROGRAM_DATA[params.id as string];

    if (!program) return <div className="min-h-screen bg-[#1E1E1E] text-white p-20">Protocol Not Found.</div>;

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white font-roboto">
            <Header isLoggedIn={true} />
            
            <section className="pt-32 pb-16 px-6 md:px-20 border-b border-white/5 bg-[#2B2B2B]">
                <div className="container mx-auto">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-[#F5E6B3] transition-colors mb-8 uppercase text-[10px] font-black tracking-widest">
                        <ArrowLeft size={14} /> Back to Library
                    </button>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <span className="text-[#F5E6B3] font-oswald text-sm uppercase tracking-[0.3em]">{program.focus}</span>
                            <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase italic mt-2">{program.title}</h1>
                            <p className="text-gray-400 max-w-2xl mt-6 text-lg font-light leading-relaxed">{program.description}</p>
                        </div>
                        
                        <div className="bg-[#1F1F1F] p-8 border border-white/10 rounded-xl min-w-[280px]">
                            <div className="space-y-6">
                                <DetailItem icon={<Timer size={16}/>} label="Duration" value={program.duration} />
                                <DetailItem icon={<Activity size={16}/>} label="Difficulty" value={program.level} />
                                <DetailItem icon={<Target size={16}/>} label="Target" value="IronCore Base" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 md:px-20 container mx-auto">
                <h3 className="text-2xl font-oswald font-bold uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Zap className="text-[#F5E6B3]" /> Protocol Breakdown
                </h3>
                
                <div className="space-y-4">
                    {program.exercises.map((ex: any, i: number) => (
                        <div key={i} className="bg-[#2B2B2B] border border-white/5 p-6 flex justify-between items-center group hover:border-[#F5E6B3]/30 transition-all">
                            <div>
                                <h4 className="font-oswald font-bold uppercase text-xl text-white group-hover:text-[#F5E6B3] transition-colors">{ex.name}</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{ex.notes}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-oswald font-bold text-white">{ex.sets} <span className="text-gray-600 text-sm">SETS</span></p>
                                <p className="text-sm font-bold text-[#F5E6B3]">{ex.reps} REPS</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-16 py-6 bg-[#F5E6B3] text-black font-oswald font-bold uppercase tracking-[0.4em] text-sm hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#F5E6B3]/10">
                    Initiate Live Tracking <ChevronRight size={18} />
                </button>
            </section>
            
            <Footer />
        </main>
    );
}

function DetailItem({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className="text-[#F5E6B3]">{icon}</div>
            <div>
                <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">{label}</p>
                <p className="text-sm font-bold uppercase text-white">{value}</p>
            </div>
        </div>
    );
}