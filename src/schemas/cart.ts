import { ProductReference } from "./product-reference";

export interface Cart {
  products: ProductReference[],
  discount: string | undefined
}