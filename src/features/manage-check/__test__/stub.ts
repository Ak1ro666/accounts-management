import { Payment } from "@/kernel/account";
import type { Charge } from "../domain/account";

export const testCharge1: Charge = {
  amount: 1000,
  date: new Date().toISOString(),
  id: "1",
};

export const testCharge2: Charge = {
  amount: 2000,
  date: new Date().toISOString(),
  id: "2",
};

export const testChargesAsc: Charge[] = [
  { amount: 1000, date: "2020-01-01T00:00:00.000Z", id: "1" },
  { amount: 2000, date: "2020-01-02T00:00:01.000Z", id: "2" },
  { amount: 3000, date: "2020-01-03T00:00:02.000Z", id: "3" },
  { amount: 4000, date: "2020-01-04T00:00:03.000Z", id: "4" },
  { amount: 5000, date: "2020-01-05T00:00:03.000Z", id: "5" },
  { amount: 6000, date: "2020-01-06T00:00:04.000Z", id: "6" },
  { amount: 7000, date: "2020-01-07T00:00:05.000Z", id: "7" },
  { amount: 8000, date: "2020-01-08T00:00:06.000Z", id: "8" },
  { amount: 9000, date: "2020-01-09T00:00:07.000Z", id: "9" },
  { amount: 10000, date: "2020-01-10T00:00:08.000Z", id: "10" },
];

export const testChargesDesc: Charge[] = [
  { amount: 10000, date: "2020-01-10T00:00:08.000Z", id: "10" },
  { amount: 9000, date: "2020-01-09T00:00:07.000Z", id: "9" },
  { amount: 8000, date: "2020-01-08T00:00:06.000Z", id: "8" },
  { amount: 7000, date: "2020-01-07T00:00:05.000Z", id: "7" },
  { amount: 6000, date: "2020-01-06T00:00:04.000Z", id: "6" },
  { amount: 5000, date: "2020-01-05T00:00:03.000Z", id: "5" },
  { amount: 4000, date: "2020-01-04T00:00:03.000Z", id: "4" },
  { amount: 3000, date: "2020-01-03T00:00:02.000Z", id: "3" },
  { amount: 2000, date: "2020-01-02T00:00:01.000Z", id: "2" },
  { amount: 1000, date: "2020-01-01T00:00:00.000Z", id: "1" },
];

export const testPayment1: Payment = {
  amount: 1000,
  date: new Date().toISOString(),
  id: "1",
};

export const testPayment2: Payment = {
  amount: 2000,
  date: new Date().toISOString(),
  id: "2",
};

export const testPayments: Payment[] = [
  { amount: 1000, date: "2020-01-01T00:00:00.000Z", id: "1" },
  { amount: 2000, date: "2020-01-02T00:00:01.000Z", id: "2" },
  { amount: 3000, date: "2020-01-03T00:00:02.000Z", id: "3" },
  { amount: 4000, date: "2020-01-04T00:00:03.000Z", id: "4" },
  { amount: 5000, date: "2020-01-05T00:00:03.000Z", id: "5" },
  { amount: 6000, date: "2020-01-06T00:00:04.000Z", id: "6" },
  { amount: 7000, date: "2020-01-07T00:00:05.000Z", id: "7" },
  { amount: 8000, date: "2020-01-08T00:00:06.000Z", id: "8" },
  { amount: 9000, date: "2020-01-09T00:00:07.000Z", id: "9" },
  { amount: 10000, date: "2020-01-10T00:00:08.000Z", id: "10" },
];
