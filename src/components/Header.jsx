import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Map, 
  Bell, 
  Heart, 
  UserCheck, 
  Store, 
  Globe, 
  Moon, 
  Sun,
  Sparkles,
  Users
} from 'lucide-react';

export const Header = () => {
  const { 
    userRole, setUserRole, 
    staffUser,
    searchQuery, setSearchQuery, 
    wishlist, 
    announcements,
    setIsMapOpen, 
    setIsWishlistOpen,
    setIsNotificationDrawerOpen,
    lang, setLang,
    darkMode, setDarkMode,
    setCurrentView, currentView
  } = useApp();

  const handleRoleToggle = () => {
    if (userRole === 'visitor') {
      setUserRole('staff');
      setCurrentView('staff');
    } else {
      setUserRole('visitor');
      setCurrentView('home');
    }
  };

  return (
    <header style={{
      background: 'rgba(19, 27, 46, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 900
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-red), var(--accent-gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(217, 38, 56, 0.4)'
          }}>
            <BookOpen size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
              {lang === 'bn' ? 'অমর একুশে বইমেলা' : 'Amar Ekushey Boi Mela'}
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
              {lang === 'bn' ? 'ডিজিটাল স্টল ডিরেক্টরি ও সার্চ' : 'Digital Directory & Observer Hub'}
            </span>
          </div>
        </div>

        {/* Global Search input */}
        <div style={{
          flex: 1,
          maxWidth: '420px',
          minWidth: '240px',
          position: 'relative'
        }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={lang === 'bn' ? 'বই, লেখক বা স্টলের নাম দিয়ে খুঁজুন...' : 'Search books, authors, stall #...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all var(--transition-fast)'
            }}
          />
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Map Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsMapOpen(true)}
            title={lang === 'bn' ? 'বইমেলার ম্যাপ দেখুন' : 'View Fair Map'}
          >
            <Map size={16} color="var(--accent-gold)" />
            <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>
              {lang === 'bn' ? 'ম্যাপ' : 'Map'}
            </span>
          </button>

          {/* Notifications Drawer */}
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => setIsNotificationDrawerOpen(true)}
            style={{ position: 'relative' }}
            title={lang === 'bn' ? 'নোটিফিকেশন ও ঘোষণা' : 'Notifications'}
          >
            <Bell size={18} />
            {announcements.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--primary-red)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {announcements.length}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => setIsWishlistOpen(true)}
            style={{ position: 'relative' }}
            title={lang === 'bn' ? 'পছন্দের তালিকা' : 'Wishlist'}
          >
            <Heart size={18} color={wishlist.length > 0 ? '#f43f5e' : 'currentColor'} fill={wishlist.length > 0 ? '#f43f5e' : 'none'} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#f43f5e',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Role Switcher */}
          <button 
            className={`btn ${userRole === 'staff' ? 'btn-gold' : 'btn-primary'}`}
            onClick={handleRoleToggle}
            style={{ fontWeight: 600 }}
          >
            {userRole === 'staff' ? (
              <>
                <Store size={16} />
                <span>{staffUser ? staffUser.stallName : (lang === 'bn' ? 'স্টাফ পোর্টাল' : 'Staff Portal')}</span>
              </>
            ) : (
              <>
                <UserCheck size={16} />
                <span>{lang === 'bn' ? 'প্রকাশক লগইন' : 'Publisher Area'}</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            style={{ minWidth: '45px' }}
          >
            <Globe size={14} />
            <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} color="var(--accent-gold)" /> : <Moon size={18} />}
          </button>

        </div>
      </div>
    </header>
  );
};
