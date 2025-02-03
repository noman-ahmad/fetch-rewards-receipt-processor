import { SelectReceiptType } from "../../repos/receipts.repo";

export function alphaNumericCharacters(receipt: SelectReceiptType): number {
  return receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
}

export function isTotalRoundDollar(receipt: SelectReceiptType): boolean {
  return Number.isInteger(Number(receipt.total));
}

export function isTotalMultiple(
  receipt: SelectReceiptType,
  factor: number = 0.25
): boolean {
  return Number(receipt.total) % factor === 0;
}

export function itemCountDivisible(
  receipt: SelectReceiptType,
  divisor: number = 2
): number {
  return Math.floor(receipt.receiptItems.length / divisor);
}

export function isOddPurchaseDate(receipt: SelectReceiptType): boolean {
  return Number(receipt.purchaseDate.slice(-2)) % 2 !== 0;
}

export function isPurchaseTimeBetween(
  receipt: SelectReceiptType,
  start_hour: number = 14,
  end_hour: number = 16
) {
  const delimiterIndex = receipt.purchaseTime.indexOf(":");
  const hour = Number(receipt.purchaseTime.substring(0, delimiterIndex));
  const minute = Number(receipt.purchaseTime.substring(delimiterIndex + 1));
  return hour < end_hour && (hour >= start_hour && minute > 0);
}

export function totalItemDescription(
  receipt: SelectReceiptType,
  factor: number = 3,
  toMultiply: number = 0.2
): number {
  return receipt.receiptItems.reduce((total, currentItem) => {
    const trimmedItemDescription = currentItem.shortDescription.trim();
    if (trimmedItemDescription.length % factor === 0) {
      return total + Math.ceil(Number(currentItem.price) * toMultiply);
    } else {
      return total;
    }
  }, 0);
}

export function findTotalPointsForReceipt(receipt: SelectReceiptType) {
  let points = 0;
  points += alphaNumericCharacters(receipt);
  if (isTotalRoundDollar(receipt)) {
    points += 50;
  }
  if (isTotalMultiple(receipt)) {
    points += 25;
  }
  points += (5 * itemCountDivisible(receipt));
  points += totalItemDescription(receipt);
  if (isOddPurchaseDate(receipt)) {
    points += 6;
  }
  if (isPurchaseTimeBetween(receipt)) {
    points += 10;
  }
  return points;
}
