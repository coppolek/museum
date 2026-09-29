import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, museums } from '../data/museums';

export default function Map3D() {
  const { language, currentMuseumId, setShowMap3D, setCurrentRoom, setSelectedArtwork } = useApp();
  const t = translations[language] || translations['it'];
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const museum = museums.find(m => m.id === currentMuseumId) || museums[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(0, prev.x - dy * 0.5)),
      y: prev.y + dx * 0.5,
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const roomColors = ['#8B4513', '#2F4F4F', '#DAA520', '#4B0082', '#800020', '#C19A6B'];

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">🗺️ {t.map3d}</h2>
          <p className="text-sm text-gray-400">{language === 'en' ? museum.nameEn : museum.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
            className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700"
          >
            +
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
            className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700"
          >
            -
          </button>
          <button
            onClick={() => { setRotation({ x: -20, y: 30 }); setZoom(1); }}
            className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm hover:bg-gray-700"
          >
            {language === 'en' ? 'Reset' : 'Resetta'}
          </button>
          <button
            onClick={() => setShowMap3D(false)}
            className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 3D Map Area */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative transition-transform duration-100"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floor */}
          <div
            className="w-[500px] h-[400px] bg-gray-800 border-2 border-gray-600 rounded-lg relative"
            style={{
              transform: 'rotateX(90deg) translateZ(-50px)',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Rooms */}
          {museum.rooms.map((room, i) => {
            const positions = [
              { left: '20px', top: '20px', width: '200px', height: '160px' },
              { left: '260px', top: '20px', width: '200px', height: '160px' },
              { left: '20px', top: '220px', width: '200px', height: '140px' },
              { left: '260px', top: '220px', width: '200px', height: '140px' },
            ];
            const pos = positions[i % positions.length];
            const color = roomColors[i % roomColors.length];

            return (
              <div
                key={room.id}
                className="absolute cursor-pointer group"
                style={{
                  ...pos,
                  transform: 'translateZ(40px)',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  setCurrentRoom(room.id);
                  setShowMap3D(false);
                }}
              >
                {/* Room floor */}
                <div
                  className="w-full h-full rounded-lg border-2 transition-all group-hover:border-white group-hover:shadow-lg"
                  style={{
                    backgroundColor: `${color}40`,
                    borderColor: `${color}80`,
                    boxShadow: `0 0 20px ${color}30`,
                  }}
                >
                  <div className="p-3 h-full flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{language === 'en' ? room.nameEn : room.name}</p>
                      <p className="text-xs text-gray-300 mt-1">{room.artworks.length} {t.artworks}</p>
                    </div>
                    <div className="flex gap-1">
                      {room.artworks.map(a => (
                        <div key={a.id} className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs">
                          🖼️
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Room walls (3D effect) */}
                <div
                  className="absolute top-0 left-0 w-full rounded-t-lg border-t-2 border-l-2"
                  style={{
                    height: '40px',
                    backgroundColor: `${color}60`,
                    borderColor: `${color}90`,
                    transform: 'rotateX(-90deg) translateZ(0px)',
                    transformOrigin: 'top',
                  }}
                ></div>
              </div>
            );
          })}

          {/* Entrance marker */}
          <div
            className="absolute w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center"
            style={{
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%) translateZ(20px)',
            }}
          >
            <span className="text-2xl">🚪</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {museum.rooms.map((room, i) => (
            <div key={room.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: roomColors[i % roomColors.length] }}
              ></div>
              <span className="text-sm text-gray-400">{language === 'en' ? room.nameEn : room.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500/50 border border-green-500"></div>
            <span className="text-sm text-gray-400">{language === 'en' ? 'Entrance' : 'Ingresso'}</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          {language === 'en' ? 'Drag to rotate • Click rooms to explore' : 'Trascina per ruotare • Clicca sulle sale per esplorare'}
        </p>
      </div>
    </div>
  );
}
