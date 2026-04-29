// =============================================================
// MARKETPLACE SHEETS — Filter, Search, Simulate, TestDrive, DealerChat
// All use the existing <Sheet> shell from servopa-sheets.jsx
// =============================================================

// ─── Reusable atoms ─────────────────────────────────────────
function Chip({ active, theme, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
      background: active ? theme.primary : theme.field,
      color: active ? theme.onPrimary : theme.text,
      border: active ? 'none' : `1px solid ${theme.border}`,
      whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer',
    }}>{children}</button>
  );
}

function FieldLabel({ theme, children }) {
  return (
    <p style={{ fontSize: 11, color: theme.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{children}</p>
  );
}

function PrimaryButton({ theme, children, onClick, disabled, success }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '14px 18px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 800,
      background: success ? theme.success : theme.primary, color: theme.onPrimary, border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: '100%', cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.6 : 1, transition: 'all 200ms ease',
    }}>{children}</button>
  );
}

function GhostButton({ theme, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '14px 18px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 700,
      background: 'transparent', color: theme.text, border: `1px solid ${theme.border}`,
      cursor: 'pointer', width: '100%',
    }}>{children}</button>
  );
}

// =============================================================
// 1) FILTER SHEET — preço, marca, ano, km, combustível, ordenação
// =============================================================
function FilterSheet({ theme, onClose, initial, onApply }) {
  const { Ico, fmtBRL } = window.SVP;
  const [filters, setFilters] = useState(initial || {
    priceMax: 300000,
    yearMin: 2020,
    kmMax: 60000,
    makes: [],
    fuels: [],
    sort: 'relevance',
    onlyCertified: false,
  });

  const update = (k, v) => setFilters(s => ({ ...s, [k]: v }));
  const toggle = (k, v) => setFilters(s => ({
    ...s, [k]: s[k].includes(v) ? s[k].filter(x => x !== v) : [...s[k], v]
  }));

  const makes = ['Volkswagen', 'BYD', 'Honda', 'Audi', 'Toyota', 'Fiat', 'Chevrolet'];
  const fuels = ['Flex', 'Híbrido', 'Elétrico', 'Gasolina', 'Diesel'];
  const sorts = [
    { id: 'relevance', label: 'Relevância' },
    { id: 'price-asc', label: 'Menor preço' },
    { id: 'price-desc', label: 'Maior preço' },
    { id: 'year-desc', label: 'Mais novos' },
    { id: 'km-asc', label: 'Menor km' },
  ];

  const reset = () => setFilters({
    priceMax: 300000, yearMin: 2020, kmMax: 60000,
    makes: [], fuels: [], sort: 'relevance', onlyCertified: false,
  });

  // count active filters
  const activeCount = filters.makes.length + filters.fuels.length
    + (filters.priceMax < 300000 ? 1 : 0)
    + (filters.yearMin > 2020 ? 1 : 0)
    + (filters.kmMax < 60000 ? 1 : 0)
    + (filters.onlyCertified ? 1 : 0);

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Filtros"
      subtitle={activeCount > 0 ? `${activeCount} filtro${activeCount > 1 ? 's' : ''} ativo${activeCount > 1 ? 's' : ''}` : 'Refine sua busca'}
      icon={<Ico.filter width="18" height="18"/>}
    >
      <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Sort */}
        <div>
          <FieldLabel theme={theme}>Ordenar por</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sorts.map(s => (
              <Chip key={s.id} theme={theme} active={filters.sort === s.id} onClick={() => update('sort', s.id)}>{s.label}</Chip>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <FieldLabel theme={theme}>Preço máximo</FieldLabel>
            <p style={{ fontSize: 14, fontWeight: 800, color: theme.text, fontVariantNumeric: 'tabular-nums' }}>
              {filters.priceMax >= 300000 ? `${fmtBRL(300000)}+` : fmtBRL(filters.priceMax)}
            </p>
          </div>
          <input type="range" min="50000" max="300000" step="5000"
            value={filters.priceMax} onChange={e => update('priceMax', +e.target.value)}
            style={{ width: '100%', accentColor: theme.primary }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.muted, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            <span>R$ 50 mil</span><span>R$ 300 mil+</span>
          </div>
        </div>

        {/* Year */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <FieldLabel theme={theme}>Ano (a partir de)</FieldLabel>
            <p style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{filters.yearMin}</p>
          </div>
          <input type="range" min="2015" max="2025" step="1"
            value={filters.yearMin} onChange={e => update('yearMin', +e.target.value)}
            style={{ width: '100%', accentColor: theme.primary }}/>
        </div>

        {/* KM */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <FieldLabel theme={theme}>Km máximo</FieldLabel>
            <p style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
              {filters.kmMax >= 60000 ? '60.000+ km' : `${filters.kmMax.toLocaleString('pt-BR')} km`}
            </p>
          </div>
          <input type="range" min="0" max="60000" step="5000"
            value={filters.kmMax} onChange={e => update('kmMax', +e.target.value)}
            style={{ width: '100%', accentColor: theme.primary }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.muted, marginTop: 4 }}>
            <span>0 km</span><span>60.000 km+</span>
          </div>
        </div>

        {/* Makes */}
        <div>
          <FieldLabel theme={theme}>Marca</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {makes.map(m => (
              <Chip key={m} theme={theme} active={filters.makes.includes(m)} onClick={() => toggle('makes', m)}>{m}</Chip>
            ))}
          </div>
        </div>

        {/* Fuel */}
        <div>
          <FieldLabel theme={theme}>Combustível</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {fuels.map(f => (
              <Chip key={f} theme={theme} active={filters.fuels.includes(f)} onClick={() => toggle('fuels', f)}>{f}</Chip>
            ))}
          </div>
        </div>

        {/* Toggle: certified */}
        <button onClick={() => update('onlyCertified', !filters.onlyCertified)} style={{
          background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius,
          padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ico.shield width="16" height="16"/>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>Apenas certificados</p>
            <p style={{ fontSize: 11, color: theme.muted, marginTop: 1 }}>Inspeção de 150 itens · garantia Servopa</p>
          </div>
          {/* Switch */}
          <div style={{
            width: 40, height: 24, borderRadius: 12, padding: 2, flexShrink: 0,
            background: filters.onlyCertified ? theme.primary : theme.field,
            transition: 'all 200ms ease',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 10, background: '#fff',
              transform: `translateX(${filters.onlyCertified ? 16 : 0}px)`,
              transition: 'all 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}/>
          </div>
        </button>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
          <button onClick={reset} style={{
            flex: 1, padding: '14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 700,
            background: 'transparent', color: theme.text, border: `1px solid ${theme.border}`, cursor: 'pointer',
          }}>Limpar</button>
          <button onClick={() => { onApply && onApply(filters); onClose(); }} style={{
            flex: 2, padding: '14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 800,
            background: theme.primary, color: theme.onPrimary, border: 'none', cursor: 'pointer',
          }}>Aplicar filtros</button>
        </div>
      </div>
    </Sheet>
  );
}

// =============================================================
// 2) SEARCH SHEET — busca com sugestões e recentes
// =============================================================
function SearchSheet({ theme, onClose, marketplace, onPickCar }) {
  const { Ico, fmtBRL } = window.SVP;
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const recent = ['BYD Song', 'SUV até 200 mil', 'Honda HR-V', 'Híbrido'];
  const trending = [
    { label: 'Lançamentos 2024', icon: 'sparkles' },
    { label: 'Híbridos e elétricos', icon: 'gauge' },
    { label: 'Até R$ 100 mil', icon: 'wallet' },
    { label: 'Premium', icon: 'star' },
  ];

  const results = q.length > 0
    ? marketplace.filter(c =>
        `${c.make} ${c.model} ${c.fuelType}`.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Buscar"
      subtitle="Marca, modelo, ano, características"
      icon={<Ico.search width="18" height="18"/>}
    >
      <div style={{ padding: '4px 20px 24px' }}>
        {/* Search input */}
        <div style={{
          background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius,
          padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
        }}>
          <Ico.search width="16" height="16" style={{ color: theme.muted, flexShrink: 0 }}/>
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Ex: BYD Song, SUV até 200 mil, híbrido..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: theme.text, fontFamily: 'inherit', minWidth: 0,
            }}/>
          {q && (
            <button onClick={() => setQ('')} style={{ background: 'transparent', border: 'none', color: theme.muted, padding: 0, cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        {/* Results */}
        {q.length > 0 ? (
          results.length > 0 ? (
            <div>
              <FieldLabel theme={theme}>{results.length} resultado{results.length > 1 ? 's' : ''}</FieldLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {results.map(c => (
                  <button key={c.id} onClick={() => { onPickCar(c.id); onClose(); }} style={{
                    background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius,
                    padding: 12, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{
                      width: 64, height: 48, borderRadius: 8, flexShrink: 0,
                      backgroundImage: `url(${c.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.make} {c.model}</p>
                      <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{c.year} · {fmtBRL(c.price)}</p>
                    </div>
                    <Ico.arrowSm width="14" height="14" style={{ color: theme.muted }}/>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>Nenhum resultado</p>
              <p style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>Tente buscar por marca ou modelo</p>
            </div>
          )
        ) : (
          <>
            {/* Recent */}
            <div style={{ marginBottom: 22 }}>
              <FieldLabel theme={theme}>Buscas recentes</FieldLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recent.map(r => (
                  <button key={r} onClick={() => setQ(r)} style={{
                    background: 'transparent', border: 'none',
                    padding: '12px 4px', display: 'flex', alignItems: 'center', gap: 12,
                    color: theme.text, cursor: 'pointer', textAlign: 'left', fontSize: 14,
                  }}>
                    <Ico.search width="15" height="15" style={{ color: theme.muted, flexShrink: 0 }}/>
                    <span style={{ flex: 1 }}>{r}</span>
                    <Ico.arrowSm width="12" height="12" style={{ color: theme.muted, transform: 'rotate(-45deg)' }}/>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <FieldLabel theme={theme}>Em alta</FieldLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {trending.map(t => {
                  const I = Ico[t.icon] || Ico.star;
                  return (
                    <button key={t.label} onClick={() => setQ(t.label)} style={{
                      background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius,
                      padding: 14, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left',
                    }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <I width="14" height="14"/>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}

window.FilterSheet = FilterSheet;
window.SearchSheet = SearchSheet;
window.MktAtoms = { Chip, FieldLabel, PrimaryButton, GhostButton };
