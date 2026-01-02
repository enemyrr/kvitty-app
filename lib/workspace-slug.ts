import { db } from "./db";
import { workspaces } from "./db/schema";
import { eq } from "drizzle-orm";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateSlug(): string {
  let slug = "";
  for (let i = 0; i < 4; i++) {
    slug += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return slug;
}

export async function generateUniqueSlug(): Promise<string> {
  let slug = generateSlug();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const existing = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug),
    });

    if (!existing) {
      return slug;
    }

    slug = generateSlug();
    attempts++;
  }

  throw new Error("Failed to generate unique slug after 10 attempts");
}
