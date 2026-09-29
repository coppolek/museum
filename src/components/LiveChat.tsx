import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/museums';

export default function LiveChat() {
  const { language, chatMessages, addChatMessage } = useApp();
  const t = translations[language] || translations['it'];
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (message.trim()) {
      addChatMessage(message.trim());
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all hover:scale-110 ${
          isOpen
            ? 'bg-red-500 shadow-red-500/30'
            : 'bg-gradient-to-r from-amber-500 to-purple-600 shadow-amber-500/30'
        }`}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <h3 className="font-bold">{t.liveChat}</h3>
              </div>
              <span className="text-xs text-gray-500">
                {chatMessages.length} {language === 'en' ? 'messages' : 'messaggi'}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.user === 'Tu' ? 'flex-row-reverse' : ''}`}
              >
                <span className="text-xl flex-shrink-0">{msg.avatar}</span>
                <div className={`max-w-[75%] ${msg.user === 'Tu' ? 'items-end' : ''}`}>
                  <div className={`flex items-center gap-2 mb-0.5 ${msg.user === 'Tu' ? 'justify-end' : ''}`}>
                    <span className="text-xs font-medium text-gray-400">{msg.user}</span>
                    <span className="text-xs text-gray-600">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className={`rounded-xl px-3 py-2 text-sm ${
                    msg.user === 'Tu'
                      ? 'bg-amber-500/20 text-amber-100 rounded-tr-none'
                      : 'bg-gray-800 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.comment}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center hover:bg-amber-400 transition-colors"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
