import React from 'react';
import { useApp } from '../context/AppContext';
import { Div, Button, Span } from '../html';

// Multi-theme switcher: Ekushey (Midnight), Light, Ocean, Solar.
const THEMES = [
  { id: 'midnight', bn: 'একুশে', en: 'Ekushey', color: 'linear-gradient(135deg, #d92638, #f59e0b)' },
  { id: 'light',    bn: 'আলো',   en: 'Light',   color: 'linear-gradient(135deg, #e2e8f0, #94a3b8)' },
  { id: 'ocean',    bn: 'সাগর',  en: 'Ocean',   color: 'linear-gradient(135deg, #0ea5e9, #14b8a6)' },
  { id: 'solar',    bn: 'সোলার', en: 'Solar',   color: 'linear-gradient(135deg, #f59e0b, #ef4444)' }
];

export const ThemeSwitcher = ({ compact = false }) => {
  const { lang, theme, setTheme } = useApp();

  return (
    <Div
      title={lang === 'bn' ? 'থিম পরিবর্তন করুন' : 'Change theme'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '4px' : '6px',
        padding: compact ? '3px' : '4px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)'
      }}
    >
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <Button
            key={t.id}
            onPress={() => setTheme(t.id)}
            title={lang === 'bn' ? t.bn : t.en}
            style={{
              width: compact ? '22px' : '26px',
              height: compact ? '22px' : '26px',
              borderRadius: '50%',
              border: active ? '2px solid var(--text-main)' : '2px solid transparent',
              background: t.color,
              cursor: 'pointer',
              padding: 0,
              boxShadow: active ? '0 0 10px rgba(245,158,11,0.5)' : 'none',
              transition: 'transform var(--transition-fast)',
              transform: active ? 'scale(1.08)' : 'scale(1)'
            }}
          >
            <Span />
          </Button>
        );
      })}
    </Div>
  );
};
