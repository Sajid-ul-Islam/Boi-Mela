import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpDown, BellRing, BookOpen, Button, Div, Eye, Filter, H3, H4, Heart, Img, Info, MapPin, PlusCircle, Search, Select, Span, Sparkles, Star, Store, X } from '../html';

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
    <Div className="animate-fade-in">
      
      {/* Top Filter & View Control Bar */}
      <Div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '24px'
      }}>
        {/* Primary View Tabs */}
        <Div style={{
          display: 'flex',
          gap: '6px',
          background: 'var(--bg-secondary)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <Button 
            className={`btn btn-sm ${activeTab === 'books' ? 'btn-primary' : 'btn-secondary'}`}
            onPress={() => setActiveTab('books')}
          >
            <BookOpen size={16} />
            <Span>{lang === 'bn' ? `বইসমূহ (${filteredBooks.length})` : `Books (${filteredBooks.length})`}</Span>
          </Button>

          <Button 
            className={`btn btn-sm ${activeTab === 'stalls' ? 'btn-primary' : 'btn-secondary'}`}
            onPress={() => setActiveTab('stalls')}
          >
            <Store size={16} />
            <Span>{lang === 'bn' ? `স্টল ডিরেক্টরি (${filteredStalls.length})` : `Stalls (${filteredStalls.length})`}</Span>
          </Button>

          <Button 
            className={`btn btn-sm ${activeTab === 'wishlist' ? 'btn-gold' : 'btn-secondary'}`}
            onPress={() => setActiveTab('wishlist')}
          >
            <Heart size={16} fill={wishlist.length > 0 ? '#f43f5e' : 'none'} color={wishlist.length > 0 ? '#f43f5e' : 'currentColor'} />
            <Span>{lang === 'bn' ? `পছন্দের তালিকা (${wishlist.length})` : `Wishlist (${wishlist.length})`}</Span>
          </Button>
        </Div>

        {/* Sort selector for Books tab */}
        {activeTab === 'books' && (
          <Div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'popular', label: lang === 'bn' ? 'জনপ্রিয়তা অনুসারে' : 'Sort by Rating' },
                { value: 'price-asc', label: lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High' },
                { value: 'price-desc', label: lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low' },
                { value: 'name', label: lang === 'bn' ? 'নাম অনুসারে (অ-আ)' : 'Title A-Z' },
              ]}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </Div>
        )}
      </Div>

      {/* Genre Filter Chips (When viewing Books) */}
      {activeTab === 'books' && (
        <Div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          {genres.map(g => (
            <Button
              key={g.id}
              onPress={() => setSelectedGenre(g.id)}
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
            </Button>
          ))}
        </Div>
      )}

      {/* ----------------- BOOKS TAB CONTENT ----------------- */}
      {activeTab === 'books' && (
        <Div>
          {filteredBooks.length === 0 ? (
            <Div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)'
            }}>
              <Search size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <H3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                {lang === 'bn' ? 'কোনো বই পাওয়া যায়নি' : 'No books found'}
              </H3>
              <P style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                {lang === 'bn' ? 'অনুগ্রহ করে নতুন কোনো অনুসন্ধান শব্দ বা ফিল্টার ব্যবহার করুন।' : 'Try clearing filters or changing your search query.'}
              </P>
              <Button className="btn btn-secondary" onPress={() => { setSearchQuery(''); setSelectedGenre('All'); }}>
                {lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </Button>
            </Div>
          ) : (
            <Div className="book-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {filteredBooks.map(book => {
                const isWishlisted = wishlist.includes(book.id);

                return (
                  <Div 
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
                    <Button
                      onPress={(e) => {
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
                    </Button>

                    {/* Book Cover */}
                    <Div 
                      onPress={() => setSelectedBook(book)} 
                      style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
                    >
                      <Img 
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
                      <Span className="badge badge-red" style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                        স্টল #{book.stallNumber}
                      </Span>
                    </Div>

                    {/* Book Info */}
                    <Div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <Div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>
                        {book.genreBn || book.genre}
                      </Div>

                      <H3 
                        onPress={() => setSelectedBook(book)}
                        style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 700, 
                          marginBottom: '4px', 
                          cursor: 'pointer',
                          lineHeight: 1.3
                        }}
                      >
                        {book.title}
                      </H3>

                      <Div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        {book.author}
                      </Div>

                      <Div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        <Div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-red)' }}>
                          ৳{book.price}
                        </Div>

                        <Button 
                          className="btn btn-secondary btn-sm"
                          onPress={() => setSelectedBook(book)}
                        >
                          <Eye size={14} />
                          <Span>{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</Span>
                        </Button>
                      </Div>
                    </Div>

                  </Div>
                );
              })}
            </Div>
          )}
        </Div>
      )}

      {/* ----------------- STALLS DIRECTORY TAB ----------------- */}
      {activeTab === 'stalls' && (
        <Div className="stall-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredStalls.map(stall => {
            const bookCount = books.filter(b => b.stallId === stall.id || b.stallName === stall.name).length;

            return (
              <Div 
                key={stall.id} 
                className="glass-card" 
                style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
              >
                <Div style={{
                  height: '120px',
                  backgroundImage: `linear-gradient(to bottom, transparent, rgba(19, 27, 46, 0.9)), url(${stall.banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}>
                  <Span className="badge badge-red" style={{ fontSize: '0.85rem' }}>
                    {stall.stallNumber}
                  </Span>
                  <Span className="badge badge-gold">
                    {stall.category}
                  </Span>
                </Div>

                <Div style={{ padding: '16px' }}>
                  <H3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                    {stall.name}
                  </H3>

                  <Div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--primary-red)" />
                    <Span>{stall.zone}</Span>
                  </Div>

                  <P style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', height: '40px', overflow: 'hidden' }}>
                    {stall.description}
                  </P>

                  <Div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <Span style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      বই সংখ্যা: {bookCount}টি
                    </Span>

                    <Button 
                      className="btn btn-primary btn-sm"
                      onPress={() => setSelectedStall(stall)}
                    >
                      <Store size={14} />
                      <Span>{lang === 'bn' ? 'স্টলে প্রবেশ' : 'Visit Stall'}</Span>
                    </Button>
                  </Div>
                </Div>

              </Div>
            );
          })}
        </Div>
      )}

      {/* ----------------- WISHLIST TAB ----------------- */}
      {activeTab === 'wishlist' && (
        <Div>
          {wishlistedBooks.length === 0 ? (
            <Div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)'
            }}>
              <Heart size={48} color="#f43f5e" style={{ marginBottom: '16px' }} />
              <H3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                {lang === 'bn' ? 'পছন্দের তালিকা খালি' : 'Wishlist is Empty'}
              </H3>
              <P style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                {lang === 'bn' ? 'যেকোনো বইয়ের কার্ডে থাকা হার্ট আইকনে ক্লিক করে তালিকায় যুক্ত করুন।' : 'Click the heart icon on any book card to save it here.'}
              </P>
              <Button className="btn btn-primary" onPress={() => setActiveTab('books')}>
                {lang === 'bn' ? 'বইসমূহ ব্রাউজ করুন' : 'Browse Books'}
              </Button>
            </Div>
          ) : (
            <Div className="wishlist-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}>
              {wishlistedBooks.map(book => (
                <Div 
                  key={book.id} 
                  className="glass-card" 
                  style={{ borderRadius: 'var(--radius-md)', padding: '16px' }}
                >
                  <Img src={book.cover} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }} />
                  <H4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>{book.title}</H4>
                  <Div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{book.author}</Div>
                  <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-red)' }}>৳{book.price}</Span>
                    <Button className="btn btn-secondary btn-sm" onPress={() => toggleWishlist(book.id)}>
                      <X size={14} color="#f87171" />
                      <Span>{lang === 'bn' ? 'মুছুন' : 'Remove'}</Span>
                    </Button>
                  </Div>
                </Div>
              ))}
            </Div>
          )}
        </Div>
      )}

    </Div>
  );
};
