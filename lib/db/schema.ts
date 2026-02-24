import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
  numeric,
} from "drizzle-orm/pg-core";


// USERS TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});


// WALLETS (virtual accounts)
export const wallets = pgTable("wallets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  balance: numeric("balance", { precision: 12, scale: 2 }).default("0"),
  accountNumber: varchar("account_number", { length: 20 }),
  bankName: varchar("bank_name", { length: 255 }),
});


// TRANSACTIONS (airtime, data, etc)
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: varchar("type", { length: 50 }), // airtime, data, etc
  amount: numeric("amount", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 50 }), // success, pending
  reference: varchar("reference", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});


// INVOICES
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  description: text("description"),
  amount: numeric("amount", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 50 }).default("unpaid"),
  createdAt: timestamp("created_at").defaultNow(),
});