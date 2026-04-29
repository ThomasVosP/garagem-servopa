// =============================================================
// MARKETPLACE — busca, filtros simples, cards
// =============================================================
function MarketplaceScreen({ marketplace, theme, onCar, onOpenFilters, onOpenSearch }) {
  const { fmtBRL, Ico } = window.SVP;
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'new', label: 'Zero km' },
    { id: 'certified', label: 'Seminovos' },
    { id: 'electric', label: 'Elétricos' },
    { id: 'premium', label: 'Premium' },
  ];
  const filtered = marketplace.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'new') return c.mileage === 0;
    if (filter === 'certified') return c.certified && c.mileage > 0;
    if (filter === 'electric') return c.electric || c.fuelType === 'Híbrido';
    if (filter === 'premium') return c.premium;
    return true;
  });

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%' }}>
      <header style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>Estoque</h1>
          <button onClick={onOpenFilters} style={{ width: 40, height: 40, borderRadius: 20, background: theme.field, border: `1px solid ${theme.border}`, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Ico.filter width="16" height="16"/>
          </button>
        </div>
        <button onClick={onOpenSearch} style={{ background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, width: '100%', cursor: 'pointer', textAlign: 'left' }}>
          <Ico.search width="16" height="16" style={{ color: theme.muted }}/>
          <span style={{ color: theme.muted, fontSize: 14, flex: 1 }}>Marca, modelo, ou loja...</span>
        </button>
      </header>

      {/* filter chips */}
      <div style={{ padding: '14px 20px 4px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
            background: filter === f.id ? theme.primary : theme.card,
            color: filter === f.id ? theme.onPrimary : theme.text,
            border: filter === f.id ? 'none' : `1px solid ${theme.border}`,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(car => (
          <CarCard key={car.id} car={car} theme={theme} onClick={() => onCar(car.id)} />
        ))}
      </div>
    </div>
  );
}

function CarCard({ car, theme, onClick }) {
  const { fmtBRL, Ico } = window.SVP;
  return (
    <article onClick={onClick} style={{
      background: theme.cardElevated, borderRadius: theme.cardRadius, overflow: 'hidden',
      border: `1px solid ${theme.border}`, boxShadow: theme.cardShadow,
      cursor: 'pointer',
    }}>
      <div style={{
        position: 'relative', height: 180,
        backgroundImage: `url(${car.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {car.certified && (
            <span style={{ padding: '4px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.95)', color: '#0F1115', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Ico.shield width="11" height="11"/> Servopa Certificado
            </span>
          )}
          {car.mileage === 0 && (
            <span style={{ padding: '4px 9px', borderRadius: 999, background: theme.primary, color: theme.onPrimary, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Zero km</span>
          )}
        </div>
        <button onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.95)', color: car.isLiked ? '#E11D48' : '#0F1115', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
          {car.isLiked ? <Ico.heartF width="16" height="16"/> : <Ico.heart width="16" height="16"/>}
        </button>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{car.make}</p>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginTop: 2, letterSpacing: '-0.01em' }}>{car.model} <span style={{ color: theme.muted, fontWeight: 600 }}>{car.year}</span></h3>
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em' }}>{fmtBRL(car.price)}</p>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 12, color: theme.muted, flexWrap: 'wrap' }}>
          <span>{car.mileage === 0 ? 'Zero km' : `${car.mileage.toLocaleString('pt-BR')} km`}</span>
          <span>•</span>
          <span>{car.fuelType}</span>
          <span>•</span>
          <span>{car.color}</span>
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: theme.muted, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Ico.pin width="12" height="12"/> {car.store}
          </span>
          <span style={{ fontSize: 12, color: theme.primary, fontWeight: 700 }}>Test drive →</span>
        </div>
      </div>
    </article>
  );
}

window.MarketplaceScreen = MarketplaceScreen;
