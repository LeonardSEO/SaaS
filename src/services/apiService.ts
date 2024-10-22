import { supabase } from '../config';

export async function fetchExternalData(url: string) {
  try {
    const { data, error } = await supabase.functions.invoke('fetchExternalData', {
      body: JSON.stringify({ url }),
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching external data:', error);
    throw error;
  }
}
