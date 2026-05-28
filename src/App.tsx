import { useTwseApi } from "./hooks/useTwseApi";
import { TwseApiPath } from "./constants/twseApiPath";

function App() {
  const no = "2330";
  const date = "20260525";
  const { result: resultSTD, status: statusSTD } = useTwseApi( 
    TwseApiPath.STOCK_DAY, { stockNo: no , date: date }
  );
  const { data: dataSTD, fields: fieldsSTD } = resultSTD;
  const { result: resultSTDA, status: statusSTDA } = useTwseApi(
    TwseApiPath.STOCK_DAY_ALL, { date: date }
  );

  if (!statusSTDA.loading && !statusSTDA.error) {
    const { data: dataSTDA, fields: fieldsSTDA } = resultSTDA;
    console.log(dataSTDA);
    console.log(fieldsSTDA);
  }

  if (statusSTD.loading) return <p>twse載入中...</p>;
  if (statusSTD.error) return <p>twse錯誤: {statusSTD.error}</p>;

  const colKeys = fieldsSTD.length > 0
      ? fieldsSTD
      : dataSTD.length > 0
      ? Object.keys(dataSTD[0])
      : [];

  return (
    <div className="App">
      <div>
        <table>
          
        </table>
      </div>
      <div>
        <h1>{no}</h1>
        <table>
          <thead>
            <tr>
              {colKeys.map(key =>(
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSTD.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) =>(
                  <td key={cIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;


