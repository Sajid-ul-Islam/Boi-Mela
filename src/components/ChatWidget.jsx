import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Div, Span, P, H3, Input, Button, Scroll, MessageCircle, X, Send, Store } from '../html';

// Floating chat launcher + conversation list for Visitor <-> Stall messaging.
export const ChatWidget = () => {
  const {
    lang,
    stalls,
    chats,
    getChat,
    sendChatMessage,
    setActiveChatStallId,
    activeChatStallId,
    chatOpen,
    setChatOpen
  } = useApp();

  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);

  // total unread-ish indicator: number of stalls with at least one message thread
  const threadCount = Object.keys(chats).filter((id) => chats[id] && chats[id].length > 0).length;
  const activeStall = stalls.find((s) => s.id === activeChatStallId) || null;
  const messages = activeStall ? getChat(activeStall.id) : [];

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length, open, activeStall]);

  const handleSend = () => {
    if (!activeStall || !draft.trim()) return;
    sendChatMessage(activeStall.id, draft);
    setDraft('');
  };

  const openStallChat = (stallId) => {
    setActiveChatStallId(stallId);
  };

  return (
    <>
      {/* Floating launcher button */}
      <Button
        onPress={() => setChatOpen((v) => !v)}
        title={lang === 'bn' ? 'স্টলের সাথে চ্যাট করুন' : 'Chat with a stall'}
        style={{
          position: 'fixed',
          bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
          right: '18px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--primary-red), var(--accent-gold))',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(217, 38, 56, 0.45)',
          zIndex: 960,
          transition: 'transform var(--transition-fast)'
        }}
      >
        {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {threadCount > 0 && !chatOpen && (
          <Span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: 'var(--accent-teal)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            minWidth: '20px',
            height: '20px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--bg-primary)'
          }}>
            {threadCount}
          </Span>
        )}
      </Button>

      {/* Chat panel */}
      {chatOpen && (
        <Div style={{
          position: 'fixed',
          bottom: 'calc(148px + env(safe-area-inset-bottom, 0px))',
          right: '18px',
          width: 'min(360px, calc(100vw - 36px))',
          height: 'min(520px, calc(100vh - 200px))',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 961,
          animation: 'fadeIn 0.25s ease'
        }}>
          {/* Panel header */}
          <Div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-color)',
            background: 'linear-gradient(135deg, rgba(217,38,56,0.18), rgba(245,158,11,0.12))'
          }}>
            <Div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={18} color="var(--accent-gold)" />
              <H3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                {lang === 'bn' ? 'স্টল চ্যাট' : 'Stall Chat'}
              </H3>
            </Div>
            {activeStall && (
              <Button onPress={() => setActiveChatStallId(null)} className="btn btn-secondary btn-sm">
                <Span>{lang === 'bn' ? 'তালিকা' : 'List'}</Span>
              </Button>
            )}
          </Div>

          {!activeStall ? (
            /* Stall picker */
            <Scroll ref={scrollRef} style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
              <P style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {lang === 'bn' ? 'যে স্টলের সাথে কথা বলতে চান তা বেছে নিন:' : 'Pick a stall to message:'}
              </P>
              {stalls.slice(0, 12).map((stall) => {
                const count = (chats[stall.id] || []).length;
                return (
                  <Button
                    key={stall.id}
                    onPress={() => openStallChat(stall.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      marginBottom: '8px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      cursor: 'pointer',
                      color: 'var(--text-main)'
                    }}
                  >
                    <Store size={18} color="var(--accent-gold)" />
                    <Div style={{ flex: 1, minWidth: 0 }}>
                      <Div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {stall.name}
                      </Div>
                      <Div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        #{stall.stallNumber}
                      </Div>
                    </Div>
                    {count > 0 && (
                      <Span style={{
                        background: 'var(--primary-red)',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 5px'
                      }}>
                        {count}
                      </Span>
                    )}
                  </Button>
                );
              })}
            </Scroll>
          ) : (
            <>
              {/* Active conversation */}
              <Div style={{ padding: '8px 14px', fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                {activeStall.name} · #{activeStall.stallNumber}
              </Div>
              <Scroll ref={scrollRef} style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.length === 0 && (
                  <P style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>
                    {lang === 'bn' ? 'আপনার প্রশ্ন লিখে পাঠান — প্রকাশক শিগগিরই উত্তর দেবে।' : 'Send a message — the publisher will reply shortly.'}
                  </P>
                )}
                {messages.map((m) => (
                  <Div
                    key={m.id}
                    style={{
                      alignSelf: m.from === 'visitor' ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      padding: '8px 12px',
                      borderRadius: m.from === 'visitor'
                        ? '14px 14px 4px 14px'
                        : '14px 14px 14px 4px',
                      background: m.from === 'visitor'
                        ? 'linear-gradient(135deg, var(--primary-red), #b81c2c)'
                        : 'var(--bg-card)',
                      border: m.from === 'visitor' ? 'none' : '1px solid var(--border-color)',
                      color: m.from === 'visitor' ? '#fff' : 'var(--text-main)',
                      fontSize: '0.88rem',
                      lineHeight: 1.45,
                      wordBreak: 'break-word'
                    }}
                  >
                    <Div>{m.text}</Div>
                    <Div style={{
                      fontSize: '0.65rem',
                      opacity: 0.7,
                      marginTop: '4px',
                      textAlign: 'right'
                    }}>
                      {m.time}
                    </Div>
                  </Div>
                ))}
              </Scroll>

              {/* Composer */}
              <Div style={{ display: 'flex', gap: '8px', padding: '10px 12px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <Input
                  type="text"
                  value={draft}
                  placeholder={lang === 'bn' ? 'আপনার বার্তা লিখুন...' : 'Type a message...'}
                  onChangeText={setDraft}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <Button onPress={handleSend} className="btn btn-primary btn-icon" style={{ width: '42px', height: '42px' }}>
                  <Send size={18} />
                </Button>
              </Div>
            </>
          )}
        </Div>
      )}
    </>
  );
};
