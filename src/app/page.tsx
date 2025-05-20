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
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);

  // Load saved progress
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedCPS = localStorage.getItem("coinsPerSecond");
    const savedNextId = localStorage.getItem("nextId");

    if (savedScore !== null) setScore(Number(savedScore));
    if (savedCPS !== null) setCoinsPerSecond(Number(savedCPS));
    if (savedNextId !== null) setNextId(Number(savedNextId));
  }, []);

  // Save progress when score, cps, or nextId changes
  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem("coinsPerSecond", coinsPerSecond.toString());
  }, [coinsPerSecond]);

  useEffect(() => {
    localStorage.setItem("nextId", nextId.toString());
  }, [nextId]);

  const spawnCoin = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 80;
    const newCoin: Coin = { id: nextId, x, y };
    setCoins((prev) => [...prev, newCoin]);
    setNextId((id) => id + 1);
  };

  const collectCoin = (id: number) => {
    setCoins((prev) => prev.filter((coin) => coin.id !== id));
    setScore((prev) => prev + 1);
  };

  // Passive income
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + coinsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond]);

  // Coin spawning
  useEffect(() => {
    const interval = setInterval(spawnCoin, 1500);
    return () => clearInterval(interval);
  }, []);

  const buyUpgrade = () => {
    if (score >= 80) {
      setScore((prev) => prev - 80);
      setCoinsPerSecond((prev) => prev + 10);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 overflow-hidden">
      <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-yellow-900 drop-shadow-lg animate-bounce">
        💰 Coins: {score}
      </h1>

      <button
        onClick={buyUpgrade}
        className={`absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-yellow-900 font-bold px-6 py-2 rounded-xl shadow-md transition-transform hover:scale-105 ${
          score < 80 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
        }`}
        disabled={score < 80}
      >
        Buy +10 Coins/sec (Cost: 80)
      </button>

      <p className="absolute top-32 left-1/2 transform -translate-x-1/2 text-lg font-semibold text-yellow-800">
        🔄 Coins/sec: {coinsPerSecond}
      </p>

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
