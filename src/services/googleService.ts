import { getGoogleApis } from '../config';
import { supabase } from '../config';

export async function getSearchConsoleData(siteUrl: string) {
  console.log('Search Console data fetch is temporarily disabled');
  return [{ query: 'example query', clicks: 10, impressions: 100 }];
}

export async function getGoogleAnalyticsData(viewId: string) {
  console.log('Google Analytics data fetch is temporarily disabled');
  return [['Sessions', 'Pageviews'], ['100', '500']];
}
