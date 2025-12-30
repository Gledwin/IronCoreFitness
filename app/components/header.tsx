"use client"; 
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter

interface HeaderProps {
    isLoggedIn?: boolean; 
    userName?: string; 
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href; 
    const baseClasses = "text-sm font-oswald transition-colors tracking-widest";
    const activeClass = isActive ? 'text-[#F5E6B3]' : 'text-[#E6E6E6] hover:text-[#F5E6B3]';

    return (
        <Link href={href} className={`${baseClasses} ${activeClass}`}>
            {children}
        </Link>
    );
};

// Navigation for logged-in users 
const MemberNav = () => {
    const router = useRouter(); // Initialize router

    const handleLogout = () => {
        // 1. Clear session data
        localStorage.removeItem('currentUser');
        // 2. Route to login page
        router.replace('/login');
    };

    return (
        <div className="flex items-center space-x-6">
            <NavLink href="/dashboard">DASHBOARD</NavLink>
            <NavLink href="/profile">PROFILE</NavLink>
            <NavLink href="/community">COMMUNITY</NavLink>
            <NavLink href="/workouts">WORKOUTS</NavLink>
            <button 
                onClick={handleLogout} // Added the logout handler
                className="text-sm font-roboto text-[#8C8C8C] hover:text-white hover:bg-red-600/10 hover:border-red-600/40 transition-all ml-4 border border-[#2B2B2B] px-4 py-1.5 rounded-full"
            >
                LOGOUT
            </button>
        </div>
    );
};

// Navigation links for non-logged-in users (Guest)
const GuestNav = ({ pathname }: { pathname: string }) => {
    let links: { href: string; label: string; isPrimary: boolean }[] = [];

    if (pathname === '/') {
        links = [
            { href: "/login", label: "LOGIN", isPrimary: false },
            { href: "/join", label: "JOIN NOW", isPrimary: true },
        ];
    } else if (pathname === '/join') {
        links = [
            { href: "/", label: "HOME", isPrimary: false },
            { href: "/login", label: "LOGIN", isPrimary: true },
        ];
    } else if (pathname === '/login') {
        links = [
            { href: "/", label: "HOME", isPrimary: false },
            { href: "/join", label: "JOIN NOW", isPrimary: true },
        ];
    } else {
        links = [
            { href: "/", label: "HOME", isPrimary: false },
            { href: "/join", label: "JOIN NOW", isPrimary: true },
        ];
    }

    return (
        <div className="flex items-center space-x-6">
            {links.map((link) => {
                if (link.isPrimary) {
                    return (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className="px-6 py-2 rounded-md bg-[#F5E6B3] text-[#1F1F1F] font-oswald font-semibold text-sm shadow-md hover:brightness-105 transition-all ml-4"
                        >
                            {link.label}
                        </Link>
                    );
                }
                return (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default function Header({ isLoggedIn = false, userName }: HeaderProps) {
    const pathname = usePathname();
    
    // Updated Navigation to render MemberNav component properly
    const Navigation = () => {
        if (isLoggedIn) {
            return <MemberNav />;
        }
        return <GuestNav pathname={pathname} />;
    };

    const logoHref = isLoggedIn ? "/dashboard" : "/";

    return (
        <header className="sticky top-0 z-50 bg-[#1F1F1F] shadow-lg border-b border-[#2B2B2B]">
            <div className="container mx-auto px-6 md:px-10 lg:px-20 flex justify-between items-center h-20">
                <Link href={logoHref} className="flex items-center space-x-2">
                    <Image
                        src="/Logo.png"
                        alt="IronCore Fitness Logo"
                        width={140} 
                        height={32} 
                        className="object-contain"
                    />
                </Link>

                <Navigation />
            </div>
        </header>
    );
}