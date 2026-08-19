import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Store, Search, BellRing, Navigation, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

export const SplashScreen = ({ onEnterVisitor, onEnterStaff }) => {
  const { lang } = useApp();

  return (
    <div style={{
      background: 'radial-gradient(circle at top center, rgba(217, 38, 56, 0.15), transparent 70%), var(--bg-primary)',
      padding: '40px 20px',
      borderRadius: 'var(--radius-lg)',
      marginBottom: '32px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        {/* Left Column: Heading & Description */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(217, 38, 56, 0.15)',
            border: '1px solid rgba(217, 38, 56, 0.3)',
            color: '#f87171',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            <Sparkles size={14} />
            <span>{lang === 'bn' ? 'অমর একুশে বইমেলা ২০২৬ ডিরেক্টরি' : 'Amar Ekushey Boi Mela 2026 Directory'}</span>
          </div>

          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '16px'
          }}>
            {lang === 'bn' ? (
              <>
                বইমেলার প্রতিটি বই ও স্টল <br />
                <span className="gradient-text-ekushey">আপনার হাতের মুঠোয়</span>
              </>
            ) : (
              <>
                Explore Every Stall & Book <br />
                <span className="gradient-text-ekushey">In Real-Time</span>
              </>
            )}
          </h2>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            marginBottom: '28px',
            lineHeight: 1.6
          }}>
            {lang === 'bn'
              ? 'বাংলা একাডেমি ও সোহরাওয়ার্দী উদ্যানের স্টল নম্বর, নতুন বইয়ের তালিকা এবং প্রিয় প্রকাশনীর রিয়েল-টাইম আপডেট পান এখনই।'
              : 'Find stall locations at Suhrawardy Udyan & Bangla Academy, search book titles, and get instant updates from your favorite publishers.'
            }
          </p>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '32px',
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>৩৫০+</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'স্টল ও প্যাভিলিয়ন' : 'Stalls & Pavilions'}</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-red)' }}>২,০০০+</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'নতুন বইয়ের তথ্য' : 'New Released Books'}</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-teal-light)' }}>লাইভ</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'অবজারভার আপডেট' : 'Observer Updates'}</div>
            </div>
          </div>

          {/* CTA Buttons - Role Choice */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '14px 28px', fontSize: '1rem' }}
              onClick={onEnterVisitor}
            >
              <Search size={20} />
              <span>{lang === 'bn' ? 'দর্শনার্থী হিসেবে খুঁজুন' : 'Explore as Visitor'}</span>
              <ChevronRight size={18} />
            </button>

            <button 
              className="btn btn-secondary" 
              style={{ padding: '14px 24px', fontSize: '1rem' }}
              onClick={onEnterStaff}
            >
              <Store size={20} color="var(--accent-gold)" />
              <span>{lang === 'bn' ? 'প্রকাশক / স্টল স্টাফ' : 'Publisher & Staff Portal'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Features Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Navigation size={24} color="var(--accent-gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'সঠিক স্টল ও প্যাভিলিয়ন লোকেশন' : 'Interactive Map & Stall Directions'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'স্টল নম্বর লিখে তাৎক্ষণিক সোহরাওয়ার্দী উদ্যান বা বাংলা একাডেমির অবস্থান দেখুন।' : 'Locate any stall number across Bangla Academy and Suhrawardy Udyan instantly.'}
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 38, 56, 0.15)' }}>
              <BellRing size={24} color="var(--primary-red)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'স্টল অবজারভার সাবস্ক্রিপশন' : 'Stall Observer Subscription'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'প্রিয় প্রকাশনীকে ফলো করুন, নতুন বই ও লেখক স্বাক্ষর অনুষ্ঠানের লাইভ বার্তা পান।' : 'Follow your favorite publishers and get real-time alerts when new books release.'}
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(13, 148, 136, 0.15)' }}>
              <ShieldCheck size={24} color="var(--accent-teal-light)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'স্টাফ ও প্রকাশক ব্যবস্থাপনা' : 'Publisher Catalog Management'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'স্টাফ প্যানেল থেকে নতুন বই যুক্ত করুন এবং সাবস্ক্রাইবারদের নোটিফিকেশন পাঠান।' : 'Publishers can easily update book prices, manage stock, and broadcast announcements.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
