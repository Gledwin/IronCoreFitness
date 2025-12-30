"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import { 
    User, Edit2, Loader2, Heart, PlayCircle, PauseCircle,
    ShieldAlert, Banknote, ShieldCheck, Clock, X, Hash
} from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditingBank, setIsEditingBank] = useState(false);
    
    const [tempBankData, setTempBankData] = useState({
        accountHolder: '',
        bankType: '',
        accountNumber: '',
        startDate: ''
    });

    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (!session) {
            router.replace('/login');
        } else {
            const userData = JSON.parse(session);
            setUser(userData);
            setTempBankData(userData.recurringPaymentSetup || {});
            setLoading(false);
        }
    }, [router]);

    const handleSaveBankDetails = () => {
        const allUsers = JSON.parse(localStorage.getItem('gym_users') || '[]');
        const updatedUser = { ...user, recurringPaymentSetup: tempBankData };
        const updatedUsers = allUsers.map((u: any) => u.email === user.email ? updatedUser : u);
        localStorage.setItem('gym_users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingBank(false);
    };

    const handleReactivate = () => {
        const allUsers = JSON.parse(localStorage.getItem('gym_users') || '[]');
        const updatedUser = { ...user, status: 'ACTIVE' };
        const updatedUsers = allUsers.map((u: any) => u.email === user.email ? updatedUser : u);
        localStorage.setItem('gym_users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser); 
    };

    if (loading) return <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center"><Loader2 className="animate-spin text-[#F5E6B3] w-12 h-12" /></div>;

    const isActive = user?.status === 'ACTIVE';
    const isPaused = user?.status === 'PAUSED';
    const isPendingTermination = user?.status === 'PENDING_TERMINATION';

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white antialiased font-roboto">
            <Header isLoggedIn={true} userName={user?.fullName} />

            <div className="container mx-auto px-6 md:px-20 py-16">
                {/* 1. IDENTITY HEADER */}
                <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 flex flex-wrap items-center justify-between mb-8 shadow-xl">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#1F1F1F] rounded-full flex items-center justify-center border border-[#F5E6B3]/20 shadow-inner">
                            <User className="text-[#F5E6B3] w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-oswald font-bold uppercase tracking-tight">{user?.fullName}</h2>
                            <p className="text-[#8C8C8C] text-sm">{user?.email}</p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 px-6 py-2 bg-[#1F1F1F] rounded-full border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Current Status</p>
                        <p className={`text-sm font-bold uppercase tracking-tighter ${isPendingTermination ? 'text-red-500 animate-pulse' : isPaused ? 'text-yellow-500' : 'text-green-500'}`}>
                            ● {user?.status?.replace('_', ' ') || 'ACTIVE'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* COLUMN 1: CONTACT & NOK */}
                    <div className="space-y-8">
                        <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-lg">
                            <h3 className="text-xl font-oswald font-bold uppercase mb-6 text-[#F5E6B3]">Contact Info</h3>
                            <div className="space-y-6">
                                <InfoField label="Mobile" value={user?.phone} />
                                <InfoField label="Address" value={user?.residentialAddress} />
                                <InfoField label="Birth Date" value={user?.dateOfBirth} />
                            </div>
                        </div>
                        <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-lg">
                            <h3 className="text-xl font-oswald font-bold uppercase mb-6 text-[#F5E6B3] flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" /> Next of Kin
                            </h3>
                            <div className="space-y-6">
                                <InfoField label="NOK Name" value={user?.nextOfKin?.nokName} />
                                <InfoField label="Relationship" value={user?.nextOfKin?.nokRelation} />
                                <InfoField label="NOK Contact" value={user?.nextOfKin?.nokContact} />
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: BANK DETAILS */}
                    <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-oswald font-bold uppercase text-[#F5E6B3] flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" /> Bank Details
                            </h3>
                            {!isEditingBank && !isPendingTermination && (
                                <button onClick={() => setIsEditingBank(true)} className="text-[10px] text-gray-500 hover:text-[#F5E6B3] flex items-center gap-1 font-bold uppercase">
                                    <Edit2 className="w-3 h-3" /> Edit
                                </button>
                            )}
                        </div>

                        {isEditingBank ? (
                            <div className="space-y-4">
                                <BankInput label="Bank" value={tempBankData.bankType} onChange={(v) => setTempBankData({...tempBankData, bankType: v})} />
                                <BankInput label="Holder" value={tempBankData.accountHolder} onChange={(v) => setTempBankData({...tempBankData, accountHolder: v})} />
                                <BankInput label="Account #" value={tempBankData.accountNumber} onChange={(v) => setTempBankData({...tempBankData, accountNumber: v})} />
                                <BankInput label="Debit Day" value={tempBankData.startDate} type="number" onChange={(v) => setTempBankData({...tempBankData, startDate: v})} />
                                <div className="flex gap-2 pt-4">
                                    <button onClick={handleSaveBankDetails} className="flex-1 py-3 bg-green-600 text-white font-oswald font-bold uppercase text-xs">Save</button>
                                    <button onClick={() => setIsEditingBank(false)} className="flex-1 py-3 bg-gray-700 text-white font-oswald font-bold uppercase text-xs">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-7">
                                <InfoField label="Bank Provider" value={user?.recurringPaymentSetup?.bankType} icon={<Banknote className="w-3 h-3"/>} />
                                <InfoField label="Account Holder" value={user?.recurringPaymentSetup?.accountHolder} />
                                <InfoField label="Account Number" value={user?.recurringPaymentSetup?.accountNumber} icon={<Hash className="w-3 h-3"/>} />
                                <InfoField label="Collection Day" value={user?.recurringPaymentSetup?.startDate} icon={<Clock className="w-3 h-3"/>} />
                            </div>
                        )}
                    </div>

                    {/* COLUMN 3: MANAGEMENT (TERMINATION AWARE) */}
                    <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-lg h-fit">
                        <h3 className="text-xl font-oswald font-bold uppercase mb-6 text-[#F5E6B3]">Subscription</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-[#1F1F1F] rounded-lg border border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase mb-1 tracking-widest">Monthly Billing</p>
                                <p className="text-2xl font-bold text-[#F5E6B3]">
                                    {isPaused ? "R50.00" : isPendingTermination ? "R0.00" : "R500.00"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* IF TERMINATION IS SET: HIDE ALL ACTION BUTTONS AND SHOW NOTICE */}
                            {isPendingTermination ? (
                                <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-lg text-center">
                                    <ShieldAlert className="w-8 h-8 text-red-600 mx-auto mb-3" />
                                    <p className="text-red-500 font-oswald font-bold uppercase text-sm tracking-tight leading-tight">
                                        Termination Scheduled
                                    </p>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-3 leading-relaxed">
                                        Account will be purged on the next collection day. Action features disabled.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* REACTIVATE - Hidden if Active or Pending Termination */}
                                    {isPaused && (
                                        <button 
                                            onClick={handleReactivate}
                                            className="w-full py-4 bg-green-600 text-white font-oswald font-bold uppercase hover:bg-green-500 transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <PlayCircle className="w-5 h-5" /> Reactivate Now
                                        </button>
                                    )}

                                    {/* PAUSE - Only shown if Active */}
                                    {isActive && (
                                        <Link href="/pause-membership" className="w-full py-4 border-2 border-[#F5E6B3] text-[#F5E6B3] text-center font-oswald font-bold uppercase hover:bg-[#F5E6B3] hover:text-black transition-all flex items-center justify-center gap-2">
                                            <PauseCircle className="w-5 h-5" /> Pause Membership
                                        </Link>
                                    )}

                                    {/* CANCEL - Hidden if Pending Termination */}
                                    <Link href="/cancel-membership" className="w-full py-4 border border-red-600/30 text-red-500 text-center font-oswald font-bold uppercase hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <X className="w-5 h-5" /> Cancel Membership
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

function InfoField({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
    return (
        <div className="border-b border-white/5 pb-4 last:border-0 group">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">{icon} {label}</p>
            <p className="text-sm font-medium text-gray-200">{value || "---"}</p>
        </div>
    );
}

function BankInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void, type?: string }) {
    return (
        <div>
            <label className="text-[10px] text-gray-400 uppercase block mb-1">{label}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#1F1F1F] border border-white/10 rounded-md p-3 text-sm text-white outline-none focus:border-[#F5E6B3]" />
        </div>
    );
}