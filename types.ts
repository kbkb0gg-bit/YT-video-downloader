
export interface User {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  bio: string;
  googleId?: string;
  createdAt: string;
}

export interface ImageMetadata {
  width: number;
  height: number;
  size: number;
  format: string;
}

export interface PixelImage {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  tags: string[];
  views: number;
  downloads: number;
  shares: number;
  createdAt: string;
  metadata: ImageMetadata;
}

export interface Activity {
  id: string;
  userId: string;
  imageId: string;
  type: 'view' | 'download' | 'share' | 'upload';
  createdAt: string;
}

export interface Report {
  id: string;
  imageId: string;
  reporterId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export enum AuthState {
  LOGGED_OUT,
  LOGGED_IN,
  LOADING
}
