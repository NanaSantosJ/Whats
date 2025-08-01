import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dzysjjblmtfgxryrpezu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eXNqamJsbXRmZ3hyeXJwZXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTgzMTksImV4cCI6MjA2OTU5NDMxOX0.fs2pxXDtfSXT75ymvHI7kObU9m22XrXD2OruariChIs";

export const supabase = createClient(supabaseUrl, supabaseKey);
