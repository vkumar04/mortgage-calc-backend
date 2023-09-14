import { MortgageFormData } from "../../types";

interface HistoryListProps {
  history: MortgageFormData[];
  recalculateMortgage: (data: MortgageFormData) => void;
}

export const HistoryList = ({
  history,
  recalculateMortgage,
}: HistoryListProps) => {
  return (
    <>
      {history.length > 0 && (
        <div className="mt-4 flex flex-col">
          <h2>Calculation History:</h2>
          <ul className="mt-1 flex flex-col">
            {history.map((item, index) => (
              <li key={index}>
                Principal: {item.loanAmount}, Interest Rate: {item.interestRate}
                , Loan Term: {item.loanTerm}
                <button
                  className="btn btn-primary btn-sm block"
                  onClick={() => recalculateMortgage(item)}
                >
                  Recalculate
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
