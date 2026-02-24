import { relations } from "drizzle-orm";
import { users, wallets, transactions, invoices } from "./schema";

export const userRelations = relations(users, ({ many }) => ({
  wallets: many(wallets),
  transactions: many(transactions),
  invoices: many(invoices),
}));