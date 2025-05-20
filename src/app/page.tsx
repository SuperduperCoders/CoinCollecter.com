'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [hasPurchased2x, setHasPurchased2x] = useState(false);
  const [hasPurchased5x, setHasPurchased5x] = useState(false);
  const [hasPurchased10x, setHasPurchased10x] = useState(false);
  const [hasPurchased20x, setHasPurchased20x] = useState(false);
  const [hasAutoClicker, setHasAutoClicker] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [clickAnimating, setClickAnimating] = useState(false);
  const [purchasedUpgrade, setPurchasedUpgrade] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('clicker-data');
    if (saved) {
      const data = JSON.parse(saved);
      setCount(data.count || 0);
      setMultiplier(data.multiplier || 1);
      setHasPurchased2x(data.hasPurchased2x || false);
      setHasPurchased5x(data.hasPurchased5x || false);
      setHasPurchased10x(data.hasPurchased10x || false);
      setHasPurchased20x(data.hasPurchased20x || false);
      setHasAutoClicker(data.hasAutoClicker || false);
    } else {
      setShowTutorial(true);
    }
  }, []);

  useEffect(() => {
    const saveData = {
      count,
      multiplier,
      hasPurchased2x,
      hasPurchased5x,
      hasPurchased10x,
      hasPurchased20x,
      hasAutoClicker,
    };
    localStorage.setItem('clicker-data', JSON.stringify(saveData));
  }, [count, multiplier, hasPurchased2x, hasPurchased5x, hasPurchased10x, hasPurchased20x, hasAutoClicker]);

  useEffect(() => {
    if (hasAutoClicker) {
      const interval = setInterval(() => {
        setCount((prev) => prev + 10);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasAutoClicker]);

  const handleClick = () => {
    setCount(count + multiplier);
    setClickAnimating(true);
    setTimeout(() => setClickAnimating(false), 200);
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
    } else {
      localStorage.removeItem('clicker-data');
      window.location.reload();
    }
  };

  const triggerUpgradeAnimation = (name: string) => {
    setPurchasedUpgrade(name);
    setTimeout(() => setPurchasedUpgrade(''), 500);
  };

  const purchase2x = () => {
    if (count >= 300 && !hasPurchased2x) {
      setCount(count - 300);
      setMultiplier(2);
      setHasPurchased2x(true);
      triggerUpgradeAnimation('2x');
    }
  };

  const purchase5x = () => {
    if (count >= 1000 && !hasPurchased5x) {
      setCount(count - 1000);
      setMultiplier(5);
      setHasPurchased5x(true);
      triggerUpgradeAnimation('5x');
    }
  };

  const purchase10x = () => {
    if (count >= 5000 && !hasPurchased10x) {
      setCount(count - 5000);
      setMultiplier(10);
      setHasPurchased10x(true);
      triggerUpgradeAnimation('10x');
    }
  };

  const purchase20x = () => {
    if (count >= 10000 && !hasPurchased20x) {
      setCount(count - 10000);
      setMultiplier(20);
      setHasPurchased20x(true);
      triggerUpgradeAnimation('20x');
    }
  };

  const purchaseAutoClicker = () => {
    if (count >= 50 && !hasAutoClicker) {
      setCount(count - 50);
      setHasAutoClicker(true);
      triggerUpgradeAnimation('AutoClicker');
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50 text-center p-4 relative overflow-hidden">
      {/* Restart Button */}
      <button
        onClick={handleReset}
        className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        {confirmReset ? 'Are you sure? Click again!' : 'Restart'}
      </button>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 p-8 rounded-xl shadow-xl max-w-md text-center">
            <h2 className="text-3xl font-bold text-white mb-4 animate__animated animate__fadeIn">Welcome to Clicker Game!</h2>
            <p className="text-lg text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
              Click the button to earn clicks and purchase upgrades to click even faster! 
              Each upgrade will multiply your clicks, so try to upgrade and maximize your score!
            </p>
            <div className="flex justify-center gap-6 animate__animated animate__fadeIn animate__delay-2s">
              <div>
                <h3 className="text-xl font-bold text-white">Step 1:</h3>
                <p className="text-white">Click the big blue button to earn clicks.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Step 2:</h3>
                <p className="text-white">Use your clicks to purchase upgrades and multiply your clicks!</p>
              </div>
            </div>
            <button
              onClick={closeTutorial}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-bold mt-6 hover:bg-gray-200 transition-all duration-300"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Rest of the game UI... */}
    </main>
  );
}
