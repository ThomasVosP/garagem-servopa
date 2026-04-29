// =============================================================
// MARKETPLACE SHEETS pt 2 — Simulate, TestDrive, DealerChat
// Uses <Sheet> + window.MktAtoms
// =============================================================

// =============================================================
// 3) SIMULATE SHEET — financiamento + consórcio
// Two variations: 'unified' (single screen) vs 'stepper' (3 steps)
// =============================================================
function SimulateSheet({ theme, onClose, car, variation }) {
  const { Ico, fmtBRL } = window.SVP;
  const { Chip, FieldLabel, PrimaryButton, GhostButton } = window.MktAtoms;

  const price = car.price;
  const [mode, setMode] = useState('finance'); // finance | consortium
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(60);
  const [step, setStep] = useState(0); // for stepper variation

  const down = Math.round(price * downPct / 100);
  const financed = price - down;
  // Crude monthly calc — placeholder math (CET-style) for demo
  const monthlyFinance = Math.round(financed / months * 1.18);
  const monthlyConsortium = Math.round(price / months * 1.04);
  const monthly = mode === 'finance' ? monthlyFinance : monthlyConsortium;

  const monthOptions = [36, 48, 60, 72, 84];

  // ─── Stepper variation
  if (variation === 'stepper') {
    const steps = ['Modalidade', 'Condições', 'Resumo'];
    return (
      <Sheet
        theme={theme}
        onClose={onClose}
        title="Simular compra"
        subtitle={`Passo ${step + 1} de ${steps.length} · ${steps[step]}`}
        icon={<Ico.landmark width="18" height="18"/>}
      >
        {/* Progress dots */}
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? theme.primary : theme.field,
              transition: 'all 200ms ease',
            }}/>
          ))}
        </div>

        <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {step === 0 && (
            <>
              <FieldLabel theme={theme}>Como prefere comprar?</FieldLabel>
              {[
                { id: 'finance', icon: 'wallet', title: 'Financiamento', desc: 'Receba o carro agora · juros a partir de 1,18% a.m.' },
                { id: 'consortium', icon: 'landmark', title: 'Consórcio', desc: 'Sem juros · contemplação por sorteio ou lance' },
              ].map(opt => {
                const I = Ico[opt.icon];
                const active = mode === opt.id;
                return (
                  <button key={opt.id} onClick={() => setMode(opt.id)} style={{
                    background: active ? `${theme.primary}10` : theme.card,
                    border: `1.5px solid ${active ? theme.primary : theme.border}`,
                    borderRadius: theme.smallRadius, padding: 16,
                    display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: active ? theme.primary : theme.field, color: active ? theme.onPrimary : theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <I width="18" height="18"/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 800 }}>{opt.title}</p>
                      <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{opt.desc}</p>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                      border: `2px solid ${active ? theme.primary : theme.border}`,
                      background: active ? theme.primary : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {active && <Ico.check width="11" height="11" style={{ color: theme.onPrimary }}/>}
                    </div>
                  </button>
                );
              })}
              <PrimaryButton theme={theme} onClick={() => setStep(1)}>Continuar</PrimaryButton>
            </>
          )}

          {step === 1 && (
            <>
              {mode === 'finance' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <FieldLabel theme={theme}>Entrada</FieldLabel>
                    <p style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{downPct}% · {fmtBRL(down)}</p>
                  </div>
                  <input type="range" min="10" max="80" step="5" value={downPct}
                    onChange={e => setDownPct(+e.target.value)}
                    style={{ width: '100%', accentColor: theme.primary }}/>
                </div>
              )}

              <div>
                <FieldLabel theme={theme}>Prazo</FieldLabel>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {monthOptions.map(m => (
                    <Chip key={m} theme={theme} active={months === m} onClick={() => setMonths(m)}>{m}x</Chip>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <GhostButton theme={theme} onClick={() => setStep(0)}>Voltar</GhostButton>
                <PrimaryButton theme={theme} onClick={() => setStep(2)}>Ver resumo</PrimaryButton>
              </div>
            </>
          )}

          {step === 2 && (
            <SimulateSummary
              theme={theme} car={car} mode={mode}
              price={price} down={down} financed={financed}
              months={months} monthly={monthly}
              onBack={() => setStep(1)}
              onClose={onClose}
            />
          )}
        </div>
      </Sheet>
    );
  }

  // ─── Unified variation (single scrollable view)
  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Simular compra"
      subtitle={`${car.make} ${car.model} · ${fmtBRL(price)}`}
      icon={<Ico.landmark width="18" height="18"/>}
    >
      <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Mode tabs */}
        <div style={{
          background: theme.field, padding: 4, borderRadius: theme.btnRadius,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
        }}>
          {[{ id: 'finance', label: 'Financiamento' }, { id: 'consortium', label: 'Consórcio' }].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              background: mode === m.id ? theme.bg : 'transparent',
              color: mode === m.id ? theme.text : theme.muted,
              border: 'none', padding: '10px', borderRadius: theme.btnRadius - 2,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: mode === m.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}>{m.label}</button>
          ))}
        </div>

        {/* Big monthly value display */}
        <div style={{
          background: theme.heroGradient || theme.primary, color: '#fff',
          borderRadius: theme.cardRadius, padding: '22px 20px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Parcela mensal estimada</p>
          <p style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
            {fmtBRL(monthly)}
          </p>
          <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
            em {months}x {mode === 'finance' ? `· entrada ${fmtBRL(down)}` : '· sem juros'}
          </p>
        </div>

        {/* Down (only for finance) */}
        {mode === 'finance' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <FieldLabel theme={theme}>Entrada</FieldLabel>
              <p style={{ fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{downPct}% · {fmtBRL(down)}</p>
            </div>
            <input type="range" min="10" max="80" step="5" value={downPct}
              onChange={e => setDownPct(+e.target.value)}
              style={{ width: '100%', accentColor: theme.primary }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.muted, marginTop: 4 }}>
              <span>10%</span><span>80%</span>
            </div>
          </div>
        )}

        {/* Months */}
        <div>
          <FieldLabel theme={theme}>Prazo</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {monthOptions.map(m => (
              <Chip key={m} theme={theme} active={months === m} onClick={() => setMonths(m)}>{m}x</Chip>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, overflow: 'hidden' }}>
          {[
            { label: 'Valor do veículo', value: fmtBRL(price) },
            ...(mode === 'finance' ? [
              { label: 'Entrada', value: fmtBRL(down) },
              { label: 'Valor financiado', value: fmtBRL(financed) },
              { label: 'Taxa estimada', value: '1,18% a.m.' },
            ] : [
              { label: 'Carta de crédito', value: fmtBRL(price) },
              { label: 'Taxa de adm. total', value: '4% sobre o valor' },
            ]),
            { label: 'Total a pagar', value: fmtBRL(monthly * months + (mode === 'finance' ? down : 0)), bold: true },
          ].map((row, i, arr) => (
            <div key={i} style={{
              padding: '12px 14px', display: 'flex', justifyContent: 'space-between',
              borderTop: i ? `1px solid ${theme.border}` : 'none',
              background: row.bold ? theme.field : 'transparent',
            }}>
              <span style={{ fontSize: 13, color: row.bold ? theme.text : theme.muted, fontWeight: row.bold ? 700 : 500 }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: row.bold ? 800 : 700, color: theme.text, fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Earn points hint */}
        <div style={{ display: 'flex', gap: 10, padding: 12, background: `${theme.primary}0E`, border: `1px solid ${theme.primary}33`, borderRadius: theme.smallRadius }}>
          <Ico.star width="16" height="16" style={{ color: theme.primary, flexShrink: 0, marginTop: 1 }}/>
          <p style={{ fontSize: 11, color: theme.text, lineHeight: 1.5 }}>
            Salve esta simulação e ganhe <strong>400 Servopontos</strong>. Um consultor entra em contato em até 1h útil.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <GhostButton theme={theme} onClick={onClose}>Fechar</GhostButton>
          <PrimaryButton theme={theme} onClick={onClose}>Falar com consultor</PrimaryButton>
        </div>
      </div>
    </Sheet>
  );
}

function SimulateSummary({ theme, car, mode, price, down, financed, months, monthly, onBack, onClose }) {
  const { fmtBRL, Ico } = window.SVP;
  const { PrimaryButton, GhostButton } = window.MktAtoms;
  const total = monthly * months + (mode === 'finance' ? down : 0);
  return (
    <>
      <div style={{
        background: theme.heroGradient || theme.primary, color: '#fff',
        borderRadius: theme.cardRadius, padding: '22px 20px', textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sua parcela</p>
        <p style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{fmtBRL(monthly)}</p>
        <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>em {months}x · {mode === 'finance' ? 'Financiamento' : 'Consórcio'}</p>
      </div>

      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, overflow: 'hidden' }}>
        {[
          { label: 'Veículo', value: `${car.make} ${car.model}` },
          { label: 'Valor', value: fmtBRL(price) },
          ...(mode === 'finance' ? [{ label: 'Entrada', value: fmtBRL(down) }, { label: 'Financiado', value: fmtBRL(financed) }] : []),
          { label: 'Prazo', value: `${months} meses` },
          { label: 'Total', value: fmtBRL(total), bold: true },
        ].map((row, i) => (
          <div key={i} style={{
            padding: '12px 14px', display: 'flex', justifyContent: 'space-between',
            borderTop: i ? `1px solid ${theme.border}` : 'none',
            background: row.bold ? theme.field : 'transparent',
          }}>
            <span style={{ fontSize: 13, color: row.bold ? theme.text : theme.muted, fontWeight: row.bold ? 700 : 500 }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: row.bold ? 800 : 700, fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <GhostButton theme={theme} onClick={onBack}>Editar</GhostButton>
        <PrimaryButton theme={theme} onClick={onClose}>Falar com consultor</PrimaryButton>
      </div>
    </>
  );
}

// =============================================================
// 4) TEST DRIVE SHEET — date + time + store
// =============================================================
function TestDriveSheet({ theme, onClose, car }) {
  const { Ico, fmtBRL } = window.SVP;
  const { FieldLabel, PrimaryButton, GhostButton } = window.MktAtoms;

  const [step, setStep] = useState('form'); // form | confirmed
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [store, setStore] = useState(car.store || 'Servopa Rockefeller');

  // Generate 7 upcoming days
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });
  const dayNames = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
  const monthNames = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];

  const times = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
  const stores = ['Servopa Rockefeller', 'Servopa Marechal', 'BYD Servopa Curitiba', 'Audi Center Curitiba'];

  if (step === 'confirmed') {
    return (
      <Sheet theme={theme} onClose={onClose} title="Test drive agendado" icon={<Ico.check width="18" height="18"/>}>
        <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{
            background: `${theme.success}14`, border: `1px solid ${theme.success}33`,
            borderRadius: theme.cardRadius, padding: 22, textAlign: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28, background: theme.success, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
            }}>
              <Ico.check width="26" height="26"/>
            </div>
            <p style={{ fontSize: 17, fontWeight: 800, color: theme.text }}>Tudo certo, vai ser ótimo!</p>
            <p style={{ fontSize: 12, color: theme.muted, marginTop: 6, lineHeight: 1.5 }}>
              Te enviamos a confirmação por WhatsApp. Chegue 10 min antes com sua CNH.
            </p>
          </div>

          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 64, height: 48, borderRadius: 8, flexShrink: 0,
              backgroundImage: `url(${car.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
            }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 800 }}>{car.make} {car.model}</p>
              <p style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>
                {dayNames[date.getDay()]} {date.getDate()} {monthNames[date.getMonth()]} · {time} · {store}
              </p>
            </div>
          </div>

          <div style={{ background: `${theme.primary}0E`, border: `1px solid ${theme.primary}33`, borderRadius: theme.smallRadius, padding: 14, display: 'flex', gap: 10 }}>
            <Ico.star width="16" height="16" style={{ color: theme.primary, flexShrink: 0, marginTop: 1 }}/>
            <p style={{ fontSize: 12, color: theme.text, lineHeight: 1.5 }}>
              <strong>+800 Servopontos</strong> serão creditados após o test drive.
            </p>
          </div>

          <PrimaryButton theme={theme} onClick={onClose}>Ver na minha agenda</PrimaryButton>
        </div>
      </Sheet>
    );
  }

  const canConfirm = date && time && store;

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Agendar test drive"
      subtitle={`${car.make} ${car.model} · ${car.year}`}
      icon={<Ico.key width="18" height="18"/>}
    >
      <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Date */}
        <div>
          <FieldLabel theme={theme}>Escolha o dia</FieldLabel>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {days.map((d, i) => {
              const active = date && d.toDateString() === date.toDateString();
              return (
                <button key={i} onClick={() => setDate(d)} style={{
                  flexShrink: 0, width: 60, padding: '12px 4px', borderRadius: theme.smallRadius,
                  background: active ? theme.primary : theme.card,
                  color: active ? theme.onPrimary : theme.text,
                  border: active ? 'none' : `1px solid ${theme.border}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  cursor: 'pointer',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, opacity: active ? 0.85 : 0.6, letterSpacing: '0.08em' }}>{dayNames[d.getDay()]}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{d.getDate()}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, opacity: active ? 0.85 : 0.6 }}>{monthNames[d.getMonth()]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time */}
        <div>
          <FieldLabel theme={theme}>Horário</FieldLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {times.map(t => {
              const active = time === t;
              return (
                <button key={t} onClick={() => setTime(t)} style={{
                  padding: '12px', borderRadius: theme.smallRadius,
                  background: active ? theme.primary : theme.card,
                  color: active ? theme.onPrimary : theme.text,
                  border: active ? 'none' : `1px solid ${theme.border}`,
                  fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums', cursor: 'pointer',
                }}>{t}</button>
              );
            })}
          </div>
        </div>

        {/* Store */}
        <div>
          <FieldLabel theme={theme}>Loja</FieldLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stores.map(s => {
              const active = store === s;
              return (
                <button key={s} onClick={() => setStore(s)} style={{
                  padding: '12px 14px', borderRadius: theme.smallRadius,
                  background: active ? `${theme.primary}10` : theme.card,
                  border: `1.5px solid ${active ? theme.primary : theme.border}`,
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
                }}>
                  <Ico.pin width="15" height="15" style={{ color: active ? theme.primary : theme.muted, flexShrink: 0 }}/>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: theme.text }}>{s}</span>
                  {active && <Ico.check width="14" height="14" style={{ color: theme.primary }}/>}
                </button>
              );
            })}
          </div>
        </div>

        {/* CNH reminder */}
        <div style={{ display: 'flex', gap: 10, padding: 12, background: theme.field, borderRadius: theme.smallRadius }}>
          <Ico.shield width="16" height="16" style={{ color: theme.muted, flexShrink: 0, marginTop: 1 }}/>
          <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.5 }}>
            Leve sua CNH em dia. O test drive dura cerca de 30 min e é acompanhado por um consultor.
          </p>
        </div>

        <PrimaryButton theme={theme} disabled={!canConfirm} onClick={() => setStep('confirmed')}>
          {canConfirm ? 'Confirmar agendamento' : 'Escolha dia, horário e loja'}
        </PrimaryButton>
      </div>
    </Sheet>
  );
}

