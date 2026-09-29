import { useApp } from '../context/AppContext';
import { translations } from '../data/museums';

export default function Header() {
  const { currentView, setCurrentView, language, setLanguage, unreadCount, onlineUsers } = useApp();
  const t = translations[language] || translations['it'];

  const languages = [
    { code: 'it', flag: '🇮🇹', name: 'Italiano' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-xl">
            🏛️
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              ArtTour
            </h1>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {onlineUsers} {t.onlineVisitors}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: 'home', label: t.home, icon: '🏠' },
            { id: 'museums', label: t.museums, icon: '🏛️' },
            { id: 'favorites', label: t.favorites, icon: '❤️' },
            { id: 'analytics', label: t.analytics, icon: '📊' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
            ))}
          </select>

          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center justify-around px-2 pb-2">
        {[
          { id: 'home', icon: '🏠' },
          { id: 'museums', icon: '🏛️' },
          { id: 'favorites', icon: '❤️' },
          { id: 'analytics', icon: '📊' },
          { id: 'notifications', icon: '🔔' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`p-2 rounded-lg text-xl transition-all ${
              currentView === item.id ? 'bg-amber-500/20 scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </header>
  );
}
