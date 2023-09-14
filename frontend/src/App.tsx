import { useState } from "react";
import { CalculatorForm } from "./components/calculatorForm/CalculatorForm";
import { DataTable } from "./components/dataTable/DataTable";
import { Navigation } from "./components/navigation/Navigation";
import { amortizationData } from "./types";

function App() {
  const [amortizationData, setAmortizationData] = useState<amortizationData[]>(
    []
  );

  return (
    <>
      <Navigation title="Mortgage Calculator" />
      <div className="grid grid-cols-6 gap-6 p-2">
        <div className="col-span-1">
          <CalculatorForm setAmortizationData={setAmortizationData} />
        </div>
        <div className="col-span-5">
          <DataTable amortizationData={amortizationData} />
        </div>
      </div>
    </>
  );
}

export default App;
