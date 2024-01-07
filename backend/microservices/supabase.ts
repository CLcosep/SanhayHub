
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto';

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
export async function uploadPDF(file: any): Promise<string> {
    // Uploads File image and returns public link
    const { data, error } = await supabase.storage
        .from('PDFs')
        //Generates random filename
        .upload(`${file.fieldname}/${randomUUID()}.${file.originalname.split('.').pop()}`, file.buffer, { contentType: file.mimetype });
    if (error) {
        throw new Error(error.message);
    }
    const link = await supabase.storage.from('PDFs').getPublicUrl(data.path).data.publicUrl;
    return link;
}
export default supabase;
