import { Iproduct, IproductShop } from './product.interface';

export interface ICart {
  total: number;
  subtotal: number;
  product: Array<IproductShop>;
}
