import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client when environment variables are not set
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null }),
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => ({
              limit: () => ({ data: [], error: null }),
            }),
            order: () => ({ data: [], error: null }),
          }),
          order: () => ({
            limit: () => ({ data: [], error: null }),
            ascending: () => ({ data: [], error: null }),
          }),
          limit: () => ({ data: [], error: null }),
        }),
        insert: async () => ({ error: null }),
        update: () => ({
          eq: async () => ({ error: null }),
        }),
        delete: () => ({
          eq: async () => ({ error: null }),
        }),
        upsert: async () => ({ error: null }),
      }),
    } as any
  }

  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
