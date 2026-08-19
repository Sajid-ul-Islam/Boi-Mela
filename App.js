import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppContent from './src/App';
import './src/index.css';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
