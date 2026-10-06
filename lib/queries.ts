import { db } from "@/db";
import { collections, products, type Collection, type Product } from "@/db/schema";
import { COLLECTIONS, PRODUCTS, type SeedCollection, type SeedProduct } from "@/lib/data";
import { desc, eq } from "drizzle-orm";

// ── Fallback shapers: keep the site fully functional even if the
// database is briefly unreachable (e.g. right before seeding). ──

function seedToProduct(p: SeedProduct, i: number): Product {
  return {
    id: `seed-${i}`,
    slug: p.slug,
    name: p.name,
    category: p.category,
    collectionSlug: p.collectionSlug,
    priceCents: p.priceCents,
    compareAtCents: p.compareAtCents ?? null,
    tag: p.tag ?? null,
    description: p.description,
    details: p.details,
    sizes: p.sizes,
    colors: p.colors,
    images: p.images,
    rating: p.rating,
    reviews: p.reviews,
    createdAt: new Date(0),
  };
}

function seedToCollection(c: SeedCollection, i: number): Collection {
  return {
    id: `seed-col-${i}`,
    slug: c.slug,
    index: c.index,
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    cover: c.cover,
  };
}

const FALLBACK_PRODUCTS = PRODUCTS.map(seedToProduct);
const FALLBACK_COLLECTIONS = COLLECTIONS.map(seedToCollection);

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceCents - b.priceCents);
    case "price-desc":
      return copy.sort((a, b) => b.priceCents - a.priceCents);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export async function getProducts(opts?: {
  category?: string;
  collectionSlug?: string;
}): Promise<Product[]> {
  let list: Product[];
  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    list = rows.length > 0 ? rows : FALLBACK_PRODUCTS;
  } catch {
    list = FALLBACK_PRODUCTS;
  }
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  if (opts?.collectionSlug)
    list = list.filter((p) => p.collectionSlug === opts.collectionSlug);
  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (rows.length > 0) return rows[0];
  } catch {
    // fall through to local data
  }
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const sameCategory = (await getProducts({ category: product.category })).filter(
    (p) => p.slug !== product.slug,
  );
  const sameCollection = (await getProducts({ collectionSlug: product.collectionSlug })).filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...sameCollection].slice(0, limit);
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const rows = await db.select().from(collections);
    if (rows.length > 0) {
      return [...rows].sort((a, b) => a.index.localeCompare(b.index));
    }
  } catch {
    // fall through
  }
  return FALLBACK_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const rows = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, slug))
      .limit(1);
    if (rows.length > 0) return rows[0];
  } catch {
    // fall through
  }
  return FALLBACK_COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

export async function getCollectionCount(collectionSlug: string): Promise<number> {
  return (await getProducts({ collectionSlug })).length;
}
