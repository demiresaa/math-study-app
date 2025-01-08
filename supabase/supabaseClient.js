// supabase/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://msyazorsltojxobtghxo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWF6b3JzbHRvanhvYnRnaHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzY4NzEsImV4cCI6MjA1MTgxMjg3MX0.UbMawKRtF98WRru0hU_CjLNAUITfXDHpfso9roNRpOc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
