import { createClient } from "@supabase/supabase-js"

const supabase = createClient('https://iiemhdtwycipcthqiara.supabase.co', import.meta.env.VITE_SUPABASE_API)

export { supabase }