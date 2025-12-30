"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import { Lock, Mail, ChevronRight } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for your login logic
        const users = JSON.parse(localStorage.getItem("gym_users") || "[]");
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            router.push("/dashboard");
        } else {
            setError("Access Denied. Please check your credentials.");
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white font-roboto selection:bg-[#F5E6B3] selection:text-black">
            <Header />
            
            <div className="flex items-center justify-center py-32 px-6 relative">
                {/* Subtle background texture - removed high contrast grids */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                <div className="relative bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    
                    <div className="p-10 md:p-12">
                        <div className="mb-10 text-center">
                            {/* Removed 'italic' and 'black' weights for a refined Oswald look */}
                            <h2 className="text-3xl font-oswald font-medium uppercase tracking-tight text-white leading-none">
                                Member <span className="text-[#F5E6B3]">Portal</span>
                            </h2>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-4 font-medium">
                                secure authentication
                            </p>
                        </div>
                        
                        {error && (
                            <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 mb-8 text-[11px] rounded-lg font-medium text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="group relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#F5E6B3] transition-colors pointer-events-none" />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-white/10 rounded-xl text-sm outline-none focus:border-[#F5E6B3]/30 transition-all placeholder:text-gray-700 font-roboto"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="group relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#F5E6B3] transition-colors pointer-events-none" />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-white/10 rounded-xl text-sm outline-none focus:border-[#F5E6B3]/30 transition-all placeholder:text-gray-700 font-roboto"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Rounded-full button matches the 'refined' aesthetic */}
                            <button 
                                type="submit" 
                                className="w-full mt-4 py-4 bg-[#F5E6B3] text-black font-bold font-oswald uppercase text-xs tracking-[0.15em] rounded-full flex items-center justify-center gap-2 hover:bg-white transition-all transform active:scale-[0.98] group"
                            >
                                Enter Dashboard
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-medium">
                                Not a member? <a href="/join" className="text-[#F5E6B3] hover:text-white transition-colors underline underline-offset-8 decoration-[#F5E6B3]/20">Establish Account</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}