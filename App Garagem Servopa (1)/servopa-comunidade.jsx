// =============================================================
// COMUNIDADE — Eventos Servopa, ofertas, novidades
// =============================================================
function ComunidadeScreen({ events, offers, theme }) {
  const { Ico } = window.SVP;

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%' }}>
      <header style={{ padding: '16px 20px 12px' }}>
        <p style={{ fontSize: 12, color: theme.muted, fontWeight: 600 }}>Eventos e novidades</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', marginTop: 2 }}>Servopa em movimento</h1>
      </header>

      {/* Highlight carousel — featured offer */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
          {offers.map(o => (
            <div key={o.id} style={{
              flexShrink: 0, width: 280, height: 160, borderRadius: theme.cardRadius, overflow: 'hidden',
              position: 'relative',
              backgroundImage: `linear-gradient(135deg, ${o.accent}AA 0%, ${o.accent}55 50%, transparent 100%), url(${o.imageUrl})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{ position: 'absolute', top: 14, left: 14 }}>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>{o.tag}</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, color: '#fff' }}>
                <p style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>{o.title}</p>
                <p style={{ fontSize: 12, opacity: 0.92, marginTop: 2 }}>{o.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Próximos eventos</p>
          <button style={{ background: 'transparent', border: 'none', color: theme.primary, fontSize: 12, fontWeight: 700 }}>Ver agenda</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map(ev => (
            <article key={ev.id} style={{
              background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius, overflow: 'hidden',
            }}>
              <div style={{ display: 'flex' }}>
                <div style={{
                  width: 100, flexShrink: 0,
                  backgroundImage: `url(${ev.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
                }}/>
                <div style={{ padding: '14px 16px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{ev.title}</p>
                    {ev.exclusive && <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, padding: '3px 7px', borderRadius: 999, background: '#0F1115', color: '#fff', letterSpacing: '0.1em' }}>VIP</span>}
                  </div>
                  <p style={{ fontSize: 11, color: theme.muted, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Ico.calendar width="11" height="11"/> {ev.date}
                  </p>
                  <p style={{ fontSize: 11, color: theme.muted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Ico.pin width="11" height="11"/> {ev.location}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <p style={{ fontSize: 11, color: theme.muted }}>{ev.attendees} confirmados</p>
                    <span style={{ fontSize: 12, fontWeight: 800, color: theme.primary }}>{ev.price}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ComunidadeScreen = ComunidadeScreen;
