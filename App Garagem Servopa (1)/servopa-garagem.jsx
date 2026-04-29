// =============================================================
// GARAGEM — meu(s) carro(s), revisões, histórico, documentos
// =============================================================
function GaragemScreen({ user, garage, appointments, history, theme }) {
  const { fmtPts, Ico } = window.SVP;
  const car = garage[0];
  const kmProgressPct = Math.min(100, ((car.currentKm - 0) / car.nextRevisionKm) * 100);
  const kmRemaining = car.nextRevisionKm - car.currentKm;

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%' }}>
      <header style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 600 }}>Meus veículos</p>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', marginTop: 2 }}>Garagem</h1>
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 20, background: theme.field, border: `1px solid ${theme.border}`, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico.plus width="18" height="18"/>
        </button>
      </header>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Car hero card */}
        <div style={{
          background: theme.cardElevated, borderRadius: theme.cardRadius, overflow: 'hidden',
          border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
        }}>
          <div style={{
            height: 160, position: 'relative',
            backgroundImage: `linear-gradient(180deg, transparent 40%, ${theme.cardElevated}), url(${car.imageUrl})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}>
              {car.licensePlate}
            </div>
          </div>
          <div style={{ padding: '14px 18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, color: theme.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{car.make}</p>
                <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', marginTop: 2 }}>{car.model} <span style={{ color: theme.muted, fontWeight: 600 }}>{car.year}</span></h2>
              </div>
              <button style={{ background: 'transparent', border: 'none', color: theme.muted, padding: 4 }}>
                <Ico.edit width="16" height="16"/>
              </button>
            </div>

            <p style={{ fontSize: 12, color: theme.muted, marginTop: 6 }}>
              Comprado em {car.purchasedAt} • {car.currentKm.toLocaleString('pt-BR')} km rodados
            </p>

            {/* km progress to next service */}
            <div style={{ marginTop: 18, padding: 14, background: theme.field, borderRadius: theme.smallRadius }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <p style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>Próxima revisão</p>
                <p style={{ fontSize: 11, color: theme.muted, whiteSpace: 'nowrap' }}>em <strong style={{ color: theme.text }}>{kmRemaining.toLocaleString('pt-BR')} km</strong></p>
              </div>
              <div style={{ height: 6, background: theme.bg, borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${kmProgressPct}%`, height: '100%', background: theme.primary, borderRadius: 99 }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.muted, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
                <span>0 km</span>
                <span>{car.currentKm.toLocaleString('pt-BR')} km</span>
                <span>{car.nextRevisionKm.toLocaleString('pt-BR')} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { id: 'schedule', icon: 'calendar', label: 'Agendar' },
            { id: 'service',  icon: 'wrench',   label: 'Oficina'  },
            { id: 'docs',     icon: 'shield',   label: 'Documentos'},
            { id: 'sell',     icon: 'wallet',   label: 'Vender'   },
          ].map(a => {
            const IconComp = Ico[a.icon];
            return (
              <button key={a.id} style={{
                background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius,
                padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                color: theme.text, fontSize: 11, fontWeight: 700,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${theme.primary}1A`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComp width="16" height="16"/>
                </div>
                {a.label}
              </button>
            );
          })}
        </div>

        {/* Documents status */}
        <div>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Documentos</p>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, overflow: 'hidden' }}>
            {[
              { label: 'IPVA 2026', status: 'paid', detail: 'Pago em jan/2026' },
              { label: 'Seguro', status: 'active', detail: `Ativo até ${car.insuranceUntil}` },
              { label: 'Licenciamento', status: 'paid', detail: 'Em dia' },
            ].map((d, i) => (
              <div key={i} style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: i ? `1px solid ${theme.border}` : 'none',
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{d.label}</p>
                  <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{d.detail}</p>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                  background: `${theme.success}1A`, color: theme.success, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Em dia</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Agendamentos</p>
          {appointments.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {appointments.map(a => (
                <div key={a.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 56, borderRadius: 10, background: theme.field, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: theme.muted, letterSpacing: '0.1em' }}>{a.date.split(' ')[1]}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{a.date.split(' ')[0]}</p>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{a.type}</p>
                    <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{a.store} • {a.time}</p>
                  </div>
                  <Ico.arrowSm width="16" height="16" style={{ color: theme.muted }}/>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: theme.card, border: `1px dashed ${theme.border}`, borderRadius: theme.smallRadius, padding: 18, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: theme.muted }}>Nenhum agendamento.</p>
              <button style={{ marginTop: 8, background: 'transparent', color: theme.primary, fontSize: 13, fontWeight: 700, border: 'none' }}>+ Agendar revisão</button>
            </div>
          )}
        </div>

        {/* Service history compact */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Histórico de serviços</p>
            <button style={{ background: 'transparent', border: 'none', color: theme.primary, fontSize: 12, fontWeight: 700 }}>Ver tudo</button>
          </div>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, overflow: 'hidden' }}>
            {history.slice(0, 3).map((h, i) => (
              <div key={h.id} style={{
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                borderTop: i ? `1px solid ${theme.border}` : 'none',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ico.wrench width="14" height="14"/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{h.title}</p>
                  <p style={{ fontSize: 11, color: theme.muted, marginTop: 1 }}>{h.store} • {h.date}</p>
                </div>
                <p style={{ fontSize: 12, color: theme.muted, fontWeight: 600 }}>{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.GaragemScreen = GaragemScreen;
