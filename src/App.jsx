import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Div, MainEl } from './html';
import { Header } from './components/Header';
import { SplashScreen } from './components/SplashScreen';
import { VisitorView } from './components/VisitorView';
import { StaffPortal } from './components/StaffPortal';
import { BookDetailModal } from './components/BookDetailModal';
import { StallDetailModal } from './components/StallDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { NotificationDrawer } from './components/NotificationDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function AppContent() {
  const { 
    userRole, setUserRole,
    currentView, setCurrentView,
    selectedBook, setSelectedBook,
    selectedStall, setSelectedStall,
    isMapOpen, setIsMapOpen,
    isNotificationDrawerOpen, setIsNotificationDrawerOpen,
    darkMode
  } = useApp();

  const [showHeroBanner, setShowHeroBanner] = useState(true);

  return (
    <Div className={`app-container ${darkMode ? '' : 'light-theme'}`}>
      
      {/* Header Bar */}
      <Header />

      {/* Main Container */}
      <MainEl className="main-content">
        
        {/* Hero Splash Banner */}
        {showHeroBanner && (
          <SplashScreen 
            onEnterVisitor={() => {
              setUserRole('visitor');
              setCurrentView('home');
              setShowHeroBanner(false);
            }}
            onEnterStaff={() => {
              setUserRole('staff');
              setCurrentView('staff');
              setShowHeroBanner(false);
            }}
          />
        )}

        {/* View Switcher */}
        {userRole === 'staff' ? (
          <StaffPortal />
        ) : (
          <VisitorView />
        )}

      </MainEl>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      {selectedBook && (
        <BookDetailModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}

      {selectedStall && (
        <StallDetailModal 
          stall={selectedStall} 
          onClose={() => setSelectedStall(null)} 
        />
      )}

      {isMapOpen && (
        <InteractiveMap 
          onClose={() => setIsMapOpen(false)} 
        />
      )}

      {isNotificationDrawerOpen && (
        <NotificationDrawer 
          onClose={() => setIsNotificationDrawerOpen(false)} 
        />
      )}

      {/* Global Toast Container */}
      <Toast />

    </Div>
  );
}

export default AppContent;