// =============================================================
// 5) DEALER CHAT SHEET — fala com a loja (chat-style preview)
// =============================================================
function DealerChatSheet({ theme, onClose, car }) {
  const { Ico, fmtBRL } = window.SVP;
  const { PrimaryButton, GhostButton } = window.MktAtoms;

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'dealer', text: `Olá! Sou o Lucas, consultor da ${car.store}. Posso te ajudar com o ${car.model}?`, time: 'agora' },
  ]);
  const inputRef = useRef(null);

  const quickReplies = [
    `Quero saber mais sobre o ${car.model}`,
    'Aceita meu carro como entrada?',
    `Tem desconto à vista?`,
    'Quero agendar test drive',
  ];

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'me', text, time: 'agora' }]);
    setMsg('');
    setTimeout(() => {
      setMessages(m => [...m, {
        from: 'dealer',
        text: 'Recebi! Já estou separando as informações e te respondo em instantes 🙌',
        time: 'agora',
      }]);
    }, 800);
  };

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title={car.store}
      subtitle="Lucas Andrade · Online agora"
      icon={<div style={{ width: 38, height: 38, borderRadius: 19, background: theme.primary, color: theme.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, position: 'relative' }}>
        LA
        <span style={{ position: 'absolute', right: -1, bottom: -1, width: 11, height: 11, borderRadius: 6, background: '#22C55E', border: `2px solid ${theme.bg}` }}/>
      </div>}
    >
      {/* Car ref */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius,
          padding: 10, display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{
            width: 48, height: 36, borderRadius: 6, flexShrink: 0,
            backgroundImage: `url(${car.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
          }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700 }}>{car.make} {car.model} {car.year}</p>
            <p style={{ fontSize: 11, color: theme.muted, fontVariantNumeric: 'tabular-nums' }}>{fmtBRL(car.price)}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: '8px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '78%',
          }}>
            <div style={{
              padding: '10px 14px', borderRadius: 18,
              borderBottomLeftRadius: m.from === 'dealer' ? 4 : 18,
              borderBottomRightRadius: m.from === 'me' ? 4 : 18,
              background: m.from === 'me' ? theme.primary : theme.field,
              color: m.from === 'me' ? theme.onPrimary : theme.text,
              fontSize: 13, lineHeight: 1.4, whiteSpace: 'pre-wrap',
            }}>{m.text}</div>
            <p style={{ fontSize: 10, color: theme.muted, marginTop: 3, paddingLeft: m.from === 'me' ? 0 : 4, paddingRight: m.from === 'me' ? 4 : 0, textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</p>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      {messages.length <= 1 && (
        <div style={{ padding: '14px 20px 6px' }}>
          <p style={{ fontSize: 10, color: theme.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Sugestões</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {quickReplies.map(q => (
              <button key={q} onClick={() => send(q)} style={{
                background: theme.card, border: `1px solid ${theme.border}`, color: theme.text,
                padding: '8px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                cursor: 'pointer', textAlign: 'left',
              }}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <div style={{
        padding: '12px 20px 16px', display: 'flex', gap: 8, alignItems: 'center',
        borderTop: `1px solid ${theme.border}`, marginTop: 14, background: theme.bg,
      }}>
        <input ref={inputRef} value={msg} onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(msg)}
          placeholder="Escreva sua mensagem..."
          style={{
            flex: 1, background: theme.field, border: `1px solid ${theme.border}`,
            borderRadius: 999, padding: '10px 16px', fontSize: 13, color: theme.text,
            outline: 'none', fontFamily: 'inherit', minWidth: 0,
          }}/>
        <button onClick={() => send(msg)} disabled={!msg.trim()} style={{
          width: 40, height: 40, borderRadius: 20, flexShrink: 0,
          background: msg.trim() ? theme.primary : theme.field,
          color: msg.trim() ? theme.onPrimary : theme.muted,
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: msg.trim() ? 'pointer' : 'default',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
        </button>
      </div>
    </Sheet>
  );
}

window.SimulateSheet = SimulateSheet;
window.TestDriveSheet = TestDriveSheet;
window.DealerChatSheet = DealerChatSheet;
