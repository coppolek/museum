import { useApp } from '../context/AppContext';
import { translations } from '../data/museums';

export default function FavoritesPage() {
  const { language, favorites, removeFavorite, setSelectedArtwork } = useApp();
  const t = translations[language] || translations['it'];

  const getArtworkDescription = (artwork: any) => {
    switch (language) {
      case 'en': return artwork.descriptionEn;
      case 'es': return artwork.descriptionEs;
      case 'fr': return artwork.descriptionFr;
      case 'de': return artwork.descriptionDe;
      default: return artwork.description;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
        <span>❤️</span> {t.myGallery}
      </h1>
      <p className="text-gray-400 mb-8">
        {favorites.length} {language === 'en' ? 'artworks saved' : 'opere salvate'}
      </p>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-xl text-gray-400 mb-2">{t.noFavorites}</p>
          <p className="text-gray-500">
            {language === 'en'
              ? 'Start exploring museums and save your favorite artworks!'
              : 'Inizia a esplorare i musei e salva le tue opere preferite!'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(artwork => (
            <div
              key={artwork.id}
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all group"
            >
              <div
                className="relative aspect-[4/3] bg-black cursor-pointer overflow-hidden"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFavorite(artwork.id); }}
                  className="absolute top-3 right-3 w-10 h-10 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{artwork.title}</h3>
                <p className="text-amber-400 text-sm">{artwork.artist}</p>
                <p className="text-gray-500 text-xs mt-1">{artwork.year} • {artwork.room}</p>
                <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                  {getArtworkDescription(artwork)}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">❤️ {artwork.likes.toLocaleString()}</span>
                  <button
                    onClick={() => setSelectedArtwork(artwork)}
                    className="text-sm text-amber-400 hover:text-amber-300"
                  >
                    {language === 'en' ? 'View details' : 'Vedi dettagli'} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
