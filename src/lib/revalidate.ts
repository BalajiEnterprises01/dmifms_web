import { revalidatePath } from "next/cache";

/**
 * Public pages are prerendered (see the revalidate in the site layout), so an
 * admin save has to purge them or the edit would not show until the next
 * build. Every write route calls this after writeJSON.
 */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}
