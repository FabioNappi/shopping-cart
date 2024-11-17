import { Discount } from "../../src/data";

export const discountsFixture: Discount[] = [
  {
    code: 'discount-1',
    type: 'fixed',
    amount: 11,
  },
  {
    code: 'discount-2',
    type: 'percentage',
    amount: 20,
  },
  {
    code: 'discount-3',
    type: 'fixed',
    amount: 100,
  },
]