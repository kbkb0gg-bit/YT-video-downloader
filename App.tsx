
import React, { useState, useEffect, useCallback } from 'react';
import { PixelImage, User, AuthState } from './types';
import { storageService } from './services/storageService';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AuthModal from './components/AuthModal';
import UploadModal from './components/UploadModal';
import ImageDetailModal from './components/ImageDetailModal';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(storageService.getCurrentUser());
  const [images, setImages] = useState<PixelImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PixelImage | null>(null);
  const [view, setView] = useState<'home' | 'profile'>('home');

  const fetchImages = useCallback(async (pageNum: number, search: string, reset: boolean = false) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));
    
    const result = storageService.getImages(pageNum, 12, search);
    if (reset) {
      setImages(result.data);
    } else {
      setImages(prev => [...prev, ...result.data]);
    }
    setHasMore(result.hasMore);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages(1, searchTerm, true);
    setPage(1);
  }, [searchTerm, fetchImages]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage, searchTerm);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setView('home');
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setView('home');
  };

  const handleImageClick = (img: PixelImage) => {
    setSelectedImage(img);
    storageService.incrementStats(img.id, 'view');
  };

  const handleUploadSuccess = (newImg: PixelImage) => {
    setImages(prev => [newImg, ...prev]);
    setIsUploadOpen(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        user={user} 
        onSearch={handleSearch} 
        onJoinClick={() => setIsAuthOpen(true)}
        onUploadClick={() => user ? setIsUploadOpen(true) : setIsAuthOpen(true)}
        onLogout={handleLogout}
        onLogoClick={() => setView('home')}
        onProfileClick={() => setView('profile')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {view === 'home' ? (
          <>
            {searchTerm && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Search results for "{searchTerm}"
                </h2>
                <p className="text-slate-500">{images.length} images found</p>
              </div>
            )}
            
            <Gallery 
              images={images} 
              onImageClick={handleImageClick}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
            
            {!loading && images.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-slate-600">No images found</h3>
                <p className="text-slate-400">Try adjusting your search terms.</p>
              </div>
            )}
          </>
        ) : (
          <ProfilePage 
            user={user!} 
            onImageClick={handleImageClick} 
            onUpdateProfile={(updatedUser) => setUser(updatedUser)}
          />
        )}
      </main>

      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onSuccess={handleLogin} 
        />
      )}

      {isUploadOpen && (
        <UploadModal 
          onClose={() => setIsUploadOpen(false)} 
          onSuccess={handleUploadSuccess} 
        />
      )}

      {selectedImage && (
        <ImageDetailModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)}
          onDownload={() => storageService.incrementStats(selectedImage.id, 'download')}
          onShare={() => storageService.incrementStats(selectedImage.id, 'share')}
        />
      )}
    </div>
  );
};

export default App;
