import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppContent from './src/App';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
