import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function TopBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="topbar-container ">
                <div className="topbar-first-row">
                    <div className="topbar-main-row">
                        <div className="topbar-main-row">
                            <button className="topbar-mobile-logo" onClick={() => navigate('/')}>backtoindex</button>
                            <div className="topbar-search-container">
                                <SearchBar disabled={false} />
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </>
    );
}

