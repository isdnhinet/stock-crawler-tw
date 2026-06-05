import TopBar from "./components/TopBar";
import { TwseAllDayTable } from "./components/TwseDayAllTable";
import { TwseDayTable } from "./components/TwseDayTable";

function App() {
  const test = false;
  
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <TopBar />
      { /* Main Content */ }
      <div 
        className="pb-8" 
        style={{paddingTop: 'calc(var(--topbar-content-offset, 96px) + clamp(3.5rem, 10vw, 6rem))'}}
      >
        { 
          test && (
            <div>
              <TwseDayTable params={{date: "20260527", stockNo: "2330"}} />
              <TwseAllDayTable params={{ date: "20260527"}} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default App;


