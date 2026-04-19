export interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  platform: string;
  followers: number;
  engagementRate: number;
  sentiment: number;
  mentions: number;
  reach: number;
  verified: boolean;
}

export interface InfluencerActivity {
  influencerId: string;
  date: string;
  mentions: number;
  engagement: number;
  sentimentShift: number;
}
