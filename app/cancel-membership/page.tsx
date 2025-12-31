"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

function CancelContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || "Active Protocol";

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto bg-[#2B2B2B] border border-white/5 p-12 rounded-2xl">
                <h1 className="text-4xl font-oswald font-bold uppercase italic mb-4">Cancel Membership</h1>
                <p className="text-gray-400 mb-8">Confirming termination for: <span className="text-[#F5E6B3]">{plan}</span></p>
                <button className="w-full py-4 bg-red-600 font-oswald font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                    Confirm Termination
                </button>
            </div>
        </main>
    );
}

export default function CancelMembershipPage() {
    return (
        <>
            <Header isLoggedIn={true} />
            <Suspense fallback={<div className="min-h-screen bg-[#1E1E1E]" />}>
                <CancelContent />
            </Suspense>
            <Footer />
        </>
    );
}