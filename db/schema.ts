import {
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type ProductColor = { name: string; hex: string };

export type OrderItem = {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(), // footwear | apparel | equipment
  collectionSlug: text("collection_slug").notNull(),
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  tag: text("tag"), // NEW | BESTSELLER | null
  description: text("description").notNull(),
  details: jsonb("details").$type<string[]>().notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  colors: jsonb("colors").$type<ProductColor[]>().notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  rating: real("rating").notNull().default(4.8),
  reviews: integer("reviews").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  index: text("index").notNull(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  cover: text("cover").notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  shippingCents: integer("shipping_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type Collection = typeof collections.$inferSelect;
export type Order = typeof orders.$inferSelect;
