import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artwork } from '../data/museums';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  avatar: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'exhibition' | 'tour' | 'social';
}

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  favorites: Artwork[];
  addFavorite: (artwork: Artwork) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  chatMessages: ChatMessage[];
  addChatMessage: (text: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  onlineUsers: number;
  currentView: string;
  setCurrentView: (view: string) => void;
  currentMuseumId: string | null;
  setCurrentMuseumId: (id: string | null) => void;
  selectedArtwork: Artwork | null;
  setSelectedArtwork: (artwork: Artwork | null) => void;
  showMap3D: boolean;
  setShowMap3D: (show: boolean) => void;
  audioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const demoUsers = ['Marco R.', 'Sofia L.', 'James K.', 'Yuki T.', 'Pierre D.', 'Ana M.', 'Hans W.', 'Maria C.'];
const demoAvatars = ['🧑‍🎨', '👩‍🎨', '🧑‍💻', '👩‍🏫', '🧔', '👩‍🦰', '👨‍🦱', '👩‍🦳'];

const demoMessages: ChatMessage[] = [
  { id: '1', user: 'Marco R.', text: 'La Gioconda è ancora più bella dal vivo!', timestamp: new Date(Date.now() - 300000), avatar: '🧑‍🎨' },
  { id: '2', user: 'Sofia L.', text: 'Sto esplorando la Sala del Rinascimento, incredibile!', timestamp: new Date(Date.now() - 240000), avatar: '👩‍🎨' },
  { id: '3', user: 'James K.', text: 'Has anyone seen the new exhibition?', timestamp: new Date(Date.now() - 180000), avatar: '🧑‍💻' },
  { id: '4', user: 'Yuki T.', text: 'La Nascita di Venere è il mio capolavoro preferito 🎨', timestamp: new Date(Date.now() - 120000), avatar: '👩‍🏫' },
];

const demoNotifications: Notification[] = [
  { id: '1', title: 'Nuova Mostra al Louvre', message: 'Vermeer e i Maestri del Secolo d\'Oro - Marzo 2026', date: new Date(Date.now() - 3600000), read: false, type: 'exhibition' },
  { id: '2', title: 'Tour in diretta', message: 'Marco R. sta visitando gli Uffizi ora', date: new Date(Date.now() - 7200000), read: false, type: 'tour' },
  { id: '3', title: 'Nuova opera disponibile', message: 'Las Meninas di Velázquez è ora in tour virtuale', date: new Date(Date.now() - 86400000), read: true, type: 'social' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('arttour-lang') || 'it');
  const [favorites, setFavorites] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('arttour-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(demoMessages);
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * 50) + 120);
  const [currentView, setCurrentView] = useState('home');
  const [currentMuseumId, setCurrentMuseumId] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showMap3D, setShowMap3D] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');

  useEffect(() => {
    localStorage.setItem('arttour-lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('arttour-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
      const randomAvatar = demoAvatars[Math.floor(Math.random() * demoAvatars.length)];
      const messages = [
        'Bellissima opera!',
        'Sto adorando questo tour!',
        'Avete visto la nuova sala?',
        'Consiglio di visitare anche la Sala 12',
        'Che capolavoro incredibile!',
        'La guida audio è fantastica',
        'Amazing collection here!',
        'Questo museo è meraviglioso',
      ];
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: randomUser,
        text: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        avatar: randomAvatar,
      };
      setChatMessages(prev => [...prev.slice(-20), newMsg]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const addFavorite = (artwork: Artwork) => {
    setFavorites(prev => [...prev, artwork]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(a => a.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(a => a.id === id);
  };

  const addChatMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'Tu',
      text,
      timestamp: new Date(),
      avatar: '😊',
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      favorites, addFavorite, removeFavorite, isFavorite,
      chatMessages, addChatMessage,
      notifications, markNotificationRead, unreadCount,
      onlineUsers,
      currentView, setCurrentView,
      currentMuseumId, setCurrentMuseumId,
      selectedArtwork, setSelectedArtwork,
      showMap3D, setShowMap3D,
      audioPlaying, setAudioPlaying,
      currentRoom, setCurrentRoom,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
