import React from 'react';
import { useApp } from '../context/AppContext';
import { BellRing, BookOpen, Br, Button, ChevronRight, Div, H2, H4, Map, Navigation, P, Search, ShieldCheck, Span, Sparkles, Store } from '../html';

export const SplashScreen = ({ onEnterVisitor, onEnterStaff }) => {
  const { lang } = useApp();

  return (
    <Div className="splash-hero" style={{
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
      <Div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <Div style={{
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        {/* Left Column: Heading & Description */}
        <Div>
          <Div style={{
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
            <Span>{lang === 'bn' ? 'অমর একুশে বইমেলা ২০২৬ ডিরেক্টরি' : 'Amar Ekushey Boi Mela 2026 Directory'}</Span>
          </Div>

          <H2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '16px'
          }}>
            {lang === 'bn' ? (
              <>
                বইমেলার প্রতিটি বই ও স্টল <Br />
                <Span className="gradient-text-ekushey">আপনার হাতের মুঠোয়</Span>
              </>
            ) : (
              <>
                Explore Every Stall & Book <Br />
                <Span className="gradient-text-ekushey">In Real-Time</Span>
              </>
            )}
          </H2>

          <P style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            marginBottom: '28px',
            lineHeight: 1.6
          }}>
            {lang === 'bn'
              ? 'বাংলা একাডেমি ও সোহরাওয়ার্দী উদ্যানের স্টল নম্বর, নতুন বইয়ের তালিকা এবং প্রিয় প্রকাশনীর রিয়েল-টাইম আপডেট পান এখনই।'
              : 'Find stall locations at Suhrawardy Udyan & Bangla Academy, search book titles, and get instant updates from your favorite publishers.'
            }
          </P>

          {/* Quick Metrics */}
          <Div className="splash-metrics" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '32px',
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <Div>
              <Div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>৩৫০+</Div>
              <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'স্টল ও প্যাভিলিয়ন' : 'Stalls & Pavilions'}</Div>
            </Div>
            <Div>
              <Div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-red)' }}>২,০০০+</Div>
              <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'নতুন বইয়ের তথ্য' : 'New Released Books'}</Div>
            </Div>
            <Div>
              <Div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-teal-light)' }}>লাইভ</Div>
              <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'bn' ? 'অবজারভার আপডেট' : 'Observer Updates'}</Div>
            </Div>
          </Div>

          {/* CTA Buttons - Role Choice */}
          <Div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Button 
              className="btn btn-primary" 
              style={{ padding: '14px 28px', fontSize: '1rem' }}
              onPress={onEnterVisitor}
            >
              <Search size={20} />
              <Span>{lang === 'bn' ? 'দর্শনার্থী হিসেবে খুঁজুন' : 'Explore as Visitor'}</Span>
              <ChevronRight size={18} />
            </Button>

            <Button 
              className="btn btn-secondary" 
              style={{ padding: '14px 24px', fontSize: '1rem' }}
              onPress={onEnterStaff}
            >
              <Store size={20} color="var(--accent-gold)" />
              <Span>{lang === 'bn' ? 'প্রকাশক / স্টল স্টাফ' : 'Publisher & Staff Portal'}</Span>
            </Button>
          </Div>
        </Div>

        {/* Right Column: Visual Features Cards */}
        <Div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Navigation size={24} color="var(--accent-gold)" />
            </Div>
            <Div>
              <H4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'সঠিক স্টল ও প্যাভিলিয়ন লোকেশন' : 'Interactive Map & Stall Directions'}
              </H4>
              <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'স্টল নম্বর লিখে তাৎক্ষণিক সোহরাওয়ার্দী উদ্যান বা বাংলা একাডেমির অবস্থান দেখুন।' : 'Locate any stall number across Bangla Academy and Suhrawardy Udyan instantly.'}
              </P>
            </Div>
          </Div>

          <Div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 38, 56, 0.15)' }}>
              <BellRing size={24} color="var(--primary-red)" />
            </Div>
            <Div>
              <H4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'স্টল অবজারভার সাবস্ক্রিপশন' : 'Stall Observer Subscription'}
              </H4>
              <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'প্রিয় প্রকাশনীকে ফলো করুন, নতুন বই ও লেখক স্বাক্ষর অনুষ্ঠানের লাইভ বার্তা পান।' : 'Follow your favorite publishers and get real-time alerts when new books release.'}
              </P>
            </Div>
          </Div>

          <Div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(13, 148, 136, 0.15)' }}>
              <ShieldCheck size={24} color="var(--accent-teal-light)" />
            </Div>
            <Div>
              <H4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>
                {lang === 'bn' ? 'স্টাফ ও প্রকাশক ব্যবস্থাপনা' : 'Publisher Catalog Management'}
              </H4>
              <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'স্টাফ প্যানেল থেকে নতুন বই যুক্ত করুন এবং সাবস্ক্রাইবারদের নোটিফিকেশন পাঠান।' : 'Publishers can easily update book prices, manage stock, and broadcast announcements.'}
              </P>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
