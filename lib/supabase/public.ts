import { createClient } from "@supabase/supabase-js";

/**
 * A plain, cookie-free Supabase client for public, unauthenticated reads
 * that run inside the root layout (shared by every route). The normal
 * server client (lib/supabase/server.ts) calls `cookies()`, and Next.js
 * treats any `cookies()` read during render as a signal to opt the whole
 * page out of static rendering — used from the root layout, that silently
 * turned every previously-static marketing page dynamic. This data (the
 * footer's course list) needs no session/auth context, so it doesn't need
 * that cookie machinery at all.
 */
export function createPublicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
