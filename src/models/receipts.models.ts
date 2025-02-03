export type ReceiptItem = {
  shortDescription: string;
  price: string;
};

export type Receipt = {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: string;
  items: ReceiptItem[];
};
