import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Store, MapPin, Mail, Phone, Users, BookOpen, BellRing, Plus, Sparkles } from 'lucide-react';

export const StallDetailModal = ({ stall, onClose }) => {
  const { 
    lang, 
    books, 
    observers, 
    subscribeObserver, 
    setSelectedBook,
    setIsMapOpen
  } = useApp();

  const [email, setEmail] = useState('');

  if (!stall) return null;

  const stallBooks = books.filter(b => b.stallId === stall.id || b.stallName === stall.name);
  const stallObservers = observers.filter(o => o.stallId === stall.id || o.stallName === stall.name);

  const handleSub = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (subscribeObserver(stall.id, email.trim())) {
      setEmail('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        
        {/* Stall Header Banner */}
        <div style={{
          position: 'relative',
          height: '180px',
          backgroundImage: `linear-gradient(to bottom, rgba(19, 27, 46, 0.4), rgba(19, 27, 46, 0.95)), url(${stall.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
        }}>
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)' }}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '6px' }}>{stall.category || 'প্রকাশনী'}</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {stall.name}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-red" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                <MapPin size={14} /> {stall.stallNumber}
              </span>
              <span className="badge badge-teal" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                <Users size={14} /> {stallObservers.length} Observer(s)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Information Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>অবস্থান (Zone)</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{stall.zone}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>প্যাভিলিয়ন</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{stall.pavilion}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>যোগাযোগ ইমেইল</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{stall.email}</div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            {stall.description}
          </p>

          {/* Quick Subscribe Bar */}
          <form onSubmit={handleSub} style={{
            display: 'flex',
            gap: '10px',
            padding: '16px',
            background: 'rgba(13, 148, 136, 0.1)',
            border: '1px solid rgba(13, 148, 136, 0.3)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '32px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <BellRing size={20} color="var(--accent-teal-light)" />
            <div style={{ flex: 1, minWidth: '180px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                {lang === 'bn' ? 'এই স্টলের আপডেট পান (Observer List)' : 'Subscribe to Stall Notifications'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'নতুন বই প্রকাশ ও ছাড়ে নোটিফিকেশন দেওয়া হবে।' : 'Get alerted when new books are listed by this publisher.'}
              </div>
            </div>
            <input 
              type="email" 
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" className="btn btn-teal btn-sm">
              <Plus size={16} />
              <span>{lang === 'bn' ? 'ফলো করুন' : 'Subscribe'}</span>
            </button>
          </form>

          {/* Published Books Grid */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--accent-gold)" />
            <span>{lang === 'bn' ? `স্টলের বইসমূহ (${stallBooks.length})` : `Books in Stall (${stallBooks.length})`}</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px'
          }}>
            {stallBooks.map(book => (
              <div 
                key={book.id}
                className="glass-card"
                onClick={() => {
                  setSelectedBook(book);
                  onClose();
                }}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <img 
                  src={book.cover} 
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '10px'
                  }} 
                />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {book.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {book.author}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--primary-red)', fontSize: '0.95rem' }}>
                  ৳{book.price}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
