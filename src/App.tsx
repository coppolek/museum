import { AppProvider, useApp } from './context/AppContext';
import { translations } from './data/museums';
import Header from './components/Header';
import HomePage from './components/HomePage';
import MuseumsPage from './components/MuseumsPage';
import MuseumTour from './components/MuseumTour';
import FavoritesPage from './components/FavoritesPage';
import AnalyticsPage from './components/AnalyticsPage';
import NotificationsPage from './components/NotificationsPage';
import LiveChat from './components/LiveChat';
import Map3D from './components/Map3D';
import ArtworkModal from './components/ArtworkModal';

function AppContent() {
  const { currentView, selectedArtwork, showMap3D, language } = useApp();
  const t = translations[language] || translations['it'];

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomePage />;
      case 'museums': return <MuseumsPage />;
      case 'tour': return <MuseumTour />;
      case 'favorites': return <FavoritesPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'notifications': return <NotificationsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="pb-20">
        {renderView()}
      </main>
      <LiveChat />
      {selectedArtwork && <ArtworkModal />}
      {showMap3D && <Map3D />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
