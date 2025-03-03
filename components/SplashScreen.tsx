'use client';

import { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  // Track if we're in major glitch mode
  const [majorGlitchActive, setMajorGlitchActive] = useState(false);
  const originalAsciiArt = `+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+
+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+!+0xgov+`;

  const [asciiArt, setAsciiArt] = useState(originalAsciiArt);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>/?~░▒▓█▄▀■□▪▫●○◆◇▲▼';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalCharsRef = useRef<string[]>([]);

  useEffect(() => {
    // Store the original characters for reference
    originalCharsRef.current = originalAsciiArt.split('');
    
    // Initialize the glitch effect
    startGlitchEffect();

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startGlitchEffect = () => {
    // Main interval for the glitch effect
    intervalRef.current = setInterval(() => {
      // Only run a glitch if random chance is met (to make it seem more random)
      if (Math.random() < 0.7) {
        glitchText();
      }
    }, 150);
  };

  const glitchText = () => {
    // Create a copy of the original characters
    const chars = [...originalCharsRef.current];
    
    // Determine how many characters to glitch (5-15)
    const glitchCount = Math.floor(Math.random() * 15) + 5;
    
    // Glitch random characters
    for (let i = 0; i < glitchCount; i++) {
      // Pick a random index
      const index = Math.floor(Math.random() * chars.length);
      
      // Don't glitch newlines
      if (chars[index] !== '\n') {
        // Replace with a random glitch character
        chars[index] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
    }
    
    // Update the state with glitched text
    setAsciiArt(chars.join(''));
    
    // Reset back to original after a short delay (creates the flicker effect)
    setTimeout(() => {
      setAsciiArt(originalAsciiArt);
    }, 50 + Math.random() * 100); // Random duration between 50-150ms
  };

  // Glitch effect for the CTA text
  const [ctaText, setCtaText] = useState("CLICK TO ENTER");
  const originalCtaText = "CLICK TO ENTER";
  
  // Function to glitch the CTA text
  const glitchCtaText = () => {
    // Randomly decide if we should glitch the CTA text (less frequently than the ASCII art)
    if (Math.random() < 0.3) {
      const chars = originalCtaText.split('');
      // Choose 1-3 characters to glitch
      const glitchCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < glitchCount; i++) {
        const index = Math.floor(Math.random() * chars.length);
        chars[index] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      
      setCtaText(chars.join(''));
      
      // Reset back to original after a short delay
      setTimeout(() => {
        setCtaText(originalCtaText);
      }, 50 + Math.random() * 80);
    }
  };
  
  // Add major glitch effect that happens occasionally
  const triggerMajorGlitch = () => {
    // Only trigger a major glitch occasionally (10% chance)
    if (Math.random() < 0.1) {
      setMajorGlitchActive(true);
      
      // Glitch multiple characters very rapidly
      const intensiveGlitchCount = Math.floor(Math.random() * 30) + 20;
      const chars = [...originalCharsRef.current];
      
      for (let i = 0; i < intensiveGlitchCount; i++) {
        const index = Math.floor(Math.random() * chars.length);
        if (chars[index] !== '\n') {
          chars[index] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      
      setAsciiArt(chars.join(''));
      
      // Turn off the major glitch after a short time
      setTimeout(() => {
        setMajorGlitchActive(false);
        setAsciiArt(originalAsciiArt);
      }, 300 + Math.random() * 200);
    }
  };

  // Add CTA glitch to the main glitch function
  useEffect(() => {
    const ctaInterval = setInterval(glitchCtaText, 500);
    const majorGlitchInterval = setInterval(triggerMajorGlitch, 2000);
    
    return () => {
      clearInterval(ctaInterval);
      clearInterval(majorGlitchInterval);
    };
  }, []);

  return (
    <div 
      className={`splash-container ${majorGlitchActive ? 'glitch-effect' : ''}`}
      onClick={onEnter}
    >
      <div className="splash-content">
        <pre className="splash-ascii-art" data-text={asciiArt}>
          {asciiArt}
        </pre>
        <div className="splash-cta">
          <div 
            className={`splash-button ${majorGlitchActive ? 'glitch-effect' : ''}`}
            data-text={ctaText}
          >
            {ctaText}
          </div>
        </div>
      </div>
    </div>
  );
}