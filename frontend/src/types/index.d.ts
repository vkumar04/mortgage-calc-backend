export interface MortgageFormData {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface amortizationData {
  month: number;
  payment: string;
  principal: string;
  interest: string;
  balance: string;
}
