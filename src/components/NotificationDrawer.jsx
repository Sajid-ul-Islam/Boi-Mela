import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, BellOff, CheckCircle, Store, Trash2, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';

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
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '450px', 
          height: '100vh', 
          borderRadius: 0, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
              {lang === 'bn' ? 'নোটিফিকেশন ও অবজারভেশন কেন্দ্র' : 'Notification & Observer Center'}
            </h3>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-card)'
        }}>
          <button
            onClick={() => setActiveTab('announcements')}
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
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
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
          </button>
        </div>

        {/* Drawer Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          
          {activeTab === 'announcements' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {announcements.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                  {lang === 'bn' ? 'কোনো নতুন নোটিফিকেশন নেই' : 'No new notifications'}
                </div>
              ) : (
                announcements.map(item => (
                  <div 
                    key={item.id}
                    className="glass-card"
                    style={{ padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-red)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="badge badge-gold">{item.stallName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                      {item.content}
                    </p>

                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal-light)' }}>
                      তারিখ: {item.date} • স্টল #: {item.stallNumber}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {observers.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                  {lang === 'bn' ? 'আপনি এখনও কোনো স্টল সাবস্ক্রাইব করেননি' : 'No subscribed stalls yet'}
                </div>
              ) : (
                observers.map(obs => (
                  <div 
                    key={obs.id}
                    className="glass-card"
                    style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>{obs.stallName}</h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{obs.email}</div>
                      </div>
                      <button 
                        className="btn btn-secondary btn-icon" 
                        onClick={() => unsubscribeObserver(obs.id)}
                        title="Unsubscribe"
                      >
                        <Trash2 size={16} color="#f87171" />
                      </button>
                    </div>

                    {/* Notification Toggles (SetNotificationOnActivity / Off) */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <button
                        className={`btn btn-sm ${obs.notifyApp ? 'btn-teal' : 'btn-secondary'}`}
                        onClick={() => toggleObserverNotification(obs.id, 'notifyApp')}
                        style={{ flex: 1, fontSize: '0.78rem' }}
                      >
                        {obs.notifyApp ? <Volume2 size={14} /> : <VolumeX size={14} />}
                        <span>{obs.notifyApp ? (lang === 'bn' ? 'অ্যাপ পুশ অন' : 'App Push ON') : (lang === 'bn' ? 'অ্যাপ পুশ অফ' : 'App Push OFF')}</span>
                      </button>

                      <button
                        className={`btn btn-sm ${obs.notifyEmail ? 'btn-gold' : 'btn-secondary'}`}
                        onClick={() => toggleObserverNotification(obs.id, 'notifyEmail')}
                        style={{ flex: 1, fontSize: '0.78rem' }}
                      >
                        <Mail size={14} />
                        <span>{obs.notifyEmail ? (lang === 'bn' ? 'ইমেইল অ্যালার্ট অন' : 'Email ON') : (lang === 'bn' ? 'ইমেইল অফ' : 'Email OFF')}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
