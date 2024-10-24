export interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  trend?: 'up' | 'down' | 'stable';
  isNew?: boolean;
}
