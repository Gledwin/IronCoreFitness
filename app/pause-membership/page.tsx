"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { Pause, AlertCircle, ArrowLeft, CheckCircle2, ShieldOff } from 'lucide-react';

export default function PauseMembershipPage() {
    const [user, setUser] = useState<any>(null);
    const [confirmed, setConfirmed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (!session) {
            router.replace('/login');
        } else {
            setUser(JSON.parse(session));
        }
    }, [router]);

    const handlePause = () => {
        const allUsers = JSON.parse(localStorage.getItem('gym_users') || '[]');
        
        const updatedUsers = allUsers.map((u: any) => {
            if (u.email === user.email) {
                return { ...u, status: 'PAUSED' };
            }
            return u;
        });

        const updatedUser = { ...user, status: 'PAUSED' };
        
        localStorage.setItem('gym_users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        setConfirmed(true);
        setTimeout(() => router.push('/dashboard'), 3000);
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#141414] text-white font-roboto selection:bg-[#F5E6B3] selection:text-black">
            <Header isLoggedIn={true} userName={user.fullName} />
            
            <div className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
                {/* Background Text Accent */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                    <h1 className="text-[20vw] font-oswald font-black leading-none">STANDBY</h1>
                </div>

                <div className="relative w-full max-w-lg transition-all duration-700">
                    {!confirmed ? (
                        <div className="group">
                            {/* Card with a sharp Industrial Border */}
                            <div className="relative bg-[#1E1E1E] border border-white/10 p-1">
                                <div className="border border-white/5 bg-[#1E1E1E] p-8 md:p-12">
                                    
                                    {/* Header Icon & Title */}
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-[#F5E6B3] blur-2xl opacity-10 animate-pulse"></div>
                                            <div className="relative w-20 h-20 border border-[#F5E6B3]/30 flex items-center justify-center">
                                                <ShieldOff className="w-10 h-10 text-[#F5E6B3]" />
                                            </div>
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter text-white">
                                            Pause <span className="text-[#F5E6B3]">Protocol</span>
                                        </h1>
                                        <p className="mt-2 text-[10px] font-roboto font-black text-gray-500 uppercase tracking-[0.4em]">Operational Standby</p>
                                    </div>

                                    {/* Styled Fee Notice */}
                                    <div className="relative bg-[#262626] p-6 mb-10 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-[2px] h-full bg-yellow-600/50"></div>
                                        <div className="flex gap-4">
                                            <AlertCircle className="text-yellow-600 w-5 h-5 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-[11px] font-oswald font-bold text-yellow-600 uppercase tracking-widest mb-1">Financial Impact</h4>
                                                <p className="text-xs text-gray-400 font-roboto leading-relaxed italic">
                                                    Your R500 monthly fee will be replaced by a <span className="text-white font-bold">R50 holding fee</span> to keep your data synchronized and active in the laboratory.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Grid */}
                                    <div className="space-y-4">
                                        <button 
                                            onClick={handlePause}
                                            className="w-full py-5 bg-[#F5E6B3] text-black font-oswald font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:tracking-[0.3em] transition-all duration-300 active:scale-95"
                                        >
                                            Confirm R50/Month Pause
                                        </button>
                                        
                                        <button 
                                            onClick={() => router.back()} 
                                            className="w-full py-4 text-gray-600 font-oswald font-bold uppercase text-[10px] tracking-widest hover:text-[#F5E6B3] transition-colors flex items-center justify-center gap-2 group"
                                        >
                                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                                            Return to Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Corner Accents */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#F5E6B3]/30"></div>
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#F5E6B3]/30"></div>
                        </div>
                    ) : (
                        /* Success State: Clean & Authoritative */
                        <div className="text-center bg-[#1E1E1E] border border-white/5 p-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="w-24 h-24 border border-green-500/20 bg-green-500/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-4 text-white">
                                ACCESS <span className="text-green-500">PAUSED</span>
                            </h2>
                            <p className="text-gray-500 font-roboto text-[10px] uppercase tracking-[0.4em] mb-10">R50 Holding Cycle Active</p>
                            
                            <div className="flex items-center justify-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </main>
    );
}