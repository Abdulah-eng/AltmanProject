import { createBrowserClient } from "@supabase/ssr"

export function createClientClient() {
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

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
