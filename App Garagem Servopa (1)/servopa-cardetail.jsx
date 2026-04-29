// =============================================================
// CAR DETAIL — modal-style page
// =============================================================
function CarDetailScreen({ car, theme, onBack, onSimulate, onTestDrive, onChat, onToggleLike }) {
  const { fmtBRL, Ico } = window.SVP;
  if (!car) return null;
  const liked = !!car.isLiked;
  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%', position: 'relative' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 260, backgroundImage: `url(${car.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, ${theme.bg} 100%)` }}/>
        <button onClick={onBack} style={{
          position: 'absolute', top: 14, left: 14, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(255,255,255,0.95)', color: '#0F1115', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ico.back width="18" height="18"/>
        </button>
        <button onClick={onToggleLike} style={{
          position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(255,255,255,0.95)', color: liked ? '#E11D48' : '#0F1115', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          {liked ? <Ico.heartF width="18" height="18"/> : <Ico.heart width="18" height="18"/>}
        </button>
      </div>

      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ marginTop: -28, position: 'relative', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {car.certified && (
            <span style={{ padding: '5px 11px', borderRadius: 999, background: '#0F1115', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ico.shield width="12" height="12"/> Servopa Certificado
            </span>
          )}
          {car.electric && (
            <span style={{ padding: '5px 11px', borderRadius: 999, background: '#06BCC1', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Eletrificado</span>
          )}
        </div>

        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{car.make}</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em', marginTop: 4 }}>{car.model}</h1>
          <p style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>{car.year} • {car.color}</p>
        </div>

        <div style={{ marginTop: 18, padding: 16, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: theme.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>À vista</p>
            <p style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 2 }}>{fmtBRL(car.price)}</p>
            <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>ou {fmtBRL(car.price / 60)}/mês em 60x</p>
          </div>
          <button onClick={onSimulate} style={{ background: theme.primary, color: theme.onPrimary, padding: '12px 18px', borderRadius: theme.btnRadius, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer' }}>Simular</button>
        </div>

        {/* Specs */}
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { icon: 'gauge', label: 'Quilometragem', value: car.mileage === 0 ? 'Zero km' : `${car.mileage.toLocaleString('pt-BR')} km` },
            { icon: 'fuel',  label: 'Combustível',   value: car.fuelType },
            { icon: 'car',   label: 'Cor',           value: car.color },
            { icon: 'shield',label: 'Garantia',      value: 'Até 2026' },
          ].map((s, i) => {
            const IconComp = Ico[s.icon];
            return (
              <div key={i} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.muted }}>
                  <IconComp width="14" height="14"/>
                  <p style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</p>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, marginTop: 6 }}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <div style={{ marginTop: 22 }}>
          <p style={{ fontSize: 12, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Descrição</p>
          <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 8, color: theme.text }}>{car.description}</p>
        </div>

        {/* Store */}
        <div style={{ marginTop: 22, padding: 14, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: theme.field, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.store width="18" height="18"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800 }}>{car.store}</p>
            <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>Curitiba • PR</p>
          </div>
          <button onClick={onChat} style={{ background: 'transparent', border: `1px solid ${theme.border}`, padding: '7px 12px', borderRadius: 999, color: theme.text, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ver loja</button>
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={onTestDrive} style={{ background: theme.primary, color: theme.onPrimary, padding: '14px 18px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 800, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            <Ico.key width="16" height="16"/> Agendar test drive
          </button>
          <button onClick={onChat} style={{ background: 'transparent', color: theme.text, padding: '14px 18px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 700, border: `1px solid ${theme.border}`, cursor: 'pointer' }}>Falar com vendedor</button>
        </div>
      </div>
    </div>
  );
}

window.CarDetailScreen = CarDetailScreen;
