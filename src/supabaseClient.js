import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 
"https://cegzbqxhkitalnpodvlv.supabase.co"
const supabaseAnonKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZ3picXhoa2l0YWxucG9kdmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjI3MTEsImV4cCI6MjA2OTY5ODcxMX0.s9-dUNJCwLwApIG2RbSri24CS0FXxkJq8gm2YZwPpks"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

