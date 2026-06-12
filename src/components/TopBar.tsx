import { useNavigate } from "react-router-dom";
import { getAssetPath } from "../utils/getAssetPath";
import { useState } from "react";
import dayTools from "../utils/dayTools";

type Props = {
    searchValue: string;
    onSearch: (v: string) => void;
    disabled: boolean;
};

function SearchBar({ searchValue, onSearch, disabled }: Props) {
    const [searchTerm, setSearchTerm] = useState(searchValue || '');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="relative group h-full">
                <div className="absolute left-2.5 mid:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    <svg className="w-4 h-4 mid:w-5 mid:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        `w-full h-full pl-9
                        bg-slate-900/80 border rounded-lg
                        text-white placeholder-gray-400 
                        focus:outline-none focus:ring-1 transition-all text-xs mid:text-sm shadow-lg
                        ${
                            disabled ? 
                            'border-slate-700/70 cursor-not-allowed opacity-60' : 
                            'border-purple-700/70 focus:bg-slate-700/50'
                        }`
                    }
                />
            </div>
        </div>
    );
}

export default function TopBar({ searchValue, onSearch, disabled }: Props) {
    const navigate = useNavigate();
    
    return (
        <>
            <button className="topbar-desktop-logo" onClick={() => navigate('/')} >
                <img 
                    src={getAssetPath('logo.png')} 
                    alt="返回主頁"
                />
            </button>
            <div className="topbar-container">
                <div className="topbar-first-row">
                    <div className="topbar-main-row">
                        <button className="topbar-mobile-logo" onClick={() => navigate('/')} >
                            <img 
                                src={getAssetPath('logo.png')} 
                                alt="返回主頁"
                            />
                        </button>
                        <div className="topbar-search-container">
                            <SearchBar 
                                searchValue={searchValue} 
                                onSearch={onSearch} 
                                disabled={disabled} 
                            />
                        </div>
                    </div>

                    <div className="topbar-actions-row">
                        <div className="topbar-nav-button-container">
                            <button
                                className={`topbar-nav-button`}
                            >NAVBTN</button>
                        </div>

                        <div className="topbar-nav-button-container">
                            <button
                                className={`topbar-nav-button`}
                            >NAVBTN</button>
                        </div>

                        {/* Visual Separator */}
                        <div className="topbar-nav-separator"></div>

                        <div className="topbar-bug-report-btn">
                            <a href="#">report</a>
                        </div>
                        <div>
                            {dayTools().format("YYY-MM-DD")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

