import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, museums } from '../data/museums';

export default function MuseumTour() {
  const { language, currentMuseumId, setCurrentView, setSelectedArtwork, setCurrentRoom, isFavorite, addFavorite, removeFavorite, audioPlaying, setAudioPlaying, setShowMap3D } = useApp();
  const t = translations[language] || translations['it'];
  const [activeRoom, setActiveRoom] = useState(0);

  const museum = museums.find(m => m.id === currentMuseumId);
  if (!museum) return <div className="p-8 text-center">Museum not found</div>;

  const room = museum.rooms[activeRoom];
  const [currentArtwork, setCurrentArtwork] = useState(0);

  const getArtworkDescription = (artwork: any) => {
    switch (language) {
      case 'en': return artwork.descriptionEn;
      case 'es': return artwork.descriptionEs;
      case 'fr': return artwork.descriptionFr;
      case 'de': return artwork.descriptionDe;
      default: return artwork.description;
    }
  };

  const getRoomName = (r: any) => {
    return language === 'en' ? r.nameEn : r.name;
  };

  const nextArtwork = () => {
    if (currentArtwork < room.artworks.length - 1) {
      setCurrentArtwork(currentArtwork + 1);
    }
  };

  const prevArtwork = () => {
    if (currentArtwork > 0) {
      setCurrentArtwork(currentArtwork - 1);
    }
  };

  const artwork = room.artworks[currentArtwork];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back button & Museum info */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentView('museums')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← {t.backToMuseums}
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMap3D(true)}
            className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors text-sm"
          >
            🗺️ {t.map3d}
          </button>
          <button
            onClick={() => setAudioPlaying(!audioPlaying)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              audioPlaying
                ? 'bg-green-600/20 border border-green-500/30 text-green-400'
                : 'bg-gray-800 border border-gray-700 text-gray-400'
            }`}
          >
            {audioPlaying ? '🔊' : '🔇'} {t.audioGuide}
          </button>
        </div>
      </div>

      {/* Museum Header */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img src={museum.image} alt={museum.name} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{language === 'en' ? museum.nameEn : museum.name}</h1>
            <p className="text-gray-400">{museum.city}, {museum.country} • ⭐ {museum.rating}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {Math.floor(Math.random() * 30) + 10} {t.onlineVisitors}
          </div>
        </div>
      </div>

      {/* Room Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {museum.rooms.map((r, i) => (
          <button
            key={r.id}
            onClick={() => { setActiveRoom(i); setCurrentArtwork(0); setCurrentRoom(r.id); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeRoom === i
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
            }`}
          >
            🚪 {getRoomName(r)}
          </button>
        ))}
      </div>

      {/* Artwork Viewer */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Artwork Display */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-w-full max-h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-500"
                onClick={() => setSelectedArtwork(artwork)}
              />
              
              {/* Audio indicator */}
              {audioPlaying && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-green-400 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 16 + 4}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.5s'
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-green-400">Guida Audio</span>
                </div>
              )}

              {/* Navigation */}
              <button
                onClick={prevArtwork}
                disabled={currentArtwork === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={nextArtwork}
                disabled={currentArtwork === room.artworks.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
              >
                ›
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{artwork.title}</h2>
                  <p className="text-amber-400">{artwork.artist} • {artwork.year}</p>
                </div>
                <button
                  onClick={() => isFavorite(artwork.id) ? removeFavorite(artwork.id) : addFavorite(artwork)}
                  className={`p-3 rounded-xl transition-all ${
                    isFavorite(artwork.id)
                      ? 'bg-red-500/20 text-red-400 scale-110'
                      : 'bg-gray-700 text-gray-400 hover:text-red-400'
                  }`}
                >
                  {isFavorite(artwork.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p className="text-gray-300 mt-4 leading-relaxed">
                {getArtworkDescription(artwork)}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>❤️ {artwork.likes.toLocaleString()} {t.like}</span>
                <span>🚪 {artwork.room}</span>
              </div>
            </div>
          </div>

          {/* Artwork Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {room.artworks.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setCurrentArtwork(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  i === currentArtwork ? 'border-amber-500 scale-105' : 'border-gray-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Side Panel - Room Info & Actions */}
        <div className="space-y-4">
          {/* Share */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">🔗 {t.shareTour}</h3>
            <div className="flex gap-2">
              {['📱', '💬', '📧', '🔗'].map((icon, i) => (
                <button
                  key={i}
                  className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center"
                  onClick={() => alert(language === 'en' ? 'Tour link copied!' : 'Link del tour copiato!')}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Exhibition Info */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">📅 {t.nextExhibition}</h3>
            <p className="text-sm text-amber-400">{museum.nextExhibition}</p>
          </div>

          {/* Room Map Mini */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">🗺️ {t.map3d}</h3>
            <button
              onClick={() => setShowMap3D(true)}
              className="w-full py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors"
            >
              {language === 'en' ? 'Open 3D Map' : 'Apri Mappa 3D'}
            </button>
          </div>

          {/* All artworks in room */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">🖼️ {t.artworks} - {getRoomName(room)}</h3>
            <div className="space-y-2">
              {room.artworks.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setCurrentArtwork(i)}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex items-center gap-3 ${
                    i === currentArtwork ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-gray-700/50'
                  }`}
                >
                  <img src={a.imageUrl} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.artist}</p>
                  </div>
                  <span className="text-xs text-gray-500">❤️ {a.likes > 1000 ? `${(a.likes/1000).toFixed(0)}k` : a.likes}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
