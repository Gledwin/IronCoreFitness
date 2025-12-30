"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import ActiveWorkout from '../components/ActiveWorkout'; 
import { 
    Flame, Dumbbell, MapPin, Trophy, 
    Activity, ChevronRight, Target, Trash2, 
    Plus, MessageSquare, Users, ArrowRight 
} from 'lucide-react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [customWorkouts, setCustomWorkouts] = useState<any[]>([]);
    const [activeSession, setActiveSession] = useState<any>(null); 
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (!session) {
            router.replace('/login');
        } else {
            const loggedInUser = JSON.parse(session);
            setUser(loggedInUser);

            const allSavedWorkouts = JSON.parse(localStorage.getItem('gym_workouts') || '[]');
            const userSpecificWorkouts = allSavedWorkouts.filter(
                (workout: any) => workout.creatorEmail === loggedInUser.email
            );
            
            setCustomWorkouts(userSpecificWorkouts);
        }
    }, [router]);

    const handleDeleteWorkout = (workoutId: string | number) => {
        const allWorkouts = JSON.parse(localStorage.getItem('gym_workouts') || '[]');
        const updatedWorkouts = allWorkouts.filter((w: any) => w.id !== workoutId);
        localStorage.setItem('gym_workouts', JSON.stringify(updatedWorkouts));
        setCustomWorkouts(updatedWorkouts.filter((w: any) => w.creatorEmail === user.email));
    };

    const firstName = user?.fullName?.split(' ')[0] || 'Athlete';

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white antialiased font-roboto pb-20">
            {/* --- 3. THE WORKOUT OVERLAY --- */}
            {activeSession && (
                <ActiveWorkout 
                    workout={activeSession} 
                    onClose={() => setActiveSession(null)} 
                />
            )}

            <Header isLoggedIn={true} userName={user?.fullName} />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-24 px-6 md:px-20 border-b border-white/5 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5E6B3]/5 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 bg-[#F5E6B3] rounded-full"></span>
                            <span className="text-[11px] font-roboto font-black uppercase tracking-[0.4em] text-[#F5E6B3]">
                                IRONCORE MEMBER
                            </span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-oswald font-bold uppercase tracking-tighter leading-[0.85] mb-4">
                            Welcome, <br/>
                            <span className="text-white">{firstName}</span>
                        </h1>
                        <p className="text-lg md:text-xl font-roboto font-light text-gray-400 uppercase tracking-[0.2em] italic">
                            Train Hard. <span className="text-white border-b border-[#F5E6B3] pb-1">On Your Terms.</span>
                        </p>
                        <div className="mt-12">
                            <button 
                                onClick={() => router.push('/workouts')}
                                className="px-12 py-4 bg-[#F5E6B3] text-black font-oswald font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-[#F5E6B3]/5"
                            >
                                EXPLORE WORKOUTS
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#2B2B2B] border border-white/5 p-8 w-full md:w-auto min-w-[280px]">
                        <div className="flex justify-between items-start mb-6">
                            <Dumbbell className="text-[#F5E6B3] w-6 h-6" />
                            <span className="text-[9px] font-roboto font-bold text-gray-500 uppercase tracking-widest">IronCore Validated</span>
                        </div>
                        <p className="text-gray-500 text-[10px] font-roboto font-black uppercase tracking-widest mb-1">Membership</p>
                        <p className="text-3xl font-oswald font-bold uppercase">{user?.status || "Standard Access"}</p>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="container mx-auto px-6 md:px-20 -mt-12 relative z-20 mb-28">
                <div className="grid grid-cols-1 md:grid-cols-3 bg-[#2B2B2B] border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/5 shadow-2xl">
                    <MetricBox label="Energy Burn" value={user?.caloriesBurned || 0} unit="KCAL" icon={<Flame className="w-5 h-5 text-orange-500"/>} />
                    <MetricBox label="Daily Target" value={user?.workoutProgress || "0%"} unit="DONE" icon={<Target className="w-5 h-5 text-[#F5E6B3]"/>} />
                    <MetricBox label="Base Visits" value={user?.gymVisits || "0/31"} unit="" icon={<MapPin className="w-5 h-5 text-gray-400"/>} />
                </div>
            </section>

            {/* --- CUSTOM FORGED WORKOUTS --- */}
            <section className="container mx-auto px-6 md:px-20 mb-32">
                <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter italic">YOUR<span className="text-[#F5E6B3]"> WORKOUTS</span></h2>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {customWorkouts.map((workout) => (
                        <div key={workout.id} className="group bg-[#2B2B2B] border border-white/5 p-10 hover:border-[#F5E6B3]/30 transition-all duration-500 relative">
                            <div className="flex justify-between items-start mb-10">
                                <Activity className="text-[#F5E6B3] w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <button 
                                    onClick={() => handleDeleteWorkout(workout.id)}
                                    className="text-gray-700 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <h3 className="text-2xl font-oswald font-bold uppercase tracking-tight mb-4">{workout.title || workout.name}</h3>
                            
                            <div className="flex gap-4 mb-10 font-roboto text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <span>{workout.duration || "45 MIN"}</span>
                                <span>/</span>
                                <span className="text-white">{workout.muscles?.[0] || 'Full Body'}</span>
                            </div>

                            {/* --- 4. BUTTON WITH CLICK HANDLER --- */}
                            <button 
                                onClick={() => setActiveSession(workout)}
                                className="flex items-center gap-3 font-oswald font-bold text-[11px] uppercase tracking-[0.2em] group-hover:text-[#F5E6B3] transition-all"
                            >
                                START WORKOUT <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    <button 
                        onClick={() => router.push('/workouts')}
                        className="border-2 border-dashed border-white/5 hover:border-[#F5E6B3]/20 p-10 flex flex-col items-center justify-center group transition-all min-h-[300px]"
                    >
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#F5E6B3]">
                            <Plus className="w-5 h-5 text-white/20 group-hover:text-[#F5E6B3]" />
                        </div>
                        <span className="font-oswald font-bold uppercase tracking-widest text-xs text-white/20 group-hover:text-white">Build New Protocol</span>
                    </button>
                </div>
            </section>

            {/* --- SOCIAL & CHALLENGES SECTION --- */}
            <section className="container mx-auto px-6 md:px-20 mb-20">
                <div className="bg-[#2B2B2B] border border-white/5 overflow-hidden shadow-2xl rounded-sm">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <Users size={20} className="text-[#F5E6B3]" />
                            <h2 className="text-xl font-oswald font-bold uppercase italic tracking-tight">The Circle</h2>
                        </div>
                        <button 
                            onClick={() => router.push('/community')}
                            className="text-[10px] text-[#F5E6B3] uppercase font-black tracking-widest hover:underline flex items-center gap-2"
                        >
                            Enter Community <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        <div className="p-10 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center gap-2 mb-4 text-gray-500">
                                    <MessageSquare size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Recent Activity</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light italic">
                                    "Just smashed my PR on deadlifts today! 220kg. The IronCore program is definitely working. 💪"
                                </p>
                                <p className="text-[10px] text-[#F5E6B3] font-bold uppercase tracking-widest">— Marcus Thorne</p>
                            </div>
                        </div>

                        <div className="p-10 bg-white/[0.01] flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Target size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Active Challenges</span>
                                    </div>
                                    <span className="bg-[#F5E6B3]/10 text-[#F5E6B3] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-[#F5E6B3]/20">12 Live</span>
                                </div>
                                <h3 className="text-2xl font-oswald font-bold uppercase mb-2 group-hover:text-[#F5E6B3] transition-colors">The Iron Marathon</h3>
                                <p className="text-gray-500 text-[11px] uppercase tracking-widest leading-relaxed">
                                    Join <span className="text-white">1,240 athletes</span> in a 30-day endurance protocol.
                                </p>
                            </div>
                            <button 
                                onClick={() => router.push('/community')}
                                className="mt-8 w-full py-4 bg-[#F5E6B3] text-black font-oswald font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl shadow-[#F5E6B3]/5"
                            >
                                View All Challenges
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function MetricBox({ label, value, unit, icon }: any) {
    return (
        <div className="p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-all group">
            <div className="flex items-center gap-3 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                {icon}
                <span className="text-[10px] font-roboto font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-5xl font-oswald font-bold">{value}</span>
                <span className="text-[11px] font-roboto font-black text-[#F5E6B3] uppercase tracking-widest">{unit}</span>
            </div>
        </div>
    );
}