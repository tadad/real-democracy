'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import HomePage from '@/components/HomePage';

export default function RootPage() {
  const [showSplash, setShowSplash] = useState(true);
  
  const handleEnterSite = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onEnter={handleEnterSite} />
      ) : (
        <HomePage />
      )}
    </>
  );
}
