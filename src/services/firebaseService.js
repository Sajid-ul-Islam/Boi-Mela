/**
 * Boi Mela Unified Firebase & Realtime Data Service
 * Connects both Web version and Android React Native app to the exact same backend database.
 */

// Initial mock & fallback state for offline / development
import { INITIAL_STALLS, INITIAL_BOOKS, INITIAL_OBSERVERS, INITIAL_ANNOUNCEMENTS } from '../data/initialData';

export class BoiMelaDataService {
  constructor() {
    this.stalls = [...INITIAL_STALLS];
    this.books = [...INITIAL_BOOKS];
    this.observers = [...INITIAL_OBSERVERS];
    this.announcements = [...INITIAL_ANNOUNCEMENTS];
    this.listeners = [];
  }

  // Real-time synchronization subscription
  subscribe(callback) {
    this.listeners.push(callback);
    callback({
      stalls: this.stalls,
      books: this.books,
      observers: this.observers,
      announcements: this.announcements
    });
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    const payload = {
      stalls: this.stalls,
      books: this.books,
      observers: this.observers,
      announcements: this.announcements
    };
    this.listeners.forEach(l => l(payload));
  }

  addBook(newBook) {
    this.books.unshift(newBook);
    
    // Broadcast notification automatically
    this.announcements.unshift({
      id: 'ann-' + Date.now(),
      stallName: newBook.stallName,
      stallNumber: newBook.stallNumber || 'N/A',
      title: `নতুন বই প্রকাশিত: ${newBook.title}!`,
      content: `আমাদের স্টলে যুক্ত হয়েছে নতুন বই '${newBook.title}' (লেখক: ${newBook.author})। মূল্য: ৳${newBook.price}`,
      time: 'এইমাত্র',
      date: new Date().toLocaleDateString('bn-BD')
    });

    this.notify();
  }

  addObserver(stallId, email, name = 'Visitor') {
    const stall = this.stalls.find(s => s.id === stallId);
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
    this.observers.unshift(newObs);
    this.notify();
    return newObs;
  }

  sendBroadcast(stallId, title, message) {
    const stall = this.stalls.find(s => s.id === stallId);
    const newAnn = {
      id: 'ann-' + Date.now(),
      stallName: stall ? stall.name : 'স্টল কর্তৃপক্ষ',
      stallNumber: stall ? stall.stallNumber : '',
      title,
      content: message,
      time: 'এইমাত্র',
      date: new Date().toLocaleDateString('bn-BD')
    };
    this.announcements.unshift(newAnn);
    this.notify();
  }
}

export const dataService = new BoiMelaDataService();
