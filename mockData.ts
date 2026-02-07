
import { PixelImage, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'alex_photo',
    email: 'alex@example.com',
    profilePic: 'https://picsum.photos/seed/u1/200',
    bio: 'Landscape enthusiast and tech lover.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u2',
    username: 'creative_mind',
    email: 'creative@example.com',
    profilePic: 'https://picsum.photos/seed/u2/200',
    bio: 'Digital artist exploring new horizons.',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_IMAGES: PixelImage[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `img-${i}`,
  userId: i % 2 === 0 ? 'u1' : 'u2',
  username: i % 2 === 0 ? 'alex_photo' : 'creative_mind',
  userAvatar: `https://picsum.photos/seed/u${(i % 2) + 1}/50`,
  url: `https://picsum.photos/seed/pixel-${i}/1200/800`,
  thumbnailUrl: `https://picsum.photos/seed/pixel-${i}/600/400`,
  title: `Stunning Capture ${i + 1}`,
  description: 'A beautiful high-resolution image captured in the wild.',
  tags: ['nature', 'photography', 'art', 'pixelshare'],
  views: Math.floor(Math.random() * 5000),
  downloads: Math.floor(Math.random() * 500),
  shares: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  metadata: {
    width: 1200,
    height: 800,
    size: 2048000,
    format: 'jpg'
  }
}));
