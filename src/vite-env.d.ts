/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  // mais variáveis de ambiente...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
