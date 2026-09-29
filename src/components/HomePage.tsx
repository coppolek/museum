import { useApp } from '../context/AppContext';
import { translations, museums } from '../data/museums';

export default function HomePage() {
  const { language, setCurrentView, setCurrentMuseumId } = useApp();
  const t = translations[language] || translations['it'];

  const startTour = (museumId: string) => {
    setCurrentMuseumId(museumId);
    setCurrentView('tour');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900 to-amber-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.welcome}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentView('museums')}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-500/25"
              >
                🎨 {t.explore}
              </button>
              <button
                onClick={() => startTour('louvre')}
                className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors"
              >
                🎧 {t.virtualTour}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { icon: '🏛️', value: '5', label: language === 'en' ? 'Museums' : 'Musei' },
              { icon: '🖼️', value: '20+', label: language === 'en' ? 'Artworks' : 'Opere' },
              { icon: '🌍', value: '5', label: language === 'en' ? 'Languages' : 'Lingue' },
              { icon: '👥', value: '30M+', label: language === 'en' ? 'Visitors' : 'Visitatori' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Museums */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          {language === 'en' ? 'Featured Museums' : 'Musei in Evidenza'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {museums.slice(0, 3).map(museum => (
            <div
              key={museum.id}
              className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
              onClick={() => startTour(museum.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={museum.image}
                  alt={museum.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold">{museum.name}</h3>
                  <p className="text-sm text-gray-300">{museum.city}, {museum.country}</p>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  ⭐ {museum.rating}
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm line-clamp-2">
                  {language === 'en' ? museum.descriptionEn : museum.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">
                    {(museum.visitors / 1000000).toFixed(1)}M {t.visitors}
                  </span>
                  <span className="text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {t.startTour} →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Immersive Experience' : 'Esperienza Immersiva'}
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🗺️', title: language === 'en' ? '3D Maps' : 'Mappe 3D', desc: language === 'en' ? 'Explore museums in augmented reality' : 'Esplora i musei in realtà aumentata' },
            { icon: '🎧', title: language === 'en' ? 'Audio Guides' : 'Guide Audio', desc: language === 'en' ? 'Professional guides in 5 languages' : 'Guide professionali in 5 lingue' },
            { icon: '💬', title: language === 'en' ? 'Live Chat' : 'Chat dal Vivo', desc: language === 'en' ? 'Interact with visitors in real time' : 'Interagisci con i visitatori in tempo reale' },
            { icon: '🔔', title: language === 'en' ? 'Smart Notifications' : 'Notifiche Smart', desc: language === 'en' ? 'Never miss a new exhibition' : 'Non perdere mai una nuova mostra' },
            { icon: '❤️', title: language === 'en' ? 'Personal Gallery' : 'Galleria Personale', desc: language === 'en' ? 'Save your favorite artworks' : 'Salva le tue opere preferite' },
            { icon: '📊', title: language === 'en' ? 'Data Analytics' : 'Analisi Dati', desc: language === 'en' ? 'Discover the most loved artworks' : 'Scopri le opere più amate' },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
