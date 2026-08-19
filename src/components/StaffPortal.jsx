import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Store, 
  Plus, 
  Trash2, 
  Edit3, 
  Users, 
  Send, 
  LogOut, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Mail,
  User,
  Sparkles,
  MapPin
} from 'lucide-react';

export const StaffPortal = () => {
  const { 
    lang, 
    staffUser, 
    loginStaff, 
    logoutStaff, 
    stalls, 
    books, 
    observers, 
    addBook, 
    deleteBook, 
    updateStallInfo,
    sendBroadcastMessage
  } = useApp();

  // Auth State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [stallName, setStallName] = useState('');
  const [stallNumber, setStallNumber] = useState('');

  // Modals inside staff portal
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditStallModal, setShowEditStallModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // New Book Form State (AddInformationActivity.java)
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookPrice, setNewBookPrice] = useState('');
  const [newBookGenre, setNewBookGenre] = useState('Fiction');
  const [newBookCover, setNewBookCover] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80');
  const [newBookDesc, setNewBookDesc] = useState('');

  // Broadcast Message State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Current Stall Info
  const currentStall = staffUser ? stalls.find(s => s.id === staffUser.stallId) || stalls[0] : null;
  const stallBooks = currentStall ? books.filter(b => b.stallId === currentStall.id || b.stallName === currentStall.name) : [];
  const stallObservers = currentStall ? observers.filter(o => o.stallId === currentStall.id || o.stallName === currentStall.name) : [];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    loginStaff(email, password);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !stallName) return;
    loginStaff(email, password);
  };

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    if (!newBookTitle || !newBookAuthor || !newBookPrice) return;
    
    addBook({
      title: newBookTitle,
      author: newBookAuthor,
      price: Number(newBookPrice),
      genre: newBookGenre,
      genreBn: newBookGenre === 'Fiction' ? 'উপন্যাস' : (newBookGenre === 'Sci-Fi' ? 'সায়েন্স ফিকশন' : 'অন্যান্য'),
      cover: newBookCover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
      description: newBookDesc || 'অমর একুশে বইমেলার নতুন সংস্করণ।',
      stallId: currentStall.id,
      stallName: currentStall.name,
      stallNumber: currentStall.stallNumber
    });

    // Reset Form
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookPrice('');
    setNewBookDesc('');
    setShowAddBookModal(false);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    sendBroadcastMessage(currentStall.id, broadcastTitle, broadcastMessage);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setShowBroadcastModal(false);
  };

  // ---------------- NOT LOGGED IN STATE ----------------
  if (!staffUser) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto' }} className="animate-fade-in">
        <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-gold), var(--primary-red))',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <Store size={28} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {authMode === 'login' 
                ? (lang === 'bn' ? 'স্টল স্টাফ ও প্রকাশক লগইন' : 'Publisher Login') 
                : (lang === 'bn' ? 'নতুন স্টল রেজিস্টার করুন' : 'Register New Stall')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {lang === 'bn' ? 'বইমেলার স্টল ক্যাটালগ পরিচালনা ও অবজাভারদের নোটিফিকেশন পাঠাতে প্রবেশ করুন।' : 'Manage books, update stall info, and send broadcast alerts.'}
            </p>
          </div>

          {/* Quick Demo Button */}
          <button 
            className="btn btn-gold" 
            style={{ width: '100%', marginBottom: '20px', padding: '12px' }}
            onClick={() => loginStaff('', '', true)}
          >
            <Sparkles size={18} />
            <span>{lang === 'bn' ? 'ডেমো প্রকাশক হিসেবে ডিরেক্ট প্রবেশ' : 'Login as Demo Publisher (Prothoma)'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            <span>{lang === 'bn' ? 'অথবা ইমেইল দিয়ে প্রবেশ করুন' : 'OR WITH CREDENTIALS'}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  {lang === 'bn' ? 'ইমেইল অ্যাড্রেস:' : 'Email Address:'}
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="email" 
                    required 
                    placeholder="prothoma@boimela.bd" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  {lang === 'bn' ? 'পাসওয়ার্ড:' : 'Password:'}
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                <span>{lang === 'bn' ? 'লগইন করুন' : 'Log In'}</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{lang === 'bn' ? 'নতুন প্রকাশক?' : 'New Publisher?'} </span>
                <button 
                  type="button" 
                  onClick={() => setAuthMode('signup')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
                >
                  {lang === 'bn' ? 'রেজিস্টার করুন' : 'Register Stall'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>স্টল / প্রকাশনীর নাম:</label>
                <input 
                  type="text" 
                  required 
                  placeholder="যেমন: অন্বেষা প্রকাশন"
                  value={stallName}
                  onChange={(e) => setStallName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ইমেইল:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="publisher@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>পাসওয়ার্ড:</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                <span>{lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Publisher Account'}</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already registered?'} </span>
                <button 
                  type="button" 
                  onClick={() => setAuthMode('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
                >
                  {lang === 'bn' ? 'লগইন করুন' : 'Log In'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // ---------------- LOGGED IN STAFF DASHBOARD ----------------
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner Card for Publisher */}
      <div className="glass-card" style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(26, 36, 58, 0.9), rgba(19, 27, 46, 0.95))',
        borderLeft: '6px solid var(--accent-gold)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span className="badge badge-gold">{currentStall?.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>স্টাফ প্যানেল</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
              {currentStall?.name}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '16px' }}>
              <span>📍 স্টল #: <strong>{currentStall?.stallNumber}</strong></span>
              <span>🏢 {currentStall?.zone}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => setShowAddBookModal(true)}>
              <Plus size={18} />
              <span>{lang === 'bn' ? 'নতুন বই যুক্ত করুন' : 'Add New Book'}</span>
            </button>

            <button className="btn btn-teal" onClick={() => setShowBroadcastModal(true)}>
              <Send size={18} />
              <span>{lang === 'bn' ? 'ব্রডকাস্ট নোটিশ' : 'Send Broadcast'}</span>
            </button>

            <button className="btn btn-secondary btn-icon" onClick={logoutStaff} title="Logout">
              <LogOut size={18} color="#f87171" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 38, 56, 0.15)' }}>
              <BookOpen size={24} color="var(--primary-red)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stallBooks.length}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>মোট নিবন্ধিত বই</div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(13, 148, 136, 0.15)' }}>
              <Users size={24} color="var(--accent-teal-light)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stallObservers.length}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>সক্রিয় অবজারভার (Subscribers)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Published Books Management Table */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--accent-gold)" />
          <span>{lang === 'bn' ? 'স্টলের প্রকাশিত বইসমূহের তালিকা' : 'Stall Books Inventory'}</span>
        </h3>

        {stallBooks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            কোনো বই যুক্ত করা হয়নি। 'নতুন বই যুক্ত করুন' বোতামে ক্লিক করুন।
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>কভার</th>
                  <th style={{ padding: '12px' }}>বইয়ের নাম</th>
                  <th style={{ padding: '12px' }}>লেখক</th>
                  <th style={{ padding: '12px' }}>ক্যাটাগরি</th>
                  <th style={{ padding: '12px' }}>মূল্য</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {stallBooks.map(book => (
                  <tr key={book.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px' }}>
                      <img src={book.cover} alt={book.title} style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{book.title}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{book.author}</td>
                    <td style={{ padding: '12px' }}><span className="badge badge-gold">{book.genreBn || book.genre}</span></td>
                    <td style={{ padding: '12px', fontWeight: 800, color: 'var(--primary-red)' }}>৳{book.price}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-icon" onClick={() => deleteBook(book.id)} title="Delete Book">
                        <Trash2 size={16} color="#f87171" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Observer Subscribers List (ViewObserversActivity.java & RegisterObserverList) */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="var(--accent-teal-light)" />
          <span>{lang === 'bn' ? 'স্টল অবজারভার তালিকা (Subscribed Observers)' : 'Registered Observers List'}</span>
        </h3>

        {stallObservers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            এখনও কোনো পাঠক এই স্টল সাবস্ক্রাইব করেননি।
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>অবজারভার নাম</th>
                  <th style={{ padding: '12px' }}>ইমেইল অ্যাড্রেস</th>
                  <th style={{ padding: '12px' }}>যুক্ত হওয়ার তারিখ</th>
                  <th style={{ padding: '12px' }}>স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {stallObservers.map(obs => (
                  <tr key={obs.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{obs.name}</td>
                    <td style={{ padding: '12px', color: 'var(--accent-teal-light)' }}>{obs.email}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{obs.joinedAt}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge badge-teal">সক্রিয় (Active)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- ADD BOOK MODAL (AddInformationActivity.java) ---------------- */}
      {showAddBookModal && (
        <div className="modal-overlay" onClick={() => setShowAddBookModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
              {lang === 'bn' ? 'স্টলে নতুন বই যুক্ত করুন' : 'Add New Book Information'}
            </h3>

            <form onSubmit={handleAddBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>বইয়ের নাম (Book Name):</label>
                <input 
                  type="text" required placeholder="যেমন: দেওয়াল"
                  value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>লেখকের নাম (Author Name):</label>
                <input 
                  type="text" required placeholder="যেমন: হুমায়ূন আহমেদ"
                  value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>মূল্য (৳ BDT):</label>
                  <input 
                    type="number" required placeholder="450"
                    value={newBookPrice} onChange={(e) => setNewBookPrice(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ক্যাটাগরি:</label>
                  <select 
                    value={newBookGenre} onChange={(e) => setNewBookGenre(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                  >
                    <option value="Fiction">উপন্যাস (Fiction)</option>
                    <option value="Sci-Fi">সায়েন্স ফিকশন (Sci-Fi)</option>
                    <option value="History">ইতিহাস ও প্রবন্ধ (History)</option>
                    <option value="Thriller">গোয়েন্দা ও রোমাঞ্চ (Thriller)</option>
                    <option value="Poetry">কবিতা সংকলন (Poetry)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>কভার ছবি ইউআরএল (Cover Image URL):</label>
                <input 
                  type="text" 
                  value={newBookCover} onChange={(e) => setNewBookCover(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>সংক্ষিপ্ত বিবরণ:</label>
                <textarea 
                  rows={3} placeholder="বইয়ের বিষয়বস্তু সম্পর্কে তথ্য..."
                  value={newBookDesc} onChange={(e) => setNewBookDesc(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <span>সংরক্ষণ করুন</span>
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddBookModal(false)}>
                  <span>বাতিল</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- BROADCAST MESSAGE MODAL ---------------- */}
      {showBroadcastModal && (
        <div className="modal-overlay" onClick={() => setShowBroadcastModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
              {lang === 'bn' ? 'অবজারভারদের ব্রডকাস্ট নোটিশ পাঠান' : 'Send Broadcast to Observers'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              এই স্টল সাবস্ক্রাইব করা সকল {stallObservers.length} জন গ্রাহককে সরাসরি অ্যাপ ও ইমেইল নোটিফিকেশন পাঠানো হবে।
            </p>

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>শিরোনাম:</label>
                <input 
                  type="text" required placeholder="যেমন: বিশেষ মোড়ক উন্মোচন অনুষ্ঠান!"
                  value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>বার্তা/বিবরণ:</label>
                <textarea 
                  rows={4} required placeholder="আজ সন্ধ্যা ৬টায় আমাদের স্টলে উপস্থিত থাকবেন বিশিষ্ট কবি..."
                  value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="submit" className="btn btn-teal" style={{ flex: 1 }}>
                  <Send size={16} />
                  <span>পাঠিয়ে দিন</span>
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowBroadcastModal(false)}>
                  <span>বাতিল</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
