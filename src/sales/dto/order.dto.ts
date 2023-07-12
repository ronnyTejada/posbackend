export class OrderDto {
  id: string;
  customerName: string;
  customerDoc: string;
  products: object;
  total: number;
  date: string;
  paid: boolean;
  seller: string;
  owner: string;
  hour: string;
}
