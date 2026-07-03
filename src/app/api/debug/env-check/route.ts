import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — confirms which env vars actually reach the
// Amplify SSR runtime, without ever exposing their values. Delete this
// file once SUPABASE_SERVICE_ROLE_KEY is confirmed present.
export async function GET() {
  const allKeys = Object.keys(process.env);
  const relevantKeys = allKeys.filter(
    (k) => k.toUpperCase().includes('SUPABASE') || k.toUpperCase().includes('SERVICE_ROLE')
  );

  return NextResponse.json({
    hasServiceRoleKeyExact: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    serviceRoleKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasEncryptionKey: Boolean(process.env.ENCRYPTION_KEY),
    // Exact key NAMES (never values) matching a loose search — reveals
    // typos, trailing spaces, or case differences invisible in the console.
    relevantEnvVarNamesFound: relevantKeys,
    totalEnvVarCount: allKeys.length,
  });
}
