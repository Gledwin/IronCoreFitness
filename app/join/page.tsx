"use client";

import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import Header from "../components/header";
import Footer from "../components/footer";

import MembershipAgreement from "./MembershipAgreement";
import Step1AccountDetails from "./Step1InitialInfo";
import Step2PaymentMethod from "./Step2PaymentMethod";

// --- INTERFACES (BN Removed) ---
interface NextOfKinDTO {
    nokName: string;
    nokContact: string;
    nokRelation: string;
}

interface JoiningFeeCardDetailsDTO {
    cardHolder: string;
    cardNumber: string;
    securityCode: string;
    expiryDate: string;
}

interface RecurringDebitDetailsDTO {
    accountHolder: string;
    accountNumber: string;
    bankType: string;
    // branchCode removed here
    startDate: string;
}

interface FormDataType {
    fullName?: string;
    email?: string;
    phone?: string;
    residentialAddress?: string;
    dateOfBirth?: string;
    password?: string;
    confirmPassword?: string; 
    nextOfKin?: NextOfKinDTO;
    joiningFeePayment?: JoiningFeeCardDetailsDTO;
    recurringPaymentSetup?: RecurringDebitDetailsDTO;
}

interface FieldErrors { [key: string]: string; }

export default function JoinPage() {
    const [step, setStep] = useState(1); 
    const [formData, setFormData] = useState<FormDataType>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleContinue = useCallback((data: any) => {
        setFormData(prevData => ({ ...prevData, ...data }));
        setStep(prevStep => prevStep + 1);
        setFieldErrors({}); 
        setGlobalError(null);
    }, []);

    const handleBack = () => {
        setStep(prevStep => Math.max(1, prevStep - 1));
        setFieldErrors({}); 
        setGlobalError(null);
    };

    const handleFinalSubmit = async (paymentData: any) => {
        setIsSubmitting(true);
        setGlobalError(null);
        
        // 1. Combine all data
        const payload: FormDataType = { ...formData, ...paymentData };
        delete payload.confirmPassword;

        // 2. Prepare the clean user object for the dashboard
        const newUser = {
            ...payload,
            status: "ACTIVE", // Strictly ACTIVE, no "BN"
            caloriesBurned: 0,
            workoutProgress: "0%",
            gymVisits: "0/30",
            joinedDate: new Date().toLocaleDateString('en-ZA')
        };

        try {
            // 3. LocalStorage Logic
            const existingUsers = JSON.parse(localStorage.getItem("gym_users") || "[]");
            
            if (existingUsers.some((u: any) => u.email === newUser.email)) {
                setGlobalError("An account with this email already exists.");
                setIsSubmitting(false);
                return;
            }

            existingUsers.push(newUser);
            localStorage.setItem("gym_users", JSON.stringify(existingUsers));

            // 4. Success Flow
            setTimeout(() => {
                setIsSubmitting(false);
                alert("Registration successful!");
                router.push('/login');
            }, 1000);

        } catch (err) {
            setGlobalError('Error saving account data.');
            setIsSubmitting(false);
        }
    };
    
    const renderStep = () => {
        switch (step) {
            case 1: return <MembershipAgreement onContinue={() => setStep(2)} />;
            case 2: return <Step1AccountDetails onContinue={handleContinue} initialData={formData} fieldErrors={fieldErrors} />;
            case 3: return <Step2PaymentMethod onContinue={handleFinalSubmit} onBack={handleBack} isSubmitting={isSubmitting} fieldErrors={fieldErrors} />;
            default: return null;
        }
    };

    return (
        <main className="min-h-screen bg-[#1F1F1F] text-[#E6E6E6] antialiased">
            <Header />
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-oswald text-[#F5E6B3] text-center mb-10 uppercase">JOIN IRONCORE FITNESS</h1>
                
                {/* Step Indicators */}
                <div className="flex justify-center space-x-6 mb-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-oswald text-sm ${step === i ? 'bg-[#F5E6B3] text-black' : 'bg-[#2B2B2B] text-gray-500'}`}>{i}</div>
                    ))}
                </div>

                {globalError && <div className="mb-6 p-4 rounded bg-red-900/20 border border-red-700 text-red-400 text-center max-w-lg mx-auto">{globalError}</div>}
                <div className="flex justify-center">{renderStep()}</div>
            </div>
            <Footer />
        </main>
    );
}