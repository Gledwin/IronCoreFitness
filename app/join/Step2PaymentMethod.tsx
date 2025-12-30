"use client";

import React from 'react';
import { Loader2, ArrowLeft, Building2 } from 'lucide-react';

interface Step2Props {
    onContinue: (data: any) => void;
    onBack: () => void;
    isSubmitting: boolean;
    fieldErrors: any;
}

export default function Step2PaymentMethod({ onContinue, onBack, isSubmitting, fieldErrors }: Step2Props) {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Organize data into the structure expected by handleFinalSubmit
        const paymentData = {
            joiningFeePayment: {
                cardHolder: formData.get('cardHolder'),
                cardNumber: formData.get('cardNumber'),
                securityCode: formData.get('securityCode'),
                expiryDate: formData.get('expiryDate'),
            },
            recurringPaymentSetup: {
                accountHolder: formData.get('accountHolder'),
                accountNumber: formData.get('accountNumber'),
                bankType: formData.get('bankType'),
                startDate: formData.get('startDate'),
            }
        };

        onContinue(paymentData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8 animate-in fade-in duration-500">
            
            {/* --- Joining Fee Section (Card) --- */}
            <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-2xl">
                <h3 className="text-[#F5E6B3] font-oswald text-xl uppercase mb-6 flex items-center gap-2">
                    Card Details (Once-off Joining Fee)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField name="cardHolder" label="Card Holder Name" placeholder="J. Doe" required />
                    <InputField name="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" required />
                    <InputField name="expiryDate" label="Expiry Date" placeholder="MM/YY" required />
                    <InputField name="securityCode" label="CVV" placeholder="123" required />
                </div>
            </div>

            {/* --- Recurring Debit Section (Bank) --- */}
            <div className="bg-[#2B2B2B] p-8 rounded-xl border border-white/5 shadow-2xl">
                <h3 className="text-[#F5E6B3] font-oswald text-xl uppercase mb-6 flex items-center gap-2">
                    Debit Order Details (Monthly Membership)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField name="accountHolder" label="Account Holder" placeholder="Full Name" required />
                    <InputField name="accountNumber" label="Account Number" placeholder="123456789" required />
                    
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Account Type</label>
                        <select 
                            name="bankType" 
                            defaultValue="Savings"
                            className="bg-[#1F1F1F] border border-white/10 p-4 rounded text-white focus:border-[#F5E6B3] outline-none transition-colors appearance-none"
                        >
                            <option value="Savings">Savings Account</option>
                            <option value="Cheque">Cheque / Current Account</option>
                            <option value="Transmission">Transmission Account</option>
                        </select>
                    </div>

                    {/* CHANGED:startDate is now a select for the day only */}
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Debit Day</label>
                        <select 
                            name="startDate" 
                            defaultValue="1"
                            className="bg-[#1F1F1F] border border-white/10 p-4 rounded text-white focus:border-[#F5E6B3] outline-none transition-colors appearance-none"
                        >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day}>Day {day}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* --- Navigation Buttons --- */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button 
                    type="button" 
                    onClick={onBack}
                    className="flex-1 py-4 border border-white/20 text-white font-oswald font-bold uppercase flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                >
                    <ArrowLeft size={18} /> Back
                </button>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-[2] py-4 bg-[#F5E6B3] text-black font-oswald font-bold uppercase flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "COMPLETE REGISTRATION"}
                </button>
            </div>
        </form>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{label}</label>
            <input 
                {...props}
                className="bg-[#1F1F1F] border border-white/10 p-4 rounded text-white focus:border-[#F5E6B3] outline-none transition-colors"
            />
        </div>
    );
}