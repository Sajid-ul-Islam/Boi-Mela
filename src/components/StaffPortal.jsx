import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, BookOpen, Button, CheckCircle2, Div, Edit3, H2, H3, Img, Info, Input, Label, Lock, LogOut, Mail, MapPin, Plus, Select, Send, Span, Sparkles, Store, Table, Td, Textarea, Th, Tr, Trash2, User, Users } from '../html';

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
      <Div style={{ maxWidth: '480px', margin: '40px auto' }} className="animate-fade-in">
        <Div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
          
          <Div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Div style={{
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
            </Div>
            <H2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {authMode === 'login' 
                ? (lang === 'bn' ? 'স্টল স্টাফ ও প্রকাশক লগইন' : 'Publisher Login') 
                : (lang === 'bn' ? 'নতুন স্টল রেজিস্টার করুন' : 'Register New Stall')}
            </H2>
            <P style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {lang === 'bn' ? 'বইমেলার স্টল ক্যাটালগ পরিচালনা ও অবজাভারদের নোটিফিকেশন পাঠাতে প্রবেশ করুন।' : 'Manage books, update stall info, and send broadcast alerts.'}
            </P>
          </Div>

          {/* Quick Demo Button */}
          <Button 
            className="btn btn-gold" 
            style={{ width: '100%', marginBottom: '20px', padding: '12px' }}
            onPress={() => loginStaff('', '', true)}
          >
            <Sparkles size={18} />
            <Span>{lang === 'bn' ? 'ডেমো প্রকাশক হিসেবে ডিরেক্ট প্রবেশ' : 'Login as Demo Publisher (Prothoma)'}</Span>
          </Button>

          <Div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            <Span>{lang === 'bn' ? 'অথবা ইমেইল দিয়ে প্রবেশ করুন' : 'OR WITH CREDENTIALS'}</Span>
            <Div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          </Div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  {lang === 'bn' ? 'ইমেইল অ্যাড্রেস:' : 'Email Address:'}
                </Label>
                <Div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <Input 
                    type="email" 
                    required 
                    placeholder="prothoma@boimela.bd" 
                    value={email}
                    onChangeText={setEmail}
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
                </Div>
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  {lang === 'bn' ? 'পাসওয়ার্ড:' : 'Password:'}
                </Label>
                <Div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <Input 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    value={password}
                    onChangeText={setPassword}
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
                </Div>
              </Div>

              <Button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                <Span>{lang === 'bn' ? 'লগইন করুন' : 'Log In'}</Span>
              </Button>

              <Div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem' }}>
                <Span style={{ color: 'var(--text-muted)' }}>{lang === 'bn' ? 'নতুন প্রকাশক?' : 'New Publisher?'} </Span>
                <Button 
                  type="button" 
                  onPress={() => setAuthMode('signup')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
                >
                  {lang === 'bn' ? 'রেজিস্টার করুন' : 'Register Stall'}
                </Button>
              </Div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>স্টল / প্রকাশনীর নাম:</Label>
                <Input 
                  type="text" 
                  required 
                  placeholder="যেমন: অন্বেষা প্রকাশন"
                  value={stallName}
                  onChangeText={setStallName}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ইমেইল:</Label>
                <Input 
                  type="email" 
                  required 
                  placeholder="publisher@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>পাসওয়ার্ড:</Label>
                <Input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Button type="submit" className="btn btn-primary" style={{ padding: '12px', marginTop: '8px' }}>
                <Span>{lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Publisher Account'}</Span>
              </Button>

              <Div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem' }}>
                <Span style={{ color: 'var(--text-muted)' }}>{lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already registered?'} </Span>
                <Button 
                  type="button" 
                  onPress={() => setAuthMode('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }}
                >
                  {lang === 'bn' ? 'লগইন করুন' : 'Log In'}
                </Button>
              </Div>
            </form>
          )}

        </Div>
      </Div>
    );
  }

  // ---------------- LOGGED IN STAFF DASHBOARD ----------------
  return (
    <Div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner Card for Publisher */}
      <Div className="glass-card" style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(26, 36, 58, 0.9), rgba(19, 27, 46, 0.95))',
        borderLeft: '6px solid var(--accent-gold)'
      }}>
        <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Div>
            <Div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Span className="badge badge-gold">{currentStall?.category}</Span>
              <Span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>স্টাফ প্যানেল</Span>
            </Div>
            <H2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
              {currentStall?.name}
            </H2>
            <Div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '16px' }}>
              <Span>📍 স্টল #: <strong>{currentStall?.stallNumber}</strong></Span>
              <Span>🏢 {currentStall?.zone}</Span>
            </Div>
          </Div>

          <Div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button className="btn btn-gold" onPress={() => setShowAddBookModal(true)}>
              <Plus size={18} />
              <Span>{lang === 'bn' ? 'নতুন বই যুক্ত করুন' : 'Add New Book'}</Span>
            </Button>

            <Button className="btn btn-teal" onPress={() => setShowBroadcastModal(true)}>
              <Send size={18} />
              <Span>{lang === 'bn' ? 'ব্রডকাস্ট নোটিশ' : 'Send Broadcast'}</Span>
            </Button>

            <Button className="btn btn-secondary btn-icon" onPress={logoutStaff} title="Logout">
              <LogOut size={18} color="#f87171" />
            </Button>
          </Div>
        </Div>
      </Div>

      {/* Metrics Row */}
      <Div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <Div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 38, 56, 0.15)' }}>
              <BookOpen size={24} color="var(--primary-red)" />
            </Div>
            <Div>
              <Div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stallBooks.length}</Div>
              <Div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>মোট নিবন্ধিত বই</Div>
            </Div>
          </Div>
        </Div>

        <Div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(13, 148, 136, 0.15)' }}>
              <Users size={24} color="var(--accent-teal-light)" />
            </Div>
            <Div>
              <Div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stallObservers.length}</Div>
              <Div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>সক্রিয় অবজারভার (Subscribers)</Div>
            </Div>
          </Div>
        </Div>
      </Div>

      {/* Published Books Management Table */}
      <Div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <H3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--accent-gold)" />
          <Span>{lang === 'bn' ? 'স্টলের প্রকাশিত বইসমূহের তালিকা' : 'Stall Books Inventory'}</Span>
        </H3>

        {stallBooks.length === 0 ? (
          <Div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            কোনো বই যুক্ত করা হয়নি। 'নতুন বই যুক্ত করুন' বোতামে ক্লিক করুন।
          </Div>
        ) : (
          <Div style={{ overflowX: 'auto' }}>
            <Table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <Tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <Th style={{ padding: '12px' }}>কভার</Th>
                  <Th style={{ padding: '12px' }}>বইয়ের নাম</Th>
                  <Th style={{ padding: '12px' }}>লেখক</Th>
                  <Th style={{ padding: '12px' }}>ক্যাটাগরি</Th>
                  <Th style={{ padding: '12px' }}>মূল্য</Th>
                  <Th style={{ padding: '12px', textAlign: 'right' }}>অ্যাকশন</Th>
                </Tr>
              </thead>
              <tbody>
                {stallBooks.map(book => (
                  <Tr key={book.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <Td style={{ padding: '12px' }}>
                      <Img src={book.cover} alt={book.title} style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '4px' }} />
                    </Td>
                    <Td style={{ padding: '12px', fontWeight: 700 }}>{book.title}</Td>
                    <Td style={{ padding: '12px', color: 'var(--text-muted)' }}>{book.author}</Td>
                    <Td style={{ padding: '12px' }}><Span className="badge badge-gold">{book.genreBn || book.genre}</Span></Td>
                    <Td style={{ padding: '12px', fontWeight: 800, color: 'var(--primary-red)' }}>৳{book.price}</Td>
                    <Td style={{ padding: '12px', textAlign: 'right' }}>
                      <Button className="btn btn-secondary btn-icon" onPress={() => deleteBook(book.id)} title="Delete Book">
                        <Trash2 size={16} color="#f87171" />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Div>
        )}
      </Div>

      {/* Observer Subscribers List (ViewObserversActivity.java & RegisterObserverList) */}
      <Div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <H3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="var(--accent-teal-light)" />
          <Span>{lang === 'bn' ? 'স্টল অবজারভার তালিকা (Subscribed Observers)' : 'Registered Observers List'}</Span>
        </H3>

        {stallObservers.length === 0 ? (
          <Div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            এখনও কোনো পাঠক এই স্টল সাবস্ক্রাইব করেননি।
          </Div>
        ) : (
          <Div style={{ overflowX: 'auto' }}>
            <Table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <Tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <Th style={{ padding: '12px' }}>অবজারভার নাম</Th>
                  <Th style={{ padding: '12px' }}>ইমেইল অ্যাড্রেস</Th>
                  <Th style={{ padding: '12px' }}>যুক্ত হওয়ার তারিখ</Th>
                  <Th style={{ padding: '12px' }}>স্ট্যাটাস</Th>
                </Tr>
              </thead>
              <tbody>
                {stallObservers.map(obs => (
                  <Tr key={obs.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <Td style={{ padding: '12px', fontWeight: 600 }}>{obs.name}</Td>
                    <Td style={{ padding: '12px', color: 'var(--accent-teal-light)' }}>{obs.email}</Td>
                    <Td style={{ padding: '12px', color: 'var(--text-muted)' }}>{obs.joinedAt}</Td>
                    <Td style={{ padding: '12px' }}>
                      <Span className="badge badge-teal">সক্রিয় (Active)</Span>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Div>
        )}
      </Div>

      {/* ---------------- ADD BOOK MODAL (AddInformationActivity.java) ---------------- */}
      {showAddBookModal && (
        <Div className="modal-overlay" onPress={() => setShowAddBookModal(false)}>
          <Div className="modal-content" onPress={(e) => e.stopPropagation()} style={{ maxWidth: '550px', padding: '24px' }}>
            <H3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
              {lang === 'bn' ? 'স্টলে নতুন বই যুক্ত করুন' : 'Add New Book Information'}
            </H3>

            <form onSubmit={handleAddBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>বইয়ের নাম (Book Name):</Label>
                <Input 
                  type="text" required placeholder="যেমন: দেওয়াল"
                  value={newBookTitle} onChangeText={setNewBookTitle}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>লেখকের নাম (Author Name):</Label>
                <Input 
                  type="text" required placeholder="যেমন: হুমায়ূন আহমেদ"
                  value={newBookAuthor} onChangeText={setNewBookAuthor}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Div>
                  <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>মূল্য (৳ BDT):</Label>
                  <Input 
                    type="number" required placeholder="450"
                    value={newBookPrice} onChangeText={setNewBookPrice}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </Div>

                <Div>
                  <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ক্যাটাগরি:</Label>
                  <Select 
                    value={newBookGenre} onChange={setNewBookGenre}
                    options={[
                      { value: 'Fiction', label: 'উপন্যাস (Fiction)' },
                      { value: 'Sci-Fi', label: 'সায়েন্স ফিকশন (Sci-Fi)' },
                      { value: 'History', label: 'ইতিহাস ও প্রবন্ধ (History)' },
                      { value: 'Thriller', label: 'গোয়েন্দা ও রোমাঞ্চ (Thriller)' },
                      { value: 'Poetry', label: 'কবিতা সংকলন (Poetry)' },
                    ]}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </Div>
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>কভার ছবি ইউআরএল (Cover Image URL):</Label>
                <Input 
                  type="text" 
                  value={newBookCover} onChangeText={setNewBookCover}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>সংক্ষিপ্ত বিবরণ:</Label>
                <Textarea 
                  rows={3} placeholder="বইয়ের বিষয়বস্তু সম্পর্কে তথ্য..."
                  value={newBookDesc} onChangeText={setNewBookDesc}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <Button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Span>সংরক্ষণ করুন</Span>
                </Button>
                <Button type="button" className="btn btn-secondary" onPress={() => setShowAddBookModal(false)}>
                  <Span>বাতিল</Span>
                </Button>
              </Div>
            </form>
          </Div>
        </Div>
      )}

      {/* ---------------- BROADCAST MESSAGE MODAL ---------------- */}
      {showBroadcastModal && (
        <Div className="modal-overlay" onPress={() => setShowBroadcastModal(false)}>
          <Div className="modal-content" onPress={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '24px' }}>
            <H3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
              {lang === 'bn' ? 'অবজারভারদের ব্রডকাস্ট নোটিশ পাঠান' : 'Send Broadcast to Observers'}
            </H3>
            <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              এই স্টল সাবস্ক্রাইব করা সকল {stallObservers.length} জন গ্রাহককে সরাসরি অ্যাপ ও ইমেইল নোটিফিকেশন পাঠানো হবে।
            </P>

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>শিরোনাম:</Label>
                <Input 
                  type="text" required placeholder="যেমন: বিশেষ মোড়ক উন্মোচন অনুষ্ঠান!"
                  value={broadcastTitle} onChangeText={setBroadcastTitle}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div>
                <Label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>বার্তা/বিবরণ:</Label>
                <Textarea 
                  rows={4} required placeholder="আজ সন্ধ্যা ৬টায় আমাদের স্টলে উপস্থিত থাকবেন বিশিষ্ট কবি..."
                  value={broadcastMessage} onChangeText={setBroadcastMessage}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </Div>

              <Div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <Button type="submit" className="btn btn-teal" style={{ flex: 1 }}>
                  <Send size={16} />
                  <Span>পাঠিয়ে দিন</Span>
                </Button>
                <Button type="button" className="btn btn-secondary" onPress={() => setShowBroadcastModal(false)}>
                  <Span>বাতিল</Span>
                </Button>
              </Div>
            </form>
          </Div>
        </Div>
      )}

    </Div>
  );
};
