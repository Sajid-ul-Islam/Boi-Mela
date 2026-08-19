import React from 'react';
import { useApp } from '../context/AppContext';
import { BellRing, BookOpen, Button, Div, Heart, Map, Span, Store, Users } from '../html';

export const BottomNav = () => {
  const {
    lang,
    userRole,
    setUserRole,
    currentView,
    setCurrentView,
    activeTab,
    setActiveTab,
    isMapOpen,
    setIsMapOpen,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    wishlist,
    announcements,
    darkMode
  } = useApp();

  const handleNavClick = (target) => {
    if (target === 'books') {
      setUserRole('visitor');
      setCurrentView('home');
      setActiveTab('books');
      setIsMapOpen(false);
      setIsNotificationDrawerOpen(false);
    } else if (target === 'stalls') {
      setUserRole('visitor');
      setCurrentView('home');
      setActiveTab('stalls');
      setIsMapOpen(false);
      setIsNotificationDrawerOpen(false);
    } else if (target === 'map') {
      setIsMapOpen(true);
      setIsNotificationDrawerOpen(false);
    } else if (target === 'wishlist') {
      setUserRole('visitor');
      setCurrentView('home');
      setActiveTab('wishlist');
      setIsMapOpen(false);
      setIsNotificationDrawerOpen(false);
    } else if (target === 'notifications') {
      setIsNotificationDrawerOpen(true);
      setIsMapOpen(false);
    } else if (target === 'staff') {
      if (userRole === 'staff') {
        setUserRole('visitor');
        setCurrentView('home');
      } else {
        setUserRole('staff');
        setCurrentView('staff');
      }
      setIsMapOpen(false);
      setIsNotificationDrawerOpen(false);
    }
  };

  const navItems = [
    {
      id: 'books',
      label: lang === 'bn' ? 'বই' : 'Books',
      icon: BookOpen,
      isActive: userRole === 'visitor' && currentView === 'home' && activeTab === 'books' && !isMapOpen && !isNotificationDrawerOpen,
      badge: null
    },
    {
      id: 'stalls',
      label: lang === 'bn' ? 'স্টল' : 'Stalls',
      icon: Store,
      isActive: userRole === 'visitor' && currentView === 'home' && activeTab === 'stalls' && !isMapOpen && !isNotificationDrawerOpen,
      badge: null
    },
    {
      id: 'map',
      label: lang === 'bn' ? 'ম্যাপ' : 'Map',
      icon: Map,
      isActive: isMapOpen,
      badge: null
    },
    {
      id: 'wishlist',
      label: lang === 'bn' ? 'পছন্দ' : 'Wishlist',
      icon: Heart,
      isActive: userRole === 'visitor' && currentView === 'home' && activeTab === 'wishlist' && !isMapOpen && !isNotificationDrawerOpen,
      badge: wishlist.length > 0 ? wishlist.length : null
    },
    {
      id: 'notifications',
      label: lang === 'bn' ? 'নোটিশ' : 'Alerts',
      icon: BellRing,
      isActive: isNotificationDrawerOpen,
      badge: announcements.length > 0 ? announcements.length : null
    }
  ];

  return (
    <Div className="bottom-navbar" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 950,
      background: 'var(--bg-secondary)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-color)',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
      paddingTop: '6px',
      paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
      paddingLeft: '12px',
      paddingRight: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const active = item.isActive;

        return (
          <Button
            key={item.id}
            onPress={() => handleNavClick(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              position: 'relative',
              flex: 1,
              maxWidth: '72px',
              transition: 'transform 0.15s ease'
            }}
          >
            {/* Active Pill Glow */}
            {active && (
              <Div style={{
                position: 'absolute',
                top: 0,
                left: '15%',
                right: '15%',
                height: '3px',
                borderRadius: '99px',
                background: 'var(--primary-red)',
                boxShadow: '0 0 10px var(--primary-red)'
              }} />
            )}

            {/* Icon & Badge wrapper */}
            <Div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent
                size={21}
                color={active ? 'var(--primary-red)' : 'var(--text-muted)'}
                strokeWidth={active ? 2.5 : 2}
              />

              {item.badge !== null && (
                <Span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-10px',
                  background: item.id === 'wishlist' ? '#d92638' : '#f59e0b',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  minWidth: '17px',
                  height: '17px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  lineHeight: 1
                }}>
                  {item.badge}
                </Span>
              )}
            </Div>

            {/* Text Label */}
            <Span style={{
              fontSize: '0.72rem',
              fontWeight: active ? 700 : 500,
              color: active ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'color 0.2s ease',
              marginTop: '1px'
            }}>
              {item.label}
            </Span>
          </Button>
        );
      })}
    </Div>
  );
};
