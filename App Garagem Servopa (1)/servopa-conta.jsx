// =============================================================
// CONTA — Servopontos hub
// =============================================================
function ContaScreen({ user, theme, activities, rewards, history, onActivity, onEditProfile }) {
  const { fmtBRL, fmtPts, TierBadge, getTier, getNextTier, Ico } = window.SVP;
  const [tab, setTab] = useState('overview'); // overview | earn | rewards | history
  const tier = getTier(user.tier);
  const nextTier = getNextTier(user.tier);
  const progressPct = nextTier
    ? Math.min(100, ((user.points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100)
    : 100;
  const ptsToNext = nextTier ? nextTier.minPoints - user.points : 0;

  const tabs = [
    { id: 'overview', label: 'Resumo' },
    { id: 'earn', label: 'Ganhar' },
    { id: 'rewards', label: 'Trocar' },
    { id: 'history', label: 'Extrato' },
  ];

  // Use a deep navy hero for clean preset (institutional Servopa)
  const heroIsDark = !!theme.heroGradient && theme.heroGradient.includes('0A3FA8');

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%' }}>
      {/* Header — bolder hierarchy */}
      <header style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, color: theme.muted, fontWeight: 500 }}>Olá,</p>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', marginTop: 2, lineHeight: 1.05 }}>{user.firstName}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onEditProfile} title="Editar cadastro" style={{ width: 40, height: 40, borderRadius: 20, background: theme.field, border: `1px solid ${theme.border}`, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.settings width="17" height="17"/>
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 20, background: theme.field, border: `1px solid ${theme.border}`, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Ico.bell width="18" height="18"/>
            <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, background: theme.primary }}/>
          </button>
        </div>
      </header>

      {/* Servopontos hero card — DEEP NAVY for Servopa institutional vibe */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: heroIsDark ? theme.heroGradient : theme.cardElevated,
          backgroundImage: heroIsDark ? theme.heroGradient : (theme.heroGradient || 'none'),
          borderRadius: theme.cardRadius,
          padding: 22,
          border: heroIsDark ? 'none' : `1px solid ${theme.border}`,
          boxShadow: heroIsDark ? '0 18px 40px -18px rgba(10,63,168,0.45)' : theme.cardShadow,
          color: heroIsDark ? '#FFFFFF' : theme.text,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative ring for depth */}
          {heroIsDark && (
            <div style={{ position: 'absolute', right: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents: 'none' }}/>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, position: 'relative' }}>
            <TierBadge tierId={user.tier} size="md" onDark={heroIsDark} />
            <button style={{ background: 'transparent', border: 'none', color: heroIsDark ? 'rgba(255,255,255,0.75)' : theme.muted, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>
              Benefícios <Ico.arrowSm width="12" height="12"/>
            </button>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: heroIsDark ? 'rgba(255,255,255,0.65)' : theme.muted, marginBottom: 4 }}>Saldo Servopontos</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative' }}>
            <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{fmtPts(user.points)}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: heroIsDark ? 'rgba(255,255,255,0.7)' : theme.muted, letterSpacing: '0.08em' }}>SVP</span>
          </div>
          <p style={{ fontSize: 12, color: heroIsDark ? 'rgba(255,255,255,0.65)' : theme.muted, marginTop: 6, fontWeight: 500 }}>
            +{fmtPts(user.pointsThisYear)} acumulados em 2026
          </p>

          {nextTier && (
            <div style={{ marginTop: 22, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8 }}>
                <span style={{ color: heroIsDark ? 'rgba(255,255,255,0.75)' : theme.muted }}>
                  Faltam <strong style={{ color: heroIsDark ? '#FFFFFF' : theme.text, fontWeight: 800 }}>{fmtPts(ptsToNext)} pts</strong> para Servopa {nextTier.name}
                </span>
                <span style={{ color: heroIsDark ? 'rgba(255,255,255,0.75)' : theme.muted, fontWeight: 700 }}>{Math.round(progressPct)}%</span>
              </div>
              <div style={{ height: 6, background: heroIsDark ? 'rgba(255,255,255,0.18)' : theme.field, borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${progressPct}%`, height: '100%', background: heroIsDark ? '#FFFFFF' : `linear-gradient(90deg, ${tier.accent}, ${nextTier.accent})`, borderRadius: 99 }}/>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 20, position: 'relative' }}>
            <button style={{ flex: 1, background: heroIsDark ? '#FFFFFF' : theme.primary, color: heroIsDark ? theme.primary : theme.onPrimary, padding: '12px 14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Ico.gift width="15" height="15"/> Resgatar
            </button>
            <button style={{ flex: 1, background: heroIsDark ? 'rgba(255,255,255,0.10)' : 'transparent', color: heroIsDark ? '#FFFFFF' : theme.text, padding: '12px 14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 600, border: `1px solid ${heroIsDark ? 'rgba(255,255,255,0.25)' : theme.border}` }}>
              Como ganhar
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 16 }}>
            <p style={{ fontSize: 10, color: theme.muted, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Crédito Servopa</p>
            <p style={{ fontSize: 24, fontWeight: 800, marginTop: 6, letterSpacing: '-0.02em' }}>{fmtBRL(user.cashbackBalance)}</p>
          </div>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 16 }}>
            <p style={{ fontSize: 10, color: theme.muted, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Indicações</p>
            <p style={{ fontSize: 24, fontWeight: 800, marginTop: 6, letterSpacing: '-0.02em' }}>{user.referrals} <span style={{ fontSize: 13, color: theme.muted, fontWeight: 600 }}>amigos</span></p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '24px 20px 0', display: 'flex', gap: 6, borderBottom: `1px solid ${theme.border}`, marginTop: 22 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent',
            color: tab === t.id ? theme.text : theme.muted,
            padding: '10px 0',
            marginRight: 22,
            border: 'none',
            borderBottom: `2px solid ${tab === t.id ? theme.primary : 'transparent'}`,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '-0.005em',
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '20px 20px 28px' }}>
        {tab === 'overview' && (
          <OverviewTab user={user} activities={activities} history={history} theme={theme} onActivity={onActivity} onEditProfile={onEditProfile} />
        )}
        {tab === 'earn' && (
          <EarnTab activities={activities} theme={theme} onActivity={onActivity} />
        )}
        {tab === 'rewards' && (
          <RewardsTab rewards={rewards} userPoints={user.points} theme={theme} />
        )}
        {tab === 'history' && (
          <HistoryTab history={history} theme={theme} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ user, activities, history, theme, onActivity, onEditProfile }) {
  const { fmtPts, Ico } = window.SVP;
  const featured = activities.find(a => a.highlight) || activities.find(a => a.status === 'available');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Featured action */}
      {featured && (
        <div onClick={() => onActivity(featured.id)} style={{
          background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius, padding: 16,
          display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer',
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ico.calendar width="22" height="22"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, color: theme.primary, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Próxima ação</p>
            <p style={{ fontSize: 15, fontWeight: 700, marginTop: 3, letterSpacing: '-0.01em' }}>{featured.title}</p>
            <p style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{featured.subtitle}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: theme.primary }}>+{fmtPts(featured.points)}</p>
            <p style={{ fontSize: 10, color: theme.muted, fontWeight: 600 }}>SVP</p>
          </div>
        </div>
      )}

      <div>
        <p style={{ fontSize: 11, color: theme.muted, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>Atividade recente</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.slice(0, 3).map(h => (
            <div key={h.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.005em' }}>{h.title}</p>
                <p style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>{h.store} • {h.date}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: theme.primary }}>+{fmtPts(h.earned)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account / profile section */}
      <div>
        <p style={{ fontSize: 11, color: theme.muted, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>Minha conta</p>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius, overflow: 'hidden' }}>
          {/* Profile row */}
          <div style={{ padding: '16px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 25, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, fontWeight: 800 }}>
              {(user.firstName || 'U')[0]}{(user.lastName || ' ')[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.005em' }}>{user.firstName} {user.lastName || ''}</p>
              <p style={{ fontSize: 12, color: theme.muted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email || 'renato@email.com'}</p>
            </div>
            <button onClick={onEditProfile} style={{
              background: theme.field, color: theme.text,
              padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
              border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Ico.edit width="13" height="13"/> Editar
            </button>
          </div>
          {/* Action rows */}
          {[
            { id: 'data', icon: 'user', label: 'Dados pessoais e contato', action: onEditProfile },
            { id: 'docs', icon: 'shield', label: 'Documentos e endereço' },
            { id: 'notif', icon: 'bell', label: 'Notificações e preferências' },
            { id: 'logout', icon: 'logout', label: 'Sair', danger: true },
          ].map((row, i) => {
            const IconC = Ico[row.icon] || Ico.user;
            return (
              <button key={row.id} onClick={row.action} style={{
                width: '100%', background: 'transparent', border: 'none',
                borderTop: `1px solid ${theme.border}`,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                color: row.danger ? theme.danger : theme.text,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <IconC width="17" height="17"/>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{row.label}</span>
                {!row.danger && <Ico.arrowSm width="14" height="14" style={{ color: theme.muted }}/>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EarnTab({ activities, theme, onActivity }) {
  const { fmtPts, Ico } = window.SVP;
  const groups = {
    onboarding: 'Comece por aqui',
    service: 'Serviços e revisões',
    growth: 'Indique e ganhe',
    discover: 'Descubra a Servopa',
  };
  const grouped = Object.keys(groups).map(g => ({ id: g, label: groups[g], items: activities.filter(a => a.category === g) })).filter(g => g.items.length);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {grouped.map(g => (
        <div key={g.id}>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{g.label}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.items.map(a => {
              const done = a.status === 'done';
              const locked = a.status === 'locked';
              const IconComp = Ico[a.icon] || Ico.star;
              return (
                <div key={a.id} onClick={() => !done && !locked && onActivity(a.id)} style={{
                  background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14,
                  display: 'flex', gap: 12, alignItems: 'center',
                  opacity: locked ? 0.5 : 1,
                  cursor: !done && !locked ? 'pointer' : 'default',
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: done ? `${theme.success}1A` : `${theme.primary}1A`, color: done ? theme.success : theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {done ? <Ico.check width="18" height="18"/> : <IconComp width="18" height="18"/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.6 : 1 }}>{a.title}</p>
                    <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{a.subtitle}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: done ? theme.muted : theme.primary }}>+{fmtPts(a.points)}</p>
                    <p style={{ fontSize: 10, color: theme.muted }}>SVP</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function RewardsTab({ rewards, userPoints, theme }) {
  const { fmtPts, Ico } = window.SVP;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {rewards.map(r => {
        const can = userPoints >= r.cost;
        const IconComp = Ico[r.icon] || Ico.gift;
        return (
          <div key={r.id} style={{
            background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14,
            display: 'flex', flexDirection: 'column', gap: 10,
            opacity: can ? 1 : 0.55,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${theme.primary}1A`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComp width="18" height="18"/>
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, minHeight: 32 }}>{r.title}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: theme.text }}>{fmtPts(r.cost)} <span style={{ fontSize: 10, color: theme.muted }}>SVP</span></p>
              <button disabled={!can} style={{
                background: can ? theme.primary : 'transparent',
                color: can ? theme.onPrimary : theme.muted,
                padding: '5px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                border: can ? 'none' : `1px solid ${theme.border}`,
                cursor: can ? 'pointer' : 'not-allowed',
              }}>{can ? 'Trocar' : 'Bloqueado'}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HistoryTab({ history, theme }) {
  const { fmtPts } = window.SVP;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {history.map(h => (
        <div key={h.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>{h.title}</p>
            <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{h.store} • {h.date} • {h.value}</p>
          </div>
          <p style={{ fontSize: 13, fontWeight: 800, color: theme.primary }}>+{fmtPts(h.earned)}</p>
        </div>
      ))}
    </div>
  );
}

window.ContaScreen = ContaScreen;
