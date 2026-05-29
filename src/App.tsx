import { TwseTable } from "./components/TwseTable";
import { BaseUrl } from "./constants/baseUrl";

function App() {
 
  return (
    <div className="App">
      <TwseTable path={BaseUrl.STOCK_DAY_ALL} params={{ date: "20260527", stockNo: "2330" }} />

    </div>
  );
};

export default App;


