import { useApp } from '../context/AppContext';
import { translations, museums } from '../data/museums';

export default function AnalyticsPage() {
  const { language } = useApp();
  const t = translations[language] || translations['it'];

  const allArtworks = museums.flatMap(m => m.rooms.flatMap(r => r.artworks));
  const sortedByLikes = [...allArtworks].sort((a, b) => b.likes - a.likes);
  const topArtworks = sortedByLikes.slice(0, 10);
  const maxLikes = topArtworks[0]?.likes || 1;

  const totalVisitors = museums.reduce((acc, m) => acc + m.visitors, 0);
  const totalArtworks = allArtworks.length;
  const avgRating = (museums.reduce((acc, m) => acc + m.rating, 0) / museums.length).toFixed(1);

  const museumStats = museums.map(m => ({
    ...m,
    totalLikes: m.rooms.flatMap(r => r.artworks).reduce((acc, a) => acc + a.likes, 0),
    artworkCount: m.rooms.flatMap(r => r.artworks).length,
  })).sort((a, b) => b.totalLikes - a.totalLikes);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span>📊</span> {t.analytics}
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: '👥', value: `${(totalVisitors / 1000000).toFixed(0)}M+`, label: t.totalVisits, color: 'from-blue-500 to-cyan-500' },
          { icon: '🖼️', value: totalArtworks.toString(), label: t.artworks, color: 'from-purple-500 to-pink-500' },
          { icon: '🏛️', value: museums.length.toString(), label: t.museums, color: 'from-amber-500 to-orange-500' },
          { icon: '⭐', value: avgRating, label: language === 'en' ? 'Avg Rating' : 'Valutazione Media', color: 'from-green-500 to-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Artworks Chart */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            🏆 {t.topArtworks}
          </h2>
          <div className="space-y-3">
            {topArtworks.map((artwork, i) => (
              <div key={artwork.id} className="flex items-center gap-3">
                <span className={`w-6 text-sm font-bold ${i < 3 ? 'text-amber-400' : 'text-gray-500'}`}>
                  #{i + 1}
                </span>
                <img src={artwork.imageUrl} alt={artwork.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{artwork.title}</p>
                  <p className="text-xs text-gray-500">{artwork.artist}</p>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(artwork.likes / maxLikes) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    ❤️ {(artwork.likes / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Museum Rankings */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            🏛️ {language === 'en' ? 'Museum Rankings' : 'Classifica Musei'}
          </h2>
          <div className="space-y-4">
            {museumStats.map((museum, i) => (
              <div key={museum.id} className="bg-gray-900/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-lg font-bold ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-300' : 'text-amber-700'}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <img src={museum.image} alt={museum.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-bold">{museum.name}</p>
                    <p className="text-xs text-gray-500">{museum.city}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <p className="text-amber-400 font-bold">{(museum.totalLikes / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-gray-500">{t.like}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2">
                    <p className="text-purple-400 font-bold">{museum.artworkCount}</p>
                    <p className="text-xs text-gray-500">{t.artworks}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2">
                    <p className="text-blue-400 font-bold">{(museum.visitors / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-500">{t.visitors}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="mt-6 bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          📈 {language === 'en' ? 'Engagement Metrics' : 'Metriche di Coinvolgimento'}
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: language === 'en' ? 'Avg. Time per Tour' : 'Tempo Medio per Tour', value: '23 min', trend: '+12%', icon: '⏱️' },
            { label: language === 'en' ? 'Favorites per User' : 'Preferiti per Utente', value: '4.2', trend: '+8%', icon: '❤️' },
            { label: language === 'en' ? 'Shares per Day' : 'Condivisioni al Giorno', value: '1,247', trend: '+23%', icon: '🔗' },
            { label: language === 'en' ? 'Chat Messages/Hour' : 'Messaggi Chat/Ora', value: '89', trend: '+15%', icon: '💬' },
          ].map((metric, i) => (
            <div key={i} className="bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{metric.icon}</div>
              <p className="text-xl font-bold text-white">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
              <p className="text-xs text-green-400 mt-1">↑ {metric.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
