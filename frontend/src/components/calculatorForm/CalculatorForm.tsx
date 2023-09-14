import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MortgageFormData, amortizationData } from "../../types";
import { HistoryList } from "../historyList/HistoryList";

interface CalculatorFormProps {
  setAmortizationData: (amortizationData: amortizationData[]) => void;
}

export const CalculatorForm = ({
  setAmortizationData,
}: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MortgageFormData>();
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-collection");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resultData = await response.json();
        setHistory(resultData);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };
    fetchData();
  }, []);

  const recalculateMortgage = async (data: MortgageFormData) => {
    setValue("loanAmount", data.loanAmount);
    setValue("interestRate", data.interestRate);
    setValue("loanTerm", data.loanTerm);
    try {
      const response = await fetch("http://localhost:3000/calculate-mortgage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resultData = await response.json();
      setResult(resultData);
      setAmortizationData(resultData?.amortizationTable);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  const onSubmit = async (data: MortgageFormData) => {
    try {
      const response = await fetch("http://localhost:3000/calculate-mortgage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resultData = await response.json();
      setResult(resultData);
      setAmortizationData(resultData?.amortizationTable);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };
  return (
    <div>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Loan Amount ($)</span>
          </label>
          <input
            className={`input input-bordered w-full max-w-xs ${
              errors.loanAmount && "input-accent"
            }`}
            type="number"
            {...register("loanAmount", { required: true })}
          />
          <label>
            {errors.loanAmount && (
              <span className="label-text-alt text-red-500">
                Loan Amount is required
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Interest Rate (%)</span>
          </label>
          <input
            className={`input input-bordered w-full max-w-xs ${
              errors.loanAmount && "input-accent"
            }`}
            type="number"
            step={0.01}
            {...register("interestRate", { required: true })}
          />
          <label>
            {errors.interestRate && (
              <span className="label-text-alt text-red-500">
                Interest Rate is required
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Loan Term (in months)</span>
          </label>
          <input
            className={`input input-bordered w-full max-w-xs ${
              errors.loanAmount && "input-accent"
            }`}
            type="number"
            {...register("loanTerm", { required: true })}
          />
          <label>
            {errors.loanTerm && (
              <span className="label-text-alt text-red-500">
                Loan Term is required
              </span>
            )}
          </label>
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          Calculate
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <h2>Monthly Payment</h2>
          <p className="text-2xl">${result?.monthlyPayment}</p>
        </div>
      )}
      <HistoryList
        history={history}
        recalculateMortgage={recalculateMortgage}
      />
    </div>
  );
};
