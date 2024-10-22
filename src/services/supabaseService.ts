import { supabase } from '../config';

export async function saveDataToSupabase(tableName: string, data: any) {
  const { data: insertedData, error } = await supabase
    .from(tableName)
    .insert(data);
  if (error) console.error('Insert error:', error);
  return insertedData;
}

export async function getDataFromSupabase(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');
  if (error) console.error('Fetch error:', error);
  return data;
}
