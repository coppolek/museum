import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, museums } from '../data/museums';

export default function MuseumsPage() {
  const { language, setCurrentView, setCurrentMuseumId } = useApp();
  const t = translations[language] || translations['it'];
  const [search, setSearch] = useState('');

  const filtered = museums.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase()) ||
    m.country.toLowerCase().includes(search.toLowerCase())
  );

  const startTour = (museumId: string) => {
    setCurrentMuseumId(museumId);
    setCurrentView('tour');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🏛️</span> {t.museums}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchMuseums}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="absolute left-3 top-3.5 text-gray-500">🔍</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(museum => (
          <div
            key={museum.id}
            className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={museum.image}
                alt={museum.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                📍 {museum.city}, {museum.country}
              </div>
              <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                ⭐ {museum.rating}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-xl font-bold">{museum.name}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {language === 'en' ? museum.descriptionEn : museum.description}
              </p>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span>👥 {(museum.visitors / 1000000).toFixed(1)}M</span>
                <span>🖼️ {museum.rooms.reduce((acc, r) => acc + r.artworks.length, 0)} {t.artworks}</span>
                <span>🚪 {museum.rooms.length} {t.rooms}</span>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-amber-400 font-medium">📅 {t.nextExhibition}</p>
                <p className="text-sm text-gray-300 mt-1">{museum.nextExhibition}</p>
              </div>
              <button
                onClick={() => startTour(museum.id)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
              >
                🎨 {t.startTour}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
