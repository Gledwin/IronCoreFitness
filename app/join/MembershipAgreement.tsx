// components/join/MembershipAgreement.tsx (FIXED)
import Link from "next/link";

// Define the component's expected props
interface AgreementProps {
  onContinue: () => void;
}

export default function MembershipAgreement({ onContinue }: AgreementProps) {
  return (
    <div className="p-8 rounded-xl bg-[#0b0b0b] border border-white/6 shadow-lg max-w-sm w-full">
      <h3 className="text-xl font-oswald mb-4 text-[#F5E6B3]">MEMBERSHIP AGREEMENT SUMMARY</h3>
      
      <div className="space-y-2 text-sm font-roboto text-[#CFC4A7]">
        <p>• Monthly fee: R500</p>
        <p>• Joining fee: R200</p>
        <p>• Freeze anytime, freezing fee: R50</p>
        <p>• Cancellation at any time</p>
        <p>• Member must follow the gym rules (conduct, safety and hygiene)</p>
        <p>• Billing rules (automated payments, failed payment policy)</p>
      </div>
      
      <Link href="/terms" className="mt-4 text-sm inline-block text-[#F5E6B3] hover:text-white transition">
        View Full Terms
      </Link>

      {/* NEW: Button to proceed to the next step */}
      <button
        onClick={onContinue}
        className="w-full mt-6 px-6 py-3 rounded-md bg-[#F5E6B3] text-[#1F1F1F] font-semibold font-oswald shadow-sm hover:brightness-105 transition"
      >
        I Agree, Proceed to Details
      </button>
    </div>
  );
}