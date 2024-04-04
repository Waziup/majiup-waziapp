import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = `${import.meta.env.VITE_SUPABASE_URL}`;
const supabaseKey: any = `${import.meta.env.VITE_SUPABASE_ANON_KEY}`;

const supabase: any = createClient(supabaseUrl, supabaseKey);

export default supabase;
