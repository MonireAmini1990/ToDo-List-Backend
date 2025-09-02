import {
  serial,
  varchar,
  integer,
  date,
  time,
  timestamp,
  pgEnum,
  text,
  pgTable,
  json,
} from "drizzle-orm/pg-core";

// --- enums ---
export const statusEnum = pgEnum("status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

export const categoryEnum = pgEnum("category", [
  "work",
  "personal",
  "wishList",
]);

export const repeatEnum = pgEnum("repeat", [
  "none",      
  "daily",
  "weekly",
  "monthly",
]);

// --- users table ---
export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  token: varchar("token", { length: 500 }),
});

// --- tasks table ---
export const tasks = pgTable("tasks", {
  task_id: serial("task_id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  due_date: date("due_date"),
  status: statusEnum("status").notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  category: categoryEnum("category").notNull(),
  description: text("description").notNull(),
  repeat: repeatEnum("repeat").default("none"),
  time: time("time").notNull(),
  subtasks: json("subtasks"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});