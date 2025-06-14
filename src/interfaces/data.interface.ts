export interface ICategoryData {
  id: string;
  color: string;
  priority: number;
  usageLimit: number;
  name?: string;
}

export interface IExpenseData {
  id: string;
  amount: string;
  amountNumber: number;
  category: string;
  dateTime: string;
  description: string;
  expenseType: string;
  merchant: string;
  subject: string;
}
