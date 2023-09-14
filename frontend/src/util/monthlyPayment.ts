import { MortgageFormData } from "../types";

export const calculateMonthlyPayment = (data: MortgageFormData): number => {
  const { loanAmount, interestRate, loanTerm } = data;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return monthlyPayment;
};
