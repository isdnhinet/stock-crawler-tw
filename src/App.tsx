import { Suspense, useMemo, useState, lazy, useEffect, type ComponentType } from "react";
import TopBar from "./components/TopBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayTools from "./utils/dayTools";

// lazy load components 
const createLazyComponent = <P extends object>( 
  importFn: () => Promise<{ default: ComponentType<P> }>,
  componentName: string 
) => {
  return lazy(() => 
    importFn().catch((err) => {
      console.error(`Failed to load ${componentName}`, err);
      return {
        default: () => (
          <div className="bg-linear-to-br from-red-900/60 via-red-800/40 to-red-900/60 rounded-lg border border-red-500/40 p-6 text-center">
            <div className="text-red-400 mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-300 font-semibold mb-1">載入失敗</p>
            <p className="text-red-400/80 text-sm">無法載入{componentName}，請重新整理頁面</p>
          </div>
        )
      };
    })
  );
};

const TwseDailyTable = createLazyComponent(() => import("./components/TwseDailyTable"), "TwseDailyTable" );
const TwseDetailTable = createLazyComponent(() => import("./components/TwseDetailTable"), "TwseDetailTable");


/*
const MARKET_HISTORY_RANGE_OPTIONS = [
  { days: 1, label: '1天', date: []},
  { days: 3, label: '3天', date: []},
  { days: 5, label: '5天', date: []},
] as const;
 */

const SupenseFallback = () => (
  <div className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-amber-50"></div>
  </div>
);



function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading] = useState(false);

  const yesterday = dayTools().subtract(1).format("YYYYMMDD");
  const beforeyesterday = dayTools().subtract(4).format("YYYYMMDD");


  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isOnStockInfoPage = location.pathname.match(/^\/stock\/(\d+)$/) !== null;
  const currentStockId = useMemo(() => {
    if (params.id) return params.id;
    if (location.pathname.startsWith('/stock/')) {
      const match = location.pathname.match(/^\/stock\/(\d+)(?:\/(.+))?$/); 
      if (match) return match[1];
    }
    return null;
  }, [params.id, location.pathname]);

  const handleSearch = (val: string) => {
    setSearchValue(val);
  };

  useEffect(() => {
    if (searchValue.length === 4) {
      navigate(`/stock/${searchValue}`);
    }
  }, [searchValue, navigate]);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <TopBar searchValue={searchValue} onSearch={handleSearch} disabled={isLoading} />
      { /* Main Content */ }
      <div 
        className="pb-8" 
        style={{paddingTop: 'calc(var(--topbar-content-offset, 96px) + clamp(3.5rem, 10vw, 6rem))'}}
      >
        {
          isOnStockInfoPage && currentStockId && 
          <Suspense fallback={<SupenseFallback/>}>
            <TwseDetailTable stockNo={currentStockId} date={[yesterday]} />
          </Suspense>
        }
        <Suspense fallback={<SupenseFallback/>}>
          <TwseDailyTable date={[yesterday, beforeyesterday]} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;


