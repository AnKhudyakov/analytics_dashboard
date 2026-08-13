export interface TrackedChannel {
  id: string;
  title: string;
  thumbnail: string | null;
  country: string | null;
  subscribers: number;
  views: number;
  videos: number;
}

export interface Profile {
  username: string;
  displayName: string;
  email: string;
  role: string;
  channel: TrackedChannel | null;
  competitors: TrackedChannel[];
}
