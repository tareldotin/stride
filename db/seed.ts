import "dotenv/config";
import { db } from "./index";
import { collections, products } from "./schema";
import { COLLECTIONS, PRODUCTS } from "../lib/data";

async function seed() {
  console.log("Seeding STRIDE catalog…");

  await db.delete(products);
  await db.delete(collections);

  await db.insert(collections).values(
    COLLECTIONS.map((c) => ({
      slug: c.slug,
      index: c.index,
      name: c.name,
      tagline: c.tagline,
      description: c.description,
      cover: c.cover,
    })),
  );

  await db.insert(products).values(
    PRODUCTS.map((p) => ({
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
    })),
  );

  console.log(`Seeded ${COLLECTIONS.length} collections and ${PRODUCTS.length} products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
