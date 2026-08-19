import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Div, FooterEl, Globe, H4, Heart, Li, Mail, MapPin, P, Phone, Span, Ul } from '../html';

export const Footer = () => {
  const { lang } = useApp();

  return (
    <FooterEl style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      padding: '40px 16px 20px 16px'
    }}>
      <Div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '32px',
        marginBottom: '32px'
      }}>
        {/* Col 1: About */}
        <Div>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary-red), var(--accent-gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={20} color="#fff" />
            </Div>
            <H4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {lang === 'bn' ? 'অমর একুশে বইমেলা' : 'Amar Ekushey Boi Mela'}
            </H4>
          </Div>
          <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {lang === 'bn' 
              ? 'বাংলা ভাষা ও সাহিত্যের বৃহত্তম জাতীয় গ্রন্থমেলা। আমাদের ডিজিটালি উন্মুক্ত স্টল ডিরেক্টরি ও রিয়েল-টাইম প্ল্যাটফর্ম।'
              : 'Bangladesh’s premier national book fair directory and real-time observer platform.'
            }
          </P>
        </Div>

        {/* Col 2: Grounds & Schedule */}
        <Div>
          <H4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-gold)' }}>
            {lang === 'bn' ? 'মেলা প্রাঙ্গণ ও সময়সূচি' : 'Grounds & Schedule'}
          </H4>
          <Ul style={{ listStyle: 'none', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} color="var(--primary-red)" />
              <Span>বাংলা একাডেমি ও সোহরাওয়ার্দী উদ্যান</Span>
            </Li>
            <Li>⏰ কার্যদিবস: ৩:০০ টা - ৯:০০ টা</Li>
            <Li>⏰ ছুটির দিন: ১১:০০ টা - ৯:০০ টা</Li>
            <Li>🌺 ২১শে ফেব্রুয়ারি: সকাল ৮:০০ টা - রাত ৯:০০ টা</Li>
          </Ul>
        </Div>

        {/* Col 3: Contact */}
        <Div>
          <H4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-teal-light)' }}>
            {lang === 'bn' ? 'যোগাযোগ ও তথ্য কেন্দ্র' : 'Information Desk'}
          </H4>
          <Ul style={{ listStyle: 'none', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} />
              <Span>info@boimela.gov.bd</Span>
            </Li>
            <Li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} />
              <Span>+৮৮০ ২-৯৬৬৯৬৫০</Span>
            </Li>
            <Li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} />
              <Span>banglaacademy.gov.bd</Span>
            </Li>
          </Ul>
        </Div>
      </Div>

      <Div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <Div>
          © ২০২৬ অমর একুশে বইমেলা ডিজিটাল প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।
        </Div>
        <Div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> for Boi Mela Readers & Publishers
        </Div>
      </Div>
    </FooterEl>
  );
};
