import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, BellOff, Button, CheckCircle, Div, H3, H4, Header, Mail, Span, Sparkles, Store, Trash2, Volume2, VolumeX, X } from '../html';

export const NotificationDrawer = ({ onClose }) => {
  const { 
    lang, 
    announcements, 
    observers, 
    unsubscribeObserver, 
    toggleObserverNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' | 'subscriptions'

  return (
    <Div className="modal-overlay" onPress={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <Div 
        className="modal-content animate-fade-in" 
        onPress={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '450px', 
          height: '100vh', 
          borderRadius: 0, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {/* Drawer Header */}
        <Div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--primary-red)" />
            <H3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
              {lang === 'bn' ? 'নোটিফিকেশন ও অবজারভেশন কেন্দ্র' : 'Notification & Observer Center'}
            </H3>
          </Div>
          <Button className="btn btn-secondary btn-icon" onPress={onClose}>
            <X size={18} />
          </Button>
        </Div>

        {/* Tab Buttons */}
        <Div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-card)'
        }}>
          <Button
            onPress={() => setActiveTab('announcements')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'announcements' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'announcements' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: activeTab === 'announcements' ? '2px solid var(--accent-gold)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            {lang === 'bn' ? `সর্বশেষ নোটিশ (${announcements.length})` : `Announcements (${announcements.length})`}
          </Button>

          <Button
            onPress={() => setActiveTab('subscriptions')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: activeTab === 'subscriptions' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'subscriptions' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: activeTab === 'subscriptions' ? '2px solid var(--accent-gold)' : 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            {lang === 'bn' ? `আমার সাবস্ক্রিপশন (${observers.length})` : `My Subscriptions (${observers.length})`}
          </Button>
        </Div>

        {/* Drawer Body Content */}
        <Div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          
          {activeTab === 'announcements' ? (
            <Div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {announcements.length === 0 ? (
                <Div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                  {lang === 'bn' ? 'কোনো নতুন নোটিফিকেশন নেই' : 'No new notifications'}
                </Div>
              ) : (
                announcements.map(item => (
                  <Div 
                    key={item.id}
                    className="glass-card"
                    style={{ padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-red)' }}
                  >
                    <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <Span className="badge badge-gold">{item.stallName}</Span>
                      <Span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</Span>
                    </Div>

                    <H4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>
                      {item.title}
                    </H4>

                    <P style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                      {item.content}
                    </P>

                    <Div style={{ fontSize: '0.75rem', color: 'var(--accent-teal-light)' }}>
                      তারিখ: {item.date} • স্টল #: {item.stallNumber}
                    </Div>
                  </Div>
                ))
              )}
            </Div>
          ) : (
            <Div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {observers.length === 0 ? (
                <Div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                  {lang === 'bn' ? 'আপনি এখনও কোনো স্টল সাবস্ক্রাইব করেননি' : 'No subscribed stalls yet'}
                </Div>
              ) : (
                observers.map(obs => (
                  <Div 
                    key={obs.id}
                    className="glass-card"
                    style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}
                  >
                    <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <Div>
                        <H4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>{obs.stallName}</H4>
                        <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{obs.email}</Div>
                      </Div>
                      <Button 
                        className="btn btn-secondary btn-icon" 
                        onPress={() => unsubscribeObserver(obs.id)}
                        title="Unsubscribe"
                      >
                        <Trash2 size={16} color="#f87171" />
                      </Button>
                    </Div>

                    {/* Notification Toggles (SetNotificationOnActivity / Off) */}
                    <Div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <Button
                        className={`btn btn-sm ${obs.notifyApp ? 'btn-teal' : 'btn-secondary'}`}
                        onPress={() => toggleObserverNotification(obs.id, 'notifyApp')}
                        style={{ flex: 1, fontSize: '0.78rem' }}
                      >
                        {obs.notifyApp ? <Volume2 size={14} /> : <VolumeX size={14} />}
                        <Span>{obs.notifyApp ? (lang === 'bn' ? 'অ্যাপ পুশ অন' : 'App Push ON') : (lang === 'bn' ? 'অ্যাপ পুশ অফ' : 'App Push OFF')}</Span>
                      </Button>

                      <Button
                        className={`btn btn-sm ${obs.notifyEmail ? 'btn-gold' : 'btn-secondary'}`}
                        onPress={() => toggleObserverNotification(obs.id, 'notifyEmail')}
                        style={{ flex: 1, fontSize: '0.78rem' }}
                      >
                        <Mail size={14} />
                        <Span>{obs.notifyEmail ? (lang === 'bn' ? 'ইমেইল অ্যালার্ট অন' : 'Email ON') : (lang === 'bn' ? 'ইমেইল অফ' : 'Email OFF')}</Span>
                      </Button>
                    </Div>
                  </Div>
                ))
              )}
            </Div>
          )}

        </Div>

      </Div>
    </Div>
  );
};
