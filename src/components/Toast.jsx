import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle2, Div, Info, Span, X } from '../html';

export const Toast = () => {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <Div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: '100%'
    }}>
      {toasts.map(toast => {
        let bg = 'rgba(26, 36, 58, 0.95)';
        let borderColor = 'var(--border-color)';
        let Icon = Info;
        let iconColor = '#3b82f6';

        if (toast.type === 'success') {
          borderColor = '#10b981';
          Icon = CheckCircle2;
          iconColor = '#10b981';
        } else if (toast.type === 'warning') {
          borderColor = '#f59e0b';
          Icon = AlertCircle;
          iconColor = '#f59e0b';
        }

        return (
          <Div
            key={toast.id}
            className="animate-fade-in"
            style={{
              background: bg,
              backdropFilter: 'blur(10px)',
              borderLeft: `4px solid ${borderColor}`,
              borderTop: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <Span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{toast.message}</Span>
          </Div>
        );
      })}
    </Div>
  );
};
