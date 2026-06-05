import { useState } from "react";

type Props= {
    disabled: boolean;
}

export default function SearchBar({ disabled }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled) {
            console.log('enter');
            setSearchTerm('');
        }
    };

    return (
        <div className="w-full h-full">
            <div className="relative group h-full">
                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    disabled={disabled} 
                    onKeyDown={handleKeyDown}
                    className={
                        `w-full h-full pl-9 bg-slate-900/70 rounded-lg border focus:outline-none transition-all 
                        ${
                            disabled ? 
                                'border-slate-700/30 cursor-not-allowed opacity-60' : 
                                'border-purple-500/30 focus:bg-slate-700/50'
                        }`
                    }
                />
            </div>
        </div>
    );
}