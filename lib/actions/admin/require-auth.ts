import { createClient } from "@/lib/supabase/server";

/** Every mutating admin Server Action calls this first — middleware alone is not trusted to gate writes. */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}
