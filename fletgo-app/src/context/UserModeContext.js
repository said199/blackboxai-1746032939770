import React, { createContext, useState, useContext } from 'react';

const UserModeContext = createContext();

export function UserModeProvider({ children }) {
  const [isDriverMode, setIsDriverMode] = useState(false);

  const toggleDriverMode = () => {
    setIsDriverMode(prev => !prev);
  };

  return (
    <UserModeContext.Provider value={{ isDriverMode, toggleDriverMode }}>
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (!context) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
}
