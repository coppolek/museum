import { useApp } from '../context/AppContext';
import { translations } from '../data/museums';

export default function ArtworkModal() {
  const { language, selectedArtwork, setSelectedArtwork, isFavorite, addFavorite, removeFavorite } = useApp();
  const t = translations[language] || translations['it'];

  if (!selectedArtwork) return null;

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
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setSelectedArtwork(null)}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <div className="aspect-[16/9] bg-black flex items-center justify-center overflow-hidden rounded-t-2xl">
            <img
              src={selectedArtwork.imageUrl}
              alt={selectedArtwork.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            onClick={() => setSelectedArtwork(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{selectedArtwork.title}</h2>
              <p className="text-amber-400 text-lg mt-1">{selectedArtwork.artist}</p>
            </div>
            <button
              onClick={() => isFavorite(selectedArtwork.id) ? removeFavorite(selectedArtwork.id) : addFavorite(selectedArtwork)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all ${
                isFavorite(selectedArtwork.id)
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-red-400'
              }`}
            >
              {isFavorite(selectedArtwork.id) ? '❤️ ' + t.removeFavorite : '🤍 ' + t.addFavorite}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase">{t.year}</p>
              <p className="text-lg font-bold mt-1">{selectedArtwork.year}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase">{t.artist}</p>
              <p className="text-lg font-bold mt-1">{selectedArtwork.artist}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase">{t.room}</p>
              <p className="text-lg font-bold mt-1">{selectedArtwork.room}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">{language === 'en' ? 'Description' : 'Descrizione'}</h3>
            <p className="text-gray-300 leading-relaxed">
              {getArtworkDescription(selectedArtwork)}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-800">
            <span className="text-gray-400">❤️ {selectedArtwork.likes.toLocaleString()} {t.like}</span>
            <button
              onClick={() => alert(language === 'en' ? 'Link copied!' : 'Link copiato!')}
              className="ml-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              🔗 {t.share}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
