// components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/6 bg-[#171717]">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-32 h-8 relative">
            <Image src={"/Logo.png"} alt="logo" fill style={{ objectFit: "contain" }} />
          </div>
          <div className="text-sm text-[#8C8C8C] font-roboto">
            © {new Date().getFullYear()} IronCore Fitness. All Rights Reserved.
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#8C8C8C] font-roboto">
          <Link href="/privacy" className="hover:text-[#F5E6B3]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#F5E6B3]">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-[#F5E6B3]">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}