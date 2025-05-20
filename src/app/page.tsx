"use client";
import React, { useEffect, useState } from "react";

interface Coin {
  id: number;
  x: number;
  y: number;
}

const CoinGame: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [nextId, setNextId] = useState(0);

  const spawnCoin = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 80; // reduce to avoid top HUD area
    const newCoin: Coin = { id: nextId, x, y };
    setCoins((prev) => [...prev, newCoin]);
    setNextId((id) => id + 1);
  };

  const collectCoin = (id: number) => {
    setCoins((prev) => prev.filter((coin) => coin.id !== id));
    setScore((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(spawnCoin, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 overflow-hidden">
      <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-yellow-900 drop-shadow-lg animate-bounce">
        💰 Coins: {score}
      </h1>

      {coins.map((coin) => (
        <div
          key={coin.id}
          onClick={() => collectCoin(coin.id)}
          className="absolute w-12 h-12 rounded-full bg-yellow-400 shadow-xl border-2 border-yellow-300 animate-fade-in hover:scale-125 hover:animate-bounce transition-transform cursor-pointer"
          style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
        >
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-yellow-700">
            🪙
          </div>
        </div>
      ))}

      {/* Extra Tailwind styles for animation */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CoinGame;
