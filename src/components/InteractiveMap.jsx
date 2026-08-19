import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Search, Compass, Info, Check, Store } from 'lucide-react';

export const InteractiveMap = ({ onClose }) => {
  const { lang, stalls, setSelectedStall } = useApp();
  const [selectedZone, setSelectedZone] = useState('All');
  const [mapSearch, setMapSearch] = useState('');

  const filteredStalls = stalls.filter(stall => {
    const matchesSearch = stall.name.toLowerCase().includes(mapSearch.toLowerCase()) || 
                          stall.stallNumber.includes(mapSearch);
    const matchesZone = selectedZone === 'All' || stall.zone.includes(selectedZone);
    return matchesSearch && matchesZone;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '950px' }}>
        
        {/* Map Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={24} color="var(--accent-gold)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                {lang === 'bn' ? 'অমর একুশে বইমেলা প্রাঙ্গণ ম্যাপ' : 'Fair Ground Interactive Map'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'সোহরাওয়ার্দী উদ্যান ও বাংলা একাডেমি প্রাঙ্গণ' : 'Suhrawardy Udyan & Bangla Academy'}
              </span>
            </div>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Map Filters Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder={lang === 'bn' ? 'স্টল নম্বর বা নাম লিখে ম্যাপে খুঁজুন...' : 'Search stall # on map...'}
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Suhrawardy', 'Bangla Academy'].map(zone => (
              <button
                key={zone}
                className={`btn btn-sm ${selectedZone === zone ? 'btn-gold' : 'btn-secondary'}`}
                onClick={() => setSelectedZone(zone)}
              >
                {zone === 'All' ? (lang === 'bn' ? 'সব এলাকা' : 'All Grounds') : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Canvas Representation */}
        <div style={{ padding: '24px' }}>
          
          <div style={{
            position: 'relative',
            minHeight: '360px',
            background: 'radial-gradient(ellipse at center, rgba(19, 27, 46, 0.9), rgba(11, 15, 25, 0.98))',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed rgba(245, 158, 11, 0.3)',
            padding: '24px',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
          }}>
            
            {/* Zones Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              
              {/* Suhrawardy Udyan Zone */}
              <div style={{
                padding: '16px',
                background: 'rgba(217, 38, 56, 0.08)',
                border: '1px solid rgba(217, 38, 56, 0.25)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--primary-red)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin size={16} />
                  <span>সোহরাওয়ার্দী উদ্যান (Suhrawardy Udyan Zone)</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredStalls.filter(s => s.zone.includes('Suhrawardy')).map(stall => (
                    <div 
                      key={stall.id}
                      onClick={() => {
                        setSelectedStall(stall);
                        onClose();
                      }}
                      style={{
                        padding: '10px 14px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s'
                      }}
                      className="glass-card"
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{stall.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stall.pavilion}</div>
                      </div>
                      <span className="badge badge-red">{stall.stallNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bangla Academy Zone */}
              <div style={{
                padding: '16px',
                background: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.25)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal-light)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin size={16} />
                  <span>বাংলা একাডেমি প্রাঙ্গণ (Bangla Academy Yard)</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredStalls.filter(s => s.zone.includes('Bangla Academy')).map(stall => (
                    <div 
                      key={stall.id}
                      onClick={() => {
                        setSelectedStall(stall);
                        onClose();
                      }}
                      style={{
                        padding: '10px 14px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s'
                      }}
                      className="glass-card"
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{stall.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stall.pavilion}</div>
                      </div>
                      <span className="badge badge-teal">{stall.stallNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Fair Infrastructure Markers */}
            <div style={{
              marginTop: '20px',
              padding: '12px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}>
              <span>🚩 মূল প্রবেশদ্বার (Gate 1 & 2)</span>
              <span>🎙️ নজরুল মঞ্চ ও উন্মুক্ত প্রাঙ্গণ</span>
              <span>☕ ফুড কোর্ট ও তথ্য কেন্দ্র</span>
              <span>🚑 প্রাথমিক চিকিৎসা ও নিরাপত্তা বুথ</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
