
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);
async function initialize() {

    // Perform a test query to check the validity of the Supabase key
    const { data, error } = await supabase.from('').select('*').limit(1);
    if (error) {
        throw error;
    }
    console.log("Supabase is initalized")
}
initialize();

export default supabase;
