import Input from "./Input";
import { ArrowRight, User, ShieldAlert } from "lucide-react";

interface FieldErrors {
    [key: string]: string;
}

interface Step1Props {
  onContinue: (data: any) => void;
  initialData: any; 
  fieldErrors: FieldErrors; 
}

const getError = (errors: FieldErrors, fieldName: string): string | undefined => {
    return errors[fieldName] || errors[`nextOfKin.${fieldName}`];
}

export default function Step1AccountDetails({ onContinue, initialData, fieldErrors }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const step1Data = {
        ...data,
        nextOfKin: {
            nokName: data.nokName, 
            nokContact: data.nokContact,
            nokRelation: data.nokRelation,
        },
        nokName: undefined,
        nokContact: undefined,
        nokRelation: undefined,
    };

    onContinue(step1Data);
  };

  return (
    <div className="p-10 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-xl max-w-2xl w-full text-white font-roboto">
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* Account Details Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <User className="w-5 h-5 text-[#F5E6B3]" />
                <h3 className="text-2xl font-oswald font-medium uppercase tracking-tight text-[#F5E6B3]">
                    Personal Information
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                    <Input 
                        id="fullName" name="fullName" label="Full Name" type="text" required 
                        defaultValue={initialData?.fullName} 
                        error={getError(fieldErrors, 'fullName')} 
                    />
                </div>
                <Input 
                    id="email" name="email" label="Email Address" type="email" required 
                    defaultValue={initialData?.email}
                    error={getError(fieldErrors, 'email')}
                />
                <Input 
                    id="phone" name="phone" label="Phone Number" type="tel" required 
                    defaultValue={initialData?.phone}
                    error={getError(fieldErrors, 'phone')}
                />
                <div className="md:col-span-2">
                    <Input 
                        id="residentialAddress" name="residentialAddress" label="Residential Address" type="text" required 
                        defaultValue={initialData?.residentialAddress}
                        error={getError(fieldErrors, 'residentialAddress')}
                    />
                </div>
                <Input 
                    id="dateOfBirth" name="dateOfBirth" label="Date of Birth" type="date" required 
                    defaultValue={initialData?.dateOfBirth}
                    error={getError(fieldErrors, 'dateOfBirth')}
                />
                <div className="hidden md:block" /> {/* Spacer */}
                <Input id="password" name="password" label="Password" type="password" required error={getError(fieldErrors, 'password')} /> 
                <Input id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" required />
            </div>
        </section>

        {/* Next of Kin Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <ShieldAlert className="w-5 h-5 text-[#F5E6B3]" />
                <h3 className="text-2xl font-oswald font-medium uppercase tracking-tight text-[#F5E6B3]">
                    Next of Kin Details
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                    <Input id="nokName" name="nokName" label="Full Name" type="text" required 
                        defaultValue={initialData?.nextOfKin?.nokName} 
                        error={getError(fieldErrors, 'nokName')} 
                    />
                </div>
                <Input id="nokContact" name="nokContact" label="Contact Number" type="tel" required 
                    defaultValue={initialData?.nextOfKin?.nokContact} 
                    error={getError(fieldErrors, 'nokContact')} 
                />
                <Input id="nokRelation" name="nokRelation" label="Relationship" type="text" placeholder="e.g. Spouse" required 
                    defaultValue={initialData?.nextOfKin?.nokRelation} 
                    error={getError(fieldErrors, 'nokRelation')} 
                />
            </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-6 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <input 
                type="checkbox" 
                id="accept" 
                required 
                className="w-5 h-5 rounded border-white/10 bg-[#111111] text-[#F5E6B3] focus:ring-offset-[#1A1A1A] focus:ring-[#F5E6B3] transition-all" 
              />
              <label htmlFor="accept" className="text-[11px] font-roboto font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors">
                I confirm all information provided is accurate
              </label>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-[#F5E6B3] text-black font-oswald font-bold uppercase tracking-[0.1em] text-sm rounded-full hover:bg-white hover:px-14 transition-all duration-300 flex items-center justify-center ml-auto group"
            >
              Proceed to Payment
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </form>
    </div>
  );
}