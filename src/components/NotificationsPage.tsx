import { useApp } from '../context/AppContext';
import { translations } from '../data/museums';

export default function NotificationsPage() {
  const { language, notifications, markNotificationRead, unreadCount } = useApp();
  const t = translations[language] || translations['it'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exhibition': return '🎨';
      case 'tour': return '🎧';
      case 'social': return '👥';
      default: return '🔔';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exhibition': return 'border-amber-500/30 bg-amber-500/5';
      case 'tour': return 'border-green-500/30 bg-green-500/5';
      case 'social': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-gray-700 bg-gray-800/50';
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return language === 'en' ? 'just now' : 'adesso';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🔔</span> {t.notifications}
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </h1>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 mb-6">
        <h3 className="font-bold mb-3 flex items-center gap-2">⚙️ {t.notificationsSettings}</h3>
        <div className="space-y-3">
          {[
            { label: t.newExhibitions, enabled: true },
            { label: t.tourUpdates, enabled: true },
            { label: language === 'en' ? 'Social interactions' : 'Interazioni social', enabled: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{setting.label}</span>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                setting.enabled ? 'bg-amber-500' : 'bg-gray-700'
              }`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  setting.enabled ? 'translate-x-5' : 'translate-x-1'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => markNotificationRead(notification.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${
              notification.read
                ? 'border-gray-700/30 bg-gray-800/20 opacity-60'
                : getTypeColor(notification.type)
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getTypeIcon(notification.type)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{timeAgo(notification.date)}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
              </div>
              {!notification.read && (
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
