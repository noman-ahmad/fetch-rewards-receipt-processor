import { SelectReceiptType } from "../../repos/receipts.repo";
import {
  alphaNumericCharacters,
  findTotalPointsForReceipt,
  isPurchaseTimeBetween,
  isTotalMultiple,
  isTotalRoundDollar,
  itemCountDivisible,
  totalItemDescription,
} from "./points";

describe("Point Calculation Tests", () => {
  describe("First Test Case", () => {
    const mockedCase = {
      id: "1",
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      receiptItems: [
        {
          id: "1",
          shortDescription: "Mountain Dew 12PK",
          price: "6.49",
          receiptId: "1",
        },
        {
          id: "2",
          shortDescription: "Emils Cheese Pizza",
          price: "12.25",
          receiptId: "1",
        },
        {
          id: "3",
          shortDescription: "Knorr Creamy Chicken",
          price: "1.26",
          receiptId: "1",
        },
        {
          id: "4",
          shortDescription: "Doritos Nacho Cheese",
          price: "3.35",
          receiptId: "1",
        },
        {
          id: "5",
          shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
          price: "12.00",
          receiptId: "1",
        },
      ],
      total: "35.35",
    };
    it("should return a total of 28 points", () => {
      expect(findTotalPointsForReceipt(mockedCase)).toEqual(28);
    });
  });
  describe("Second Test Case", () => {
    const mockedCase = {
      id: "2",
      retailer: "M&M Corner Market",
      purchaseDate: "2022-03-20",
      purchaseTime: "14:33",
      receiptItems: [
        {
          id: "1",
          shortDescription: "Gatorade",
          price: "2.25",
          receiptId: "2",
        },
        {
          id: "2",
          shortDescription: "Gatorade",
          price: "2.25",
          receiptId: "2",
        },
        {
          id: "3",
          shortDescription: "Gatorade",
          price: "2.25",
          receiptId: "2",
        },
        {
          id: "4",
          shortDescription: "Gatorade",
          price: "2.25",
          receiptId: "2",
        },
      ],
      total: "9.00",
    };
    it("should return a total of 109 points", () => {
      expect(alphaNumericCharacters(mockedCase)).toEqual(14);
      expect(isTotalRoundDollar(mockedCase)).toBe(true);
      expect(isTotalMultiple(mockedCase)).toBe(true);
      expect(isPurchaseTimeBetween(mockedCase)).toBe(true);
      expect(itemCountDivisible(mockedCase)).toEqual(2);
      expect(findTotalPointsForReceipt(mockedCase)).toEqual(109);
    });
  });
});
