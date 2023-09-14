import { MortgageFormData } from "../types";

export const calculateSchedule = (data: MortgageFormData) => {
  const { loanAmount, interestRate, loanTerm } = data;
  const monthlyInterestRate = interestRate / 1200; // Monthly interest rate
  const numberOfPayments = loanTerm * 12; // Total number of payments
  const monthlyPayment =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const schedule = [];

  let remainingBalance = loanAmount;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    schedule.push({
      month: i,
      payment: monthlyPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      balance: remainingBalance.toFixed(2),
    });
  }

  return schedule;
};
