import {
  pgTable,
  serial,
  text,
  real
} from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),

  description: text("description").notNull(),

  category: text("category").notNull(),

  value: real("value").notNull(),

  date: text("date").notNull(),
});