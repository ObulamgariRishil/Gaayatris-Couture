import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://spundgsvqdpmueenezuc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdW5kZ3N2cWRwbXVlZW5lenVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODA5NTMsImV4cCI6MjA4MDY1Njk1M30.eqSalqlDW1lNcaE0IrSxtlCYyRGbBEg3z3MJi_HAIVQ"
);