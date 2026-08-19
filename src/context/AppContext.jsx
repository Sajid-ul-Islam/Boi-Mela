import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STALLS, INITIAL_BOOKS, INITIAL_OBSERVERS, INITIAL_ANNOUNCEMENTS } from '../data/initialData';

// Safe storage shim: localStorage is web-only. On native (Android/iOS) we fall
// back to an in-memory store so the app doesn't crash at launch.
const memoryStore = {};
const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
    } catch (e) { /* ignore */ }
    return key in memoryStore ? memoryStore[key] : null;
  },
  setItem: (key, value) => {
    try {
      if (typeof localStorage !== 'undefined') { localStorage.setItem(key, value); return; }
    } catch (e) { /* ignore */ }
    memoryStore[key] = value;
  },
  removeItem: (key) => {
    try {
      if (typeof localStorage !== 'undefined') { localStorage.removeItem(key); return; }
    } catch (e) { /* ignore */ }
    delete memoryStore[key];
  },
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [currentView, setCurrentView] = useState(() => {
    return safeStorage.getItem('boimela_view') || 'home';
  });
  const [userRole, setUserRole] = useState(() => {
    return safeStorage.getItem('boimela_role') || 'visitor'; // 'visitor' | 'staff'
  });
  
  // Staff Authentication State
  const [staffUser, setStaffUser] = useState(() => {
    const saved = safeStorage.getItem('boimela_staff_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Core Data Lists
  const [stalls, setStalls] = useState(() => {
    const saved = safeStorage.getItem('boimela_stalls');
    return saved ? JSON.parse(saved) : INITIAL_STALLS;
  });

  const [books, setBooks] = useState(() => {
    const saved = safeStorage.getItem('boimela_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [observers, setObservers] = useState(() => {
    const saved = safeStorage.getItem('boimela_observers');
    return saved ? JSON.parse(saved) : INITIAL_OBSERVERS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = safeStorage.getItem('boimela_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = safeStorage.getItem('boimela_wishlist');
    return saved ? JSON.parse(saved) : ['book-101', 'book-106'];
  });

  // UI state
  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'stalls' | 'wishlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStall, setSelectedStall] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Settings
  const [lang, setLang] = useState('bn'); // 'bn' | 'en'
  const [darkMode, setDarkMode] = useState(true);

  // Synchronize LocalStorage
  useEffect(() => {
    safeStorage.setItem('boimela_stalls', JSON.stringify(stalls));
  }, [stalls]);

  useEffect(() => {
    safeStorage.setItem('boimela_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    safeStorage.setItem('boimela_observers', JSON.stringify(observers));
  }, [observers]);

  useEffect(() => {
    safeStorage.setItem('boimela_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    safeStorage.setItem('boimela_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    safeStorage.setItem('boimela_role', userRole);
  }, [userRole]);

  useEffect(() => {
    if (staffUser) {
      safeStorage.setItem('boimela_staff_user', JSON.stringify(staffUser));
    } else {
      safeStorage.removeItem('boimela_staff_user');
    }
  }, [staffUser]);

  // Actions
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleWishlist = (bookId) => {
    setWishlist(prev => {
      const exists = prev.includes(bookId);
      if (exists) {
        addToast(lang === 'bn' ? 'বইটি পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from Wishlist', 'warning');
        return prev.filter(id => id !== bookId);
      } else {
        addToast(lang === 'bn' ? 'বইটি পছন্দের তালিকায় যোগ করা হয়েছে!' : 'Added to Wishlist!', 'success');
        return [...prev, bookId];
      }
    });
  };

  const subscribeObserver = (stallId, email, name = 'Visitor') => {
    const stall = stalls.find(s => s.id === stallId);
    const existing = observers.find(o => o.stallId === stallId && o.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      addToast(lang === 'bn' ? 'আপনি ইতিমধ্যে এই স্টলে সাবস্ক্রাইব করে আছেন!' : 'Already subscribed to this stall!', 'info');
      return false;
    }

    const newObs = {
      id: 'obs-' + Date.now(),
      email,
      name,
      stallId,
      stallName: stall ? stall.name : 'Unknown Stall',
      joinedAt: new Date().toLocaleDateString('bn-BD'),
      notifyEmail: true,
      notifyApp: true
    };

    setObservers(prev => [newObs, ...prev]);
    addToast(
      lang === 'bn' 
        ? `${stall?.name || 'স্টল'} এর নতুন নোটিফিকেশন সাবস্ক্রাইব করা হলো!` 
        : `Subscribed to ${stall?.name || 'Stall'} updates!`, 
      'success'
    );
    return true;
  };

  const unsubscribeObserver = (observerId) => {
    setObservers(prev => prev.filter(o => o.id !== observerId));
    addToast(lang === 'bn' ? 'সাবস্ক্রিপশন বাতিল করা হয়েছে' : 'Unsubscribed successfully', 'info');
  };

  const toggleObserverNotification = (observerId, type) => {
    setObservers(prev => prev.map(o => {
      if (o.id === observerId) {
        const updated = { ...o, [type]: !o[type] };
        addToast(
          lang === 'bn' ? `নোটিফিকেশন সেটআপ পরিবর্তন করা হয়েছে` : `Notification settings updated`,
          'success'
        );
        return updated;
      }
      return o;
    }));
  };

  const addBook = (newBookData) => {
    const newBook = {
      id: 'book-' + Date.now(),
      ...newBookData,
      rating: 5.0,
      inStock: true,
      releaseYear: 2026,
      code: 'BOI-' + Math.floor(100 + Math.random() * 900)
    };
    
    setBooks(prev => [newBook, ...prev]);

    // Create automatic broadcast announcement to observers
    const announcement = {
      id: 'ann-' + Date.now(),
      stallName: newBook.stallName,
      stallNumber: newBook.stallNumber || 'N/A',
      title: `নতুন বই প্রকাশিত: ${newBook.title}!`,
      content: `আমাদের স্টলে যুক্ত হয়েছে নতুন বই '${newBook.title}' (লেখক: ${newBook.author})। মূল্য: ৳${newBook.price}`,
      time: 'এইমাত্র',
      date: new Date().toLocaleDateString('bn-BD')
    };

    setAnnouncements(prev => [announcement, ...prev]);

    // Send push toast alert to subscribers
    const stallObsCount = observers.filter(o => o.stallId === newBook.stallId).length;
    addToast(
      lang === 'bn' 
        ? `নতুন বই '${newBook.title}' সফলভাবে যুক্ত হয়েছে! ${stallObsCount} জন অবজারভারকে বার্তা পাঠানো হয়েছে।` 
        : `Book '${newBook.title}' added! Notified ${stallObsCount} observers.`, 
      'success'
    );
  };

  const deleteBook = (bookId) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
    addToast(lang === 'bn' ? 'বইটি তালিকা থেকে মুছে ফেলা হয়েছে' : 'Book removed', 'warning');
  };

  const updateStallInfo = (updatedStall) => {
    setStalls(prev => prev.map(s => s.id === updatedStall.id ? updatedStall : s));
    if (staffUser && staffUser.stallId === updatedStall.id) {
      setStaffUser(prev => ({ ...prev, stallName: updatedStall.name, stallNumber: updatedStall.stallNumber }));
    }
    addToast(lang === 'bn' ? 'স্টলের তথ্য হালনাগাদ করা হয়েছে!' : 'Stall information updated!', 'success');
  };

  const sendBroadcastMessage = (stallId, title, message) => {
    const stall = stalls.find(s => s.id === stallId);
    const newAnn = {
      id: 'ann-' + Date.now(),
      stallName: stall ? stall.name : 'স্টল কর্তৃপক্ষ',
      stallNumber: stall ? stall.stallNumber : '',
      title,
      content: message,
      time: 'এইমাত্র',
      date: new Date().toLocaleDateString('bn-BD')
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    const obsCount = observers.filter(o => o.stallId === stallId).length;
    addToast(
      lang === 'bn' 
        ? `ব্রডকাস্ট নোটিফিকেশন পাঠানো হয়েছে (${obsCount} জন গ্রাহক)` 
        : `Broadcast message sent to ${obsCount} subscribers`, 
      'success'
    );
  };

  const loginStaff = (email, password, isDemo = false) => {
    if (isDemo) {
      const demoStall = stalls[0];
      const demoUser = {
        email: 'prothoma@boimela.bd',
        name: 'মতিউর রহমান (প্রথমা)',
        stallId: demoStall.id,
        stallName: demoStall.name,
        stallNumber: demoStall.stallNumber
      };
      setStaffUser(demoUser);
      setUserRole('staff');
      addToast(lang === 'bn' ? 'স্টল স্টাফ হিসেবে লগইন সফল হয়েছে!' : 'Logged in as Demo Publisher!', 'success');
      return true;
    }

    // Standard credential check (mock)
    const matchingStall = stalls.find(s => s.email.toLowerCase() === email.toLowerCase()) || stalls[0];
    const user = {
      email,
      name: email.split('@')[0].toUpperCase(),
      stallId: matchingStall.id,
      stallName: matchingStall.name,
      stallNumber: matchingStall.stallNumber
    };
    setStaffUser(user);
    setUserRole('staff');
    addToast(lang === 'bn' ? 'স্টল স্টাফ হিসেবে লগইন সফল হয়েছে!' : 'Logged in successfully!', 'success');
    return true;
  };

  const logoutStaff = () => {
    setStaffUser(null);
    setUserRole('visitor');
    addToast(lang === 'bn' ? 'লগআউট করা হয়েছে' : 'Logged out', 'info');
  };

  return (
    <AppContext.Provider value={{
      userRole, setUserRole,
      currentView, setCurrentView,
      activeTab, setActiveTab,
      staffUser, loginStaff, logoutStaff,
      stalls, books, observers, announcements, wishlist,
      searchQuery, setSearchQuery,
      selectedGenre, setSelectedGenre,
      selectedBook, setSelectedBook,
      selectedStall, setSelectedStall,
      isMapOpen, setIsMapOpen,
      isWishlistOpen, setIsWishlistOpen,
      isNotificationDrawerOpen, setIsNotificationDrawerOpen,
      toasts, addToast,
      toggleWishlist, subscribeObserver, unsubscribeObserver, toggleObserverNotification,
      addBook, deleteBook, updateStallInfo, sendBroadcastMessage,
      lang, setLang,
      darkMode, setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
