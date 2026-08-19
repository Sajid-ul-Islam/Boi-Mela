import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Store, 
  Heart, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Sparkles, 
  X, 
  PlusCircle, 
  Eye, 
  BellRing,
  ArrowUpDown
} from 'lucide-react';

export const VisitorView = () => {
  const { 
    lang, 
    books, 
    stalls, 
    wishlist, 
    searchQuery, setSearchQuery, 
    selectedGenre, setSelectedGenre,
    setSelectedBook, 
    setSelectedStall,
    toggleWishlist,
    subscribeObserver,
    setIsMapOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'stalls' | 'wishlist'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'name'

  const genres = [
    { id: 'All', bn: 'সব বই', en: 'All' },
    { id: 'Fiction', bn: 'উপন্যাস', en: 'Fiction' },
    { id: 'Sci-Fi', bn: 'সায়েন্স ফিকশন', en: 'Sci-Fi' },
    { id: 'History', bn: 'ইতিহাস ও মুক্তিযুদ্ধ', en: 'History' },
    { id: 'Thriller', bn: 'গোয়েন্দা ও রোমাঞ্চ', en: 'Thriller' },
    { id: 'Poetry', bn: 'কবিতা সংকলন', en: 'Poetry' }
  ];

  // Filtering Books
  let filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.stallNumber.includes(searchQuery);

    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Sorting Books
  if (sortBy === 'price-asc') {
    filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredBooks.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  }

  // Filtering Stalls
  const filteredStalls = stalls.filter(stall => {
    return stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           stall.stallNumber.includes(searchQuery) ||
           stall.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Wishlist Books
  const wishlistedBooks = books.filter(b => wishlist.includes(b.id));

  return (
    <div className="animate-fade-in">
      
      {/* Top Filter & View Control Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '24px'
      }}>
        {/* Primary View Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: 'var(--bg-secondary)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <button 
            className={`btn btn-sm ${activeTab === 'books' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('books')}
          >
            <BookOpen size={16} />
            <span>{lang === 'bn' ? `বইসমূহ (${filteredBooks.length})` : `Books (${filteredBooks.length})`}</span>
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'stalls' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('stalls')}
          >
            <Store size={16} />
            <span>{lang === 'bn' ? `স্টল ডিরেক্টরি (${filteredStalls.length})` : `Stalls (${filteredStalls.length})`}</span>
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'wishlist' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={16} fill={wishlist.length > 0 ? '#f43f5e' : 'none'} color={wishlist.length > 0 ? '#f43f5e' : 'currentColor'} />
            <span>{lang === 'bn' ? `পছন্দের তালিকা (${wishlist.length})` : `Wishlist (${wishlist.length})`}</span>
          </button>
        </div>

        {/* Sort selector for Books tab */}
        {activeTab === 'books' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="popular">{lang === 'bn' ? 'জনপ্রিয়তা অনুসারে' : 'Sort by Rating'}</option>
              <option value="price-asc">{lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
              <option value="price-desc">{lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
              <option value="name">{lang === 'bn' ? 'নাম অনুসারে (অ-আ)' : 'Title A-Z'}</option>
            </select>
          </div>
        )}
      </div>

      {/* Genre Filter Chips (When viewing Books) */}
      {activeTab === 'books' && (
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          {genres.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(g.id)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: selectedGenre === g.id ? '1px solid var(--primary-red)' : '1px solid var(--border-color)',
                background: selectedGenre === g.id ? 'rgba(217, 38, 56, 0.2)' : 'var(--bg-card)',
                color: selectedGenre === g.id ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.88rem',
                fontWeight: selectedGenre === g.id ? '600' : '400',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {lang === 'bn' ? g.bn : g.en}
            </button>
          ))}
        </div>
      )}

      {/* ----------------- BOOKS TAB CONTENT ----------------- */}
      {activeTab === 'books' && (
        <div>
          {filteredBooks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)'
            }}>
              <Search size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                {lang === 'bn' ? 'কোনো বই পাওয়া যায়নি' : 'No books found'}
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                {lang === 'bn' ? 'অনুগ্রহ করে নতুন কোনো অনুসন্ধান শব্দ বা ফিল্টার ব্যবহার করুন।' : 'Try clearing filters or changing your search query.'}
              </p>
              <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedGenre('All'); }}>
                {lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {filteredBooks.map(book => {
                const isWishlisted = wishlist.includes(book.id);

                return (
                  <div 
                    key={book.id} 
                    className="glass-card"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {/* Wishlist Heart Overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(book.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 10,
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: isWishlisted ? '#f43f5e' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={18} fill={isWishlisted ? '#f43f5e' : 'none'} />
                    </button>

                    {/* Book Cover */}
                    <div 
                      onClick={() => setSelectedBook(book)} 
                      style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
                    >
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        style={{
                          width: '100%',
                          height: '240px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <span className="badge badge-red" style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                        স্টল #{book.stallNumber}
                      </span>
                    </div>

                    {/* Book Info */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>
                        {book.genreBn || book.genre}
                      </div>

                      <h3 
                        onClick={() => setSelectedBook(book)}
                        style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 700, 
                          marginBottom: '4px', 
                          cursor: 'pointer',
                          lineHeight: 1.3
                        }}
                      >
                        {book.title}
                      </h3>

                      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        {book.author}
                      </div>

                      <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-red)' }}>
                          ৳{book.price}
                        </div>

                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedBook(book)}
                        >
                          <Eye size={14} />
                          <span>{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ----------------- STALLS DIRECTORY TAB ----------------- */}
      {activeTab === 'stalls' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredStalls.map(stall => {
            const bookCount = books.filter(b => b.stallId === stall.id || b.stallName === stall.name).length;

            return (
              <div 
                key={stall.id} 
                className="glass-card" 
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
              >
                <div style={{
                  height: '120px',
                  backgroundImage: `linear-gradient(to bottom, transparent, rgba(19, 27, 46, 0.9)), url(${stall.banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}>
                  <span className="badge badge-red" style={{ fontSize: '0.85rem' }}>
                    {stall.stallNumber}
                  </span>
                  <span className="badge badge-gold">
                    {stall.category}
                  </span>
                </div>

                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                    {stall.name}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--primary-red)" />
                    <span>{stall.zone}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', height: '40px', overflow: 'hidden' }}>
                    {stall.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      বই সংখ্যা: {bookCount}টি
                    </span>

                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedStall(stall)}
                    >
                      <Store size={14} />
                      <span>{lang === 'bn' ? 'স্টলে প্রবেশ' : 'Visit Stall'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ----------------- WISHLIST TAB ----------------- */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedBooks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)'
            }}>
              <Heart size={48} color="#f43f5e" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                {lang === 'bn' ? 'পছন্দের তালিকা খালি' : 'Wishlist is Empty'}
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                {lang === 'bn' ? 'যেকোনো বইয়ের কার্ডে থাকা হার্ট আইকনে ক্লিক করে তালিকায় যুক্ত করুন।' : 'Click the heart icon on any book card to save it here.'}
              </p>
              <button className="btn btn-primary" onClick={() => setActiveTab('books')}>
                {lang === 'bn' ? 'বইসমূহ ব্রাউজ করুন' : 'Browse Books'}
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {wishlistedBooks.map(book => (
                <div 
                  key={book.id} 
                  className="glass-card" 
                  style={{ borderRadius: 'var(--radius-md)', padding: '16px' }}
                >
                  <img src={book.cover} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>{book.title}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{book.author}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-red)' }}>৳{book.price}</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => toggleWishlist(book.id)}>
                      <X size={14} color="#f87171" />
                      <span>{lang === 'bn' ? 'মুছুন' : 'Remove'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
