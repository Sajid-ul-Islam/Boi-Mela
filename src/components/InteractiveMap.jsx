import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Check, Compass, Div, H3, Header, Info, Input, Map, MapPin, Search, Span, Store, X } from '../html';

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
    <Div className="modal-overlay" onPress={onClose}>
      <Div className="modal-content" onPress={(e) => e.stopPropagation()} style={{ maxWidth: '950px' }}>
        
        {/* Map Header */}
        <Div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <Div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={24} color="var(--accent-gold)" />
            <Div>
              <H3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                {lang === 'bn' ? 'অমর একুশে বইমেলা প্রাঙ্গণ ম্যাপ' : 'Fair Ground Interactive Map'}
              </H3>
              <Span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'bn' ? 'সোহরাওয়ার্দী উদ্যান ও বাংলা একাডেমি প্রাঙ্গণ' : 'Suhrawardy Udyan & Bangla Academy'}
              </Span>
            </Div>
          </Div>

          <Button className="btn btn-secondary btn-icon" onPress={onClose}>
            <X size={20} />
          </Button>
        </Div>

        {/* Map Filters Bar */}
        <Div style={{
          padding: '16px 24px',
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <Div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <Input 
              type="text" 
              placeholder={lang === 'bn' ? 'স্টল নম্বর বা নাম লিখে ম্যাপে খুঁজুন...' : 'Search stall # on map...'}
              value={mapSearch}
              onChangeText={setMapSearch}
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
          </Div>

          <Div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Suhrawardy', 'Bangla Academy'].map(zone => (
              <Button
                key={zone}
                className={`btn btn-sm ${selectedZone === zone ? 'btn-gold' : 'btn-secondary'}`}
                onPress={() => setSelectedZone(zone)}
              >
                {zone === 'All' ? (lang === 'bn' ? 'সব এলাকা' : 'All Grounds') : zone}
              </Button>
            ))}
          </Div>
        </Div>

        {/* Visual Map Canvas Representation */}
        <Div style={{ padding: '24px' }}>
          
          <Div style={{
            position: 'relative',
            minHeight: '360px',
            background: 'radial-gradient(ellipse at center, rgba(19, 27, 46, 0.9), rgba(11, 15, 25, 0.98))',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed rgba(245, 158, 11, 0.3)',
            padding: '24px',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
          }}>
            
            {/* Zones Grid */}
            <Div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              
              {/* Suhrawardy Udyan Zone */}
              <Div style={{
                padding: '16px',
                background: 'rgba(217, 38, 56, 0.08)',
                border: '1px solid rgba(217, 38, 56, 0.25)',
                borderRadius: 'var(--radius-md)'
              }}>
                <Div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--primary-red)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin size={16} />
                  <Span>সোহরাওয়ার্দী উদ্যান (Suhrawardy Udyan Zone)</Span>
                </Div>

                <Div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredStalls.filter(s => s.zone.includes('Suhrawardy')).map(stall => (
                    <Div 
                      key={stall.id}
                      onPress={() => {
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
                      <Div>
                        <Div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{stall.name}</Div>
                        <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stall.pavilion}</Div>
                      </Div>
                      <Span className="badge badge-red">{stall.stallNumber}</Span>
                    </Div>
                  ))}
                </Div>
              </Div>

              {/* Bangla Academy Zone */}
              <Div style={{
                padding: '16px',
                background: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.25)',
                borderRadius: 'var(--radius-md)'
              }}>
                <Div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal-light)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin size={16} />
                  <Span>বাংলা একাডেমি প্রাঙ্গণ (Bangla Academy Yard)</Span>
                </Div>

                <Div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredStalls.filter(s => s.zone.includes('Bangla Academy')).map(stall => (
                    <Div 
                      key={stall.id}
                      onPress={() => {
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
                      <Div>
                        <Div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{stall.name}</Div>
                        <Div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stall.pavilion}</Div>
                      </Div>
                      <Span className="badge badge-teal">{stall.stallNumber}</Span>
                    </Div>
                  ))}
                </Div>
              </Div>

            </Div>

            {/* Fair Infrastructure Markers */}
            <Div style={{
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
              <Span>🚩 মূল প্রবেশদ্বার (Gate 1 & 2)</Span>
              <Span>🎙️ নজরুল মঞ্চ ও উন্মুক্ত প্রাঙ্গণ</Span>
              <Span>☕ ফুড কোর্ট ও তথ্য কেন্দ্র</Span>
              <Span>🚑 প্রাথমিক চিকিৎসা ও নিরাপত্তা বুথ</Span>
            </Div>

          </Div>

        </Div>

      </Div>
    </Div>
  );
};
