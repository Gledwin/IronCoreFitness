"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import { AlertTriangle, ArrowLeft, PauseCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function CancelMembershipPage() {
    const [user, setUser] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (!session) {
            router.replace('/login');
        } else {
            setUser(JSON.parse(session));
        }
    }, [router]);

    const handleCancel = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const allUsers = JSON.parse(localStorage.getItem('gym_users') || '[]');
            
            // LOGIC: Set status to PENDING_TERMINATION. 
            // This status will be used to HIDE the reactivate button on the profile.
            const updatedUser = { 
                ...user, 
                status: 'PENDING_TERMINATION' 
            };

            const updatedUsers = allUsers.map((u: any) => 
                u.email === user.email ? updatedUser : u
            );

            localStorage.setItem('gym_users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            setUser(updatedUser);
            setIsProcessing(false);
            setIsConfirmed(true);

            setTimeout(() => router.push('/profile'), 3000);
        }, 2000);
    };

    if (!user) return null;

    if (isConfirmed) {
        return (
            <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col font-roboto">
                <Header isLoggedIn={true} userName={user.fullName} />
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="max-w-md w-full bg-[#242424] p-1 border border-red-500/20 shadow-2xl animate-in zoom-in duration-500">
                        <div className="border border-white/5 p-12 text-center">
                            <CheckCircle2 className="w-16 h-16 text-red-500 mx-auto mb-8" />
                            <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-4">Termination Set</h1>
                            <p className="text-gray-500 font-roboto text-sm mb-10 leading-relaxed uppercase tracking-widest">
                                Your account will be purged on collection day. Redirecting to profile...
                            </p>
                            <div className="flex items-center justify-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></div>
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white antialiased font-roboto">
            <Header isLoggedIn={true} userName={user.fullName} />
            
            <div className="container mx-auto px-6 py-24 flex justify-center">
                <div className="max-w-2xl w-full">
                    <Link href="/profile" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F5E6B3] mb-10 font-oswald font-bold tracking-[0.3em] text-[10px] uppercase transition-colors group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> BACK TO ACCOUNT
                    </Link>

                    <div className="bg-[#242424] border border-white/5 shadow-2xl overflow-hidden relative">
                        <div className="bg-red-600/5 p-10 border-b border-red-900/20 flex items-center gap-6">
                            <div className="p-4 bg-red-600/10 rounded-full border border-red-600/20">
                                <AlertTriangle className="text-red-500 w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-oswald font-bold uppercase tracking-tighter">Cancel Membership</h1>
                                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Scheduled Termination Protocol</p>
                            </div>
                        </div>

                        <div className="p-10 md:p-12 space-y-10">
                            <div className="bg-black/40 border border-red-900/30 p-8 flex gap-5">
                                <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-red-500 font-oswald font-bold uppercase tracking-widest mb-2 text-sm">Action Warning:</h4>
                                    <p className="text-xs text-gray-400 font-roboto leading-relaxed uppercase tracking-wider">
                                        Cancelling means losing <span className="text-white font-bold">24/7 facility access</span>. This means that your account will be deleted and you have to register again if you wish to return.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-red-950/10 border border-red-900/20 p-6">
                                <p className="text-[11px] text-gray-300 font-roboto uppercase tracking-widest leading-relaxed">
                                    <span className="text-red-500 font-black">Note:</span> Your account will delete on the day of collection. Instead of taking payment, the account deletes permanently.
                                </p>
                            </div>

                            <div className="bg-black/20 border border-white/5 p-6 flex justify-between items-center">
                                <div>
                                    <h5 className="text-[#F5E6B3] font-oswald font-bold uppercase text-xs tracking-widest mb-1">Freeze Instead?</h5>
                                    <p className="text-[10px] text-gray-500 font-roboto uppercase tracking-wider">Keep status for R50/month</p>
                                </div>
                                <Link href="/pause-membership" className="px-4 py-2 border border-[#F5E6B3] text-[#F5E6B3] font-oswald font-bold text-[10px] uppercase hover:bg-[#F5E6B3] hover:text-black transition-all">
                                    Switch to Pause
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button 
                                    onClick={handleCancel}
                                    disabled={isProcessing}
                                    className="flex-[2] py-5 bg-red-600 text-white font-oswald font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-red-700 shadow-lg disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : "Confirm Cancellation"}
                                </button>
                                
                                <button 
                                    onClick={() => router.push('/profile')} 
                                    className="flex-1 py-5 border border-white/10 text-center font-oswald font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 text-gray-500 transition-all"
                                >
                                    Keep Active
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </main>
    );
}