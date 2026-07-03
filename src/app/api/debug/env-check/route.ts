import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — confirms which env vars actually reach the
// Amplify SSR runtime, without ever exposing their values. Delete this
// file once SUPABASE_SERVICE_ROLE_KEY is confirmed present.
export async function GET() {
  const allKeys = Object.keys(process.env).sort();

  return NextResponse.json({
    hasServiceRoleKeyExact: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    serviceRoleKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasEncryptionKey: Boolean(process.env.ENCRYPTION_KEY),
    // ALL env var NAMES (never values) actually visible to this runtime —
    // reveals the true prefix/passthrough pattern instead of guessing.
    allEnvVarNames: allKeys,
    totalEnvVarCount: allKeys.length,
  });
}
