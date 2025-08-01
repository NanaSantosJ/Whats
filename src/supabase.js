import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dzysjjblmtfgxryrpezu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // sua key

export const supabase = createClient(supabaseUrl, supabaseKey);
