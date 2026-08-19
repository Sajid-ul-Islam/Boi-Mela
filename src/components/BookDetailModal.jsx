import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BellRing, Button, Check, Div, H2, Header, Heart, Img, Info, Input, Label, Map, MapPin, Share2, Span, Star, Store, Tag, UserPlus, X } from '../html';

export const BookDetailModal = ({ book, onClose }) => {
  const { 
    lang, 
    wishlist, 
    toggleWishlist, 
    subscribeObserver, 
    setIsMapOpen,
    setSelectedStall,
    stalls
  } = useApp();

  const [obsEmail, setObsEmail] = useState('');
  const [showObsForm, setShowObsForm] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!book) return null;

  const isWishlisted = wishlist.includes(book.id);
  const matchedStall = stalls.find(s => s.id === book.stallId || s.name === book.stallName);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!obsEmail.trim()) return;
    if (subscribeObserver(book.stallId || matchedStall?.id || 'stall-1', obsEmail.trim())) {
      setObsEmail('');
      setShowObsForm(false);
    }
  };

  const handleShare = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        const url = typeof window !== 'undefined' && window.location ? window.location.href : '';
        navigator.clipboard.writeText(url);
      }
    } catch (e) { /* clipboard not available on native */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Div className="modal-overlay" onPress={onClose}>
      <Div className="modal-content" onPress={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        
        {/* Header */}
        <Div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Span className="badge badge-gold">{book.genreBn || book.genre}</Span>
            <Span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>কোড: {book.code || 'BOI-100'}</Span>
          </Div>
          <Button className="btn btn-secondary btn-icon" onPress={onClose}>
            <X size={20} />
          </Button>
        </Div>

        {/* Modal Body */}
        <Div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          
          {/* Left: Book Cover Image & Quick Actions */}
          <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Img 
              src={book.cover} 
              alt={book.title}
              style={{
                width: '100%',
                maxHeight: '340px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                marginBottom: '16px',
                border: '1px solid var(--border-color)'
              }} 
            />

            <Div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <Button 
                className={`btn ${isWishlisted ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onPress={() => toggleWishlist(book.id)}
              >
                <Heart size={18} fill={isWishlisted ? '#ffffff' : 'none'} />
                <Span>{isWishlisted ? (lang === 'bn' ? 'পছন্দ তালিকায় আছে' : 'Wishlisted') : (lang === 'bn' ? 'পছন্দ তালিকায় যোগ করুন' : 'Add to Wishlist')}</Span>
              </Button>

              <Button className="btn btn-secondary btn-icon" onPress={handleShare} title="Share Link">
                {copied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
              </Button>
            </Div>
          </Div>

          {/* Right: Book Details & Stall Info */}
          <Div>
            <H2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
              {book.title}
            </H2>

            <Div style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '16px' }}>
              লেখক: {book.author}
            </Div>

            {/* Price Tag */}
            <Div style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(217, 38, 56, 0.15)',
              border: '1px solid rgba(217, 38, 56, 0.3)',
              marginBottom: '20px'
            }}>
              <Span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-red)' }}>৳{book.price}</Span>
              <Span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{book.inStock ? '(মজুদ আছে)' : '(মজুদ শেষ)'}</Span>
            </Div>

            <P style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
              {book.description || 'অমর একুশে বইমেলা ২০২৬ এর বিশেষ আকর্ষণ। বইটি মেলা প্রাঙ্গণে নির্ধারিত স্টলে ছাড়মূল্যে পাওয়া যাচ্ছে।'}
            </P>

            {/* Stall Info Box */}
            <Div style={{
              padding: '16px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}>
              <Div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Store size={18} color="var(--accent-gold)" />
                <Span style={{ fontWeight: 700, fontSize: '1rem' }}>{book.stallName}</Span>
              </Div>

              <Div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <MapPin size={16} />
                <Span>স্টল নম্বর: <strong style={{ color: '#fff' }}>{book.stallNumber}</strong></Span>
              </Div>

              <Div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  className="btn btn-secondary btn-sm"
                  onPress={() => {
                    if (matchedStall) setSelectedStall(matchedStall);
                    setIsMapOpen(true);
                    onClose();
                  }}
                >
                  <MapPin size={14} color="var(--accent-gold)" />
                  <Span>{lang === 'bn' ? 'ম্যাপে স্টল দেখুন' : 'Locate on Map'}</Span>
                </Button>

                <Button 
                  className="btn btn-teal btn-sm"
                  onPress={() => setShowObsForm(!showObsForm)}
                >
                  <BellRing size={14} />
                  <Span>{lang === 'bn' ? 'স্টল সাবস্ক্রাইব করুন' : 'Subscribe to Stall'}</Span>
                </Button>
              </Div>
            </Div>

            {/* Observer Subscription Input */}
            {showObsForm && (
              <form onSubmit={handleSubscribe} className="animate-fade-in" style={{
                padding: '16px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--accent-teal-light)'
              }}>
                <Label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  {lang === 'bn' ? 'ইমেইল দিন (নতুন বই প্রকাশের নোটিফিকেশন পেতে):' : 'Enter Email for New Book Alerts:'}
                </Label>
                <Div style={{ display: 'flex', gap: '8px' }}>
                  <Input 
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={obsEmail}
                    onChangeText={setObsEmail}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                  <Button type="submit" className="btn btn-teal btn-sm">
                    <UserPlus size={14} />
                    <Span>যুক্ত করুন</Span>
                  </Button>
                </Div>
              </form>
            )}

          </Div>

        </Div>

      </Div>
    </Div>
  );
};
