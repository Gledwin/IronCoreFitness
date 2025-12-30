"use client";

import { useState, useEffect } from 'react';
import { Timer, X, CheckCircle2, Award, Zap, Plus, Trash2, Trophy } from 'lucide-react';

export default function ActiveWorkout({ workout, onClose }: { workout: any, onClose: () => void }) {
    const [seconds, setSeconds] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [restTime, setRestTime] = useState(0);
    const [isResting, setIsResting] = useState(false);
    
    // Track sets for each exercise: { [exerciseIndex]: [{weight, reps, completed}] }
    const [workoutData, setWorkoutData] = useState<any>({});

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isFinished) setSeconds(s => s + 1);
            if (isResting && restTime > 0) setRestTime(r => r - 1);
            if (restTime === 0) setIsResting(false);
        }, 1000);
        return () => clearInterval(interval);
    }, [isFinished, isResting, restTime]);

    const exerciseList = workout.exercises && workout.exercises.length > 0 
        ? workout.exercises 
        : [{ name: "Main Movement" }];

    // Initialize sets for an exercise if they don't exist
    const getSets = (index: number) => workoutData[index] || [{ weight: '', reps: '', completed: false }];

    const updateSet = (exIndex: number, setIndex: number, data: any) => {
        const currentSets = [...getSets(exIndex)];
        currentSets[setIndex] = { ...currentSets[setIndex], ...data };
        setWorkoutData({ ...workoutData, [exIndex]: currentSets });
    };

    const addSet = (exIndex: number) => {
        const currentSets = [...getSets(exIndex)];
        currentSets.push({ weight: '', reps: '', completed: false });
        setWorkoutData({ ...workoutData, [exIndex]: currentSets });
    };

    const completeSet = (exIndex: number, setIndex: number) => {
        updateSet(exIndex, setIndex, { completed: true });
        setRestTime(60);
        setIsResting(true);
    };

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    return (
        <div className="fixed inset-0 z-[100] bg-[#1E1E1E] flex flex-col font-roboto">
            {/* Top Navigation */}
            <div className="bg-[#2B2B2B] border-b border-white/5 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="bg-[#F5E6B3] p-2 rounded-sm">
                        <Zap size={16} className="text-black" fill="black" />
                    </div>
                    <h2 className="text-xl font-oswald font-bold uppercase tracking-tight text-white">
                        {workout.title || "Active Protocol"}
                    </h2>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Total Time</p>
                        <p className="font-oswald font-bold text-[#F5E6B3]">{formatTime(seconds)}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Rest Timer Banner */}
            {isResting && (
                <div className="bg-[#F5E6B3] py-2 text-center animate-pulse">
                    <p className="text-black font-oswald font-bold uppercase text-xs tracking-[0.3em]">
                        Rest Active: 00:{restTime.toString().padStart(2, '0')}
                    </p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 md:p-12">
                {!isFinished ? (
                    <div className="max-w-4xl mx-auto space-y-12">
                        {exerciseList.map((ex: any, exIdx: number) => (
                            <div key={exIdx} className="bg-[#2B2B2B] border border-white/5 rounded-sm overflow-hidden">
                                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                    <h3 className="font-oswald font-bold uppercase text-lg text-[#F5E6B3]">
                                        {exIdx + 1}. {ex.name || ex}
                                    </h3>
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                        {ex.muscle || "Full Body"}
                                    </span>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Table Headers */}
                                    <div className="grid grid-cols-4 gap-4 text-[9px] text-gray-500 font-black uppercase tracking-widest px-2">
                                        <span>Set</span>
                                        <span>KG</span>
                                        <span>Reps</span>
                                        <span className="text-right">Action</span>
                                    </div>

                                    {/* Set Rows */}
                                    {getSets(exIdx).map((set: any, setIdx: number) => (
                                        <div key={setIdx} className={`grid grid-cols-4 gap-4 items-center p-2 rounded-sm transition-colors ${set.completed ? 'bg-[#F5E6B3]/5' : ''}`}>
                                            <span className="font-oswald font-bold text-gray-400">{setIdx + 1}</span>
                                            <input 
                                                type="number" placeholder="0" value={set.weight}
                                                onChange={(e) => updateSet(exIdx, setIdx, { weight: e.target.value })}
                                                disabled={set.completed}
                                                className="bg-[#1E1E1E] border border-white/10 p-2 text-white font-oswald text-sm focus:border-[#F5E6B3] outline-none disabled:opacity-50"
                                            />
                                            <input 
                                                type="number" placeholder="0" value={set.reps}
                                                onChange={(e) => updateSet(exIdx, setIdx, { reps: e.target.value })}
                                                disabled={set.completed}
                                                className="bg-[#1E1E1E] border border-white/10 p-2 text-white font-oswald text-sm focus:border-[#F5E6B3] outline-none disabled:opacity-50"
                                            />
                                            <div className="text-right">
                                                {set.completed ? (
                                                    <CheckCircle2 size={18} className="text-[#F5E6B3] ml-auto" />
                                                ) : (
                                                    <button 
                                                        onClick={() => completeSet(exIdx, setIdx)}
                                                        className="bg-white/5 hover:bg-[#F5E6B3] hover:text-black p-2 rounded-sm transition-all"
                                                    >
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <button 
                                        onClick={() => addSet(exIdx)}
                                        className="w-full py-2 border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={12} /> Add Set
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button 
                            onClick={() => setIsFinished(true)}
                            className="w-full py-6 bg-[#F5E6B3] text-black font-oswald font-bold uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl"
                        >
                            Complete Training
                        </button>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto text-center py-20 space-y-8 animate-in zoom-in">
                        <div className="w-24 h-24 bg-[#F5E6B3] rounded-full flex items-center justify-center mx-auto">
                            <Trophy size={48} className="text-black" />
                        </div>
                        <h2 className="text-5xl font-oswald font-bold uppercase italic tracking-tighter text-white">Forged in Iron</h2>
                        <div className="bg-[#2B2B2B] p-6 border border-white/5">
                            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">Total Duration</p>
                            <p className="text-3xl font-oswald font-bold text-[#F5E6B3]">{formatTime(seconds)}</p>
                        </div>
                        <button onClick={onClose} className="w-full py-4 border border-white/10 text-white font-oswald font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}