"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { 
    MessageSquare, Plus, Flame, Target, 
    Loader2, Users, ArrowRight, Trophy, 
    Zap, X 
} from 'lucide-react';

/* --- POST MODAL COMPONENT --- */
function CreatePostModal({ isOpen, onClose, onPost, userName }: any) {
    const [content, setContent] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#2B2B2B] border border-white/10 w-full max-w-xl p-8 rounded-sm shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-oswald font-bold uppercase tracking-tight text-white">Forged Thoughts</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
                </div>
                <div className="flex gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center font-oswald font-bold text-[#F5E6B3] border border-white/10 shrink-0">
                        {userName?.[0] || "A"}
                    </div>
                    <textarea 
                        autoFocus
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your progress or ask the circle..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 resize-none min-h-[120px] font-light outline-none"
                    />
                </div>
                <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                    <button onClick={onClose} className="px-6 py-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors">Cancel</button>
                    <button 
                        disabled={!content.trim()}
                        onClick={() => { onPost(content); setContent(""); }}
                        className="bg-[#F5E6B3] text-black px-8 py-3 font-oswald font-bold uppercase text-[11px] tracking-widest hover:bg-white transition-all disabled:opacity-50"
                    >
                        Post to Circle
                    </button>
                </div>
            </div>
        </div>
    );
}

/* --- MAIN PAGE --- */
export default function CommunityPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'feed' | 'challenges'>('feed');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('currentUser');
        if (!session) {
            router.replace('/login');
        } else {
            setUser(JSON.parse(session));
            
            // Load Posts from LocalStorage
            const savedPosts = localStorage.getItem('community_posts');
            if (savedPosts) {
                setPosts(JSON.parse(savedPosts));
            } else {
                const initialPosts = [
                    { id: 1, name: "Marcus Thorne", content: "New PR on deadlifts today! 220kg. The program is working. 💪", likes: 42, time: "2h ago" },
                    { id: 2, name: "Sarah Jenkins", content: "Who's hitting the morning HIIT session tomorrow? Let's get it!", likes: 12, time: "5h ago" }
                ];
                setPosts(initialPosts);
                localStorage.setItem('community_posts', JSON.stringify(initialPosts));
            }
            setLoading(false);
        }
    }, [router]);

    const handleCreatePost = (content: string) => {
        const newPost = {
            id: Date.now(),
            name: user?.fullName || "Anonymous Athlete",
            content: content,
            likes: 0,
            time: "Just now"
        };
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('community_posts', JSON.stringify(updatedPosts));
        setIsModalOpen(false);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#F5E6B3] w-12 h-12" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#1E1E1E] text-white antialiased font-roboto">
            <Header isLoggedIn={true} userName={user?.fullName} />
            
            <CreatePostModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onPost={handleCreatePost}
                userName={user?.fullName}
            />

            {/* Header / Navigation */}
            <section className="py-20 px-6 md:px-20 border-b border-white/5 bg-gradient-to-b from-[#2B2B2B]/30 to-transparent">
                <div className="container mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <p className="text-[#F5E6B3] font-oswald text-sm uppercase tracking-[0.4em] mb-3">IronCore Circle</p>
                        <h1 className="text-5xl md:text-6xl font-oswald font-bold uppercase">{activeTab === 'feed' ? 'Community' : 'Challenges'}</h1>
                    </div>
                    
                    <div className="flex bg-[#2B2B2B] p-1 border border-white/10 rounded-sm">
                        <button 
                            onClick={() => setActiveTab('feed')}
                            className={`px-10 py-3 font-oswald font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'feed' ? 'bg-[#F5E6B3] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >Social Feed</button>
                        <button 
                            onClick={() => setActiveTab('challenges')}
                            className={`px-10 py-3 font-oswald font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'challenges' ? 'bg-[#F5E6B3] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >Challenges</button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-20 py-12">
                {activeTab === 'feed' ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-oswald font-bold uppercase flex items-center gap-3">
                                <MessageSquare className="text-[#F5E6B3]" /> Recent Activity
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#F5E6B3] text-black px-8 py-3 font-oswald font-bold uppercase text-[11px] tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-xl"
                            >
                                <Plus size={16} strokeWidth={3} /> Create Post
                            </button>
                        </div>
                        
                        {posts.map((post) => (
                            <FeedPost key={post.id} {...post} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="bg-[#2B2B2B] p-8 border-l-4 border-[#F5E6B3] flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-xl font-oswald font-bold uppercase flex items-center gap-2">
                                    <Trophy className="text-[#F5E6B3] w-5 h-5" /> IronCore Global Events
                                </h2>
                                <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Join a challenge to push your limits with the collective.</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                <Users size={14} /> 2,450 Athletes Competing
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ChallengeCard title="The Iron Marathon" duration="30 DAYS" difficulty="HARD" members="1,240" description="Complete 20 high-intensity workouts in 30 days." />
                            <ChallengeCard title="Summer Shred 2024" duration="6 WEEKS" difficulty="MEDIUM" members="850" description="Cut body fat while maintaining lean muscle mass." />
                            <ChallengeCard title="Power Hour" duration="7 DAYS" difficulty="EXPERT" members="420" description="Heavy lifting protocol focused on Big 3 movements." />
                            <ChallengeCard title="Mobility Master" duration="14 DAYS" difficulty="EASY" members="2,100" description="Focus on recovery, stretching, and functional range." />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}

/* --- UI COMPONENTS --- */

function ChallengeCard({ title, duration, difficulty, members, description }: any) {
    return (
        <div className="bg-[#2B2B2B] border border-white/5 p-8 rounded-sm hover:border-[#F5E6B3]/40 transition-all group flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 border border-white/10 text-[#F5E6B3]"><Zap size={20} /></div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{difficulty}</span>
                </div>
                <h3 className="text-xl font-oswald font-bold uppercase mb-2 group-hover:text-[#F5E6B3] transition-colors">{title}</h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-8">{description}</p>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 uppercase font-black">Duration</span>
                        <span className="text-[10px] font-bold text-white uppercase">{duration}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 uppercase font-black">Members</span>
                        <span className="text-[10px] font-bold text-white">{members}</span>
                    </div>
                </div>
                <button className="text-[10px] font-oswald font-bold uppercase text-[#F5E6B3] flex items-center gap-2 hover:translate-x-1 transition-all">
                    Join <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}

function FeedPost({ name, time, content, likes }: any) {
    return (
        <div className="bg-[#2B2B2B] p-10 border border-white/5 rounded-sm hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#1E1E1E] flex items-center justify-center font-oswald font-bold text-[#F5E6B3] border border-white/10 text-xl">{name[0]}</div>
                <div>
                    <h4 className="font-oswald font-bold uppercase text-base leading-none tracking-tight">{name}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1 inline-block">{time}</span>
                </div>
            </div>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed font-light">{content}</p>
            <div className="flex gap-8 pt-6 border-t border-white/5">
                <button className="text-[10px] font-oswald font-black uppercase tracking-widest text-gray-500 hover:text-orange-500 flex items-center gap-2 transition-colors">
                    <Flame size={14} /> {likes} Likes
                </button>
                <button className="text-[10px] font-oswald font-black uppercase tracking-widest text-gray-500 hover:text-[#F5E6B3] flex items-center gap-2 transition-colors">
                    <MessageSquare size={14} /> Add Comment
                </button>
            </div>
        </div>
    );
}