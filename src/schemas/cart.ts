import { ProductReference } from "./product-reference.js";

export interface Cart {
  products: ProductReference[],
  discount: string | undefined
}