export interface Bleet {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  rebleets: number;
  verified: boolean;
  attachments?: string[];
}

export interface Profile {
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  followersCount: number;
  followingCount: number;
}

export interface Notification {
  from: string;
  displayName: string;
  avatar: string;
  type: string;
}
