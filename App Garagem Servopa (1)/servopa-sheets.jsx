// =============================================================
// SHEETS — modals: Edit Profile, WhatsApp contact
// =============================================================

// Bottom-sheet shell with backdrop + slide animation
function Sheet({ children, onClose, theme, title, subtitle, icon }) {
  const { Ico } = window.SVP;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,21,48,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}/>

      {/* Sheet */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxHeight: '88%',
        background: theme.bg,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        boxShadow: '0 -12px 40px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 6 }}>
          <span style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.18)' }}/>
        </div>

        {/* Title row */}
        <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          {icon && (
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {icon}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{title}</p>
            {subtitle && <p style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, background: theme.field, border: `1px solid ${theme.border}`, color: theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes svpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes svpFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// =============================================================
// EDIT PROFILE
// =============================================================
function EditProfileSheet({ user, theme, onClose }) {
  const { Ico } = window.SVP;
  const [form, setForm] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    cpf: user.cpf || '',
    cep: user.cep || '80010-000',
    address: user.address || 'Rua XV de Novembro, 1234',
    city: user.city || 'Curitiba',
    state: user.state || 'PR',
  });
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedOk(true);
      setTimeout(() => onClose(), 700);
    }, 800);
  };

  const FieldLabel = ({ children }) => (
    <p style={{ fontSize: 11, color: theme.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{children}</p>
  );
  const fieldStyle = {
    width: '100%',
    padding: '12px 14px',
    background: theme.field,
    border: `1px solid ${theme.border}`,
    borderRadius: theme.fieldRadius,
    fontSize: 15,
    fontWeight: 500,
    color: theme.text,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Editar cadastro"
      subtitle="Mantenha seus dados atualizados"
      icon={<Ico.user width="20" height="20"/>}
    >
      <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Avatar row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: `${theme.primary}14`, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, position: 'relative' }}>
            {(form.firstName[0] || 'U')}{(form.lastName[0] || '')}
            <button style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 24, height: 24, borderRadius: 12,
              background: theme.primary, color: theme.onPrimary,
              border: `2px solid ${theme.bg}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Ico.edit width="11" height="11"/>
            </button>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700 }}>Foto de perfil</p>
            <p style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>Toque para alterar</p>
          </div>
        </div>

        {/* Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <FieldLabel>Nome</FieldLabel>
            <input style={fieldStyle} value={form.firstName} onChange={e => update('firstName', e.target.value)}/>
          </div>
          <div>
            <FieldLabel>Sobrenome</FieldLabel>
            <input style={fieldStyle} value={form.lastName} onChange={e => update('lastName', e.target.value)}/>
          </div>
        </div>

        {/* Contact section */}
        <div>
          <FieldLabel>Contato</FieldLabel>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.smallRadius, overflow: 'hidden' }}>
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ico.mail width="16" height="16" style={{ color: theme.muted, flexShrink: 0 }}/>
              <input style={{ ...fieldStyle, background: 'transparent', border: 'none', padding: 0 }} value={form.email} onChange={e => update('email', e.target.value)} placeholder="E-mail"/>
            </div>
            <div style={{ height: 1, background: theme.border }}/>
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ico.phone width="16" height="16" style={{ color: theme.muted, flexShrink: 0 }}/>
              <input style={{ ...fieldStyle, background: 'transparent', border: 'none', padding: 0 }} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="Telefone"/>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div>
          <FieldLabel>Documentos</FieldLabel>
          <input style={fieldStyle} value={form.cpf} onChange={e => update('cpf', e.target.value)} placeholder="CPF"/>
        </div>

        {/* Address */}
        <div>
          <FieldLabel>Endereço</FieldLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10, marginBottom: 10 }}>
            <input style={fieldStyle} value={form.cep} onChange={e => update('cep', e.target.value)} placeholder="CEP"/>
            <input style={fieldStyle} value={form.address} onChange={e => update('address', e.target.value)} placeholder="Logradouro"/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
            <input style={fieldStyle} value={form.city} onChange={e => update('city', e.target.value)} placeholder="Cidade"/>
            <input style={fieldStyle} value={form.state} onChange={e => update('state', e.target.value)} placeholder="UF"/>
          </div>
        </div>

        {/* Privacy notice */}
        <div style={{ display: 'flex', gap: 10, padding: 12, background: `${theme.primary}0E`, border: `1px solid ${theme.primary}33`, borderRadius: theme.smallRadius }}>
          <Ico.shield width="16" height="16" style={{ color: theme.primary, flexShrink: 0, marginTop: 1 }}/>
          <p style={{ fontSize: 11, color: theme.text, lineHeight: 1.5 }}>Seus dados são protegidos pela LGPD. A Servopa nunca compartilha informações com terceiros sem sua autorização.</p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, paddingTop: 6 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 700,
            background: 'transparent', color: theme.text, border: `1px solid ${theme.border}`,
          }}>Cancelar</button>
          <button onClick={handleSave} disabled={saving || savedOk} style={{
            flex: 2, padding: '14px', borderRadius: theme.btnRadius, fontSize: 14, fontWeight: 800,
            background: savedOk ? theme.success : theme.primary,
            color: theme.onPrimary, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 200ms ease',
          }}>
            {saving ? 'Salvando...' : savedOk ? <><Ico.check width="16" height="16"/> Salvo</> : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </Sheet>
  );
}

// =============================================================
// WHATSAPP CONTACT
// =============================================================
function WhatsAppSheet({ theme, onClose }) {
  const { Ico } = window.SVP;
  const channels = [
    {
      id: 'general',
      title: 'Central Servopa',
      subtitle: 'Atendimento geral · Seg–Sex 8h–18h',
      number: '(41) 3022-4500',
      hint: 'Resposta em ~5 min',
    },
    {
      id: 'service',
      title: 'Pós-vendas e revisões',
      subtitle: 'Agendamento e dúvidas técnicas',
      number: '(41) 3022-4520',
      hint: 'Resposta em ~10 min',
    },
    {
      id: 'sales',
      title: 'Compra e consórcio',
      subtitle: 'Falar com um consultor',
      number: '(41) 3022-4510',
      hint: 'Online agora',
      online: true,
    },
  ];

  return (
    <Sheet
      theme={theme}
      onClose={onClose}
      title="Falar com a Servopa"
      subtitle="Escolha o canal mais adequado"
      icon={<div style={{ color: '#25D366' }}><Ico.whatsapp width="22" height="22"/></div>}
    >
      <div style={{ padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {channels.map(c => (
          <button key={c.id} style={{
            background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius,
            padding: 16, textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: '#25D36614', color: '#25D366',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              position: 'relative',
            }}>
              <Ico.whatsapp width="22" height="22"/>
              {c.online && (
                <span style={{ position: 'absolute', right: -2, bottom: -2, width: 12, height: 12, borderRadius: 6, background: '#22C55E', border: `2px solid ${theme.card}` }}/>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.005em' }}>{c.title}</p>
              <p style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{c.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 12, color: theme.text, fontWeight: 700 }}>{c.number}</span>
                <span style={{ fontSize: 11, color: c.online ? '#22C55E' : theme.muted, fontWeight: 600 }}>· {c.hint}</span>
              </div>
            </div>
            <Ico.arrowSm width="16" height="16" style={{ color: theme.muted }}/>
          </button>
        ))}

        {/* Other channels */}
        <p style={{ fontSize: 11, color: theme.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 14, marginBottom: 4 }}>Outros canais</p>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: theme.cardRadius, overflow: 'hidden' }}>
          {[
            { icon: 'phone', label: 'Ligar para central', detail: '0800 600 4500' },
            { icon: 'mail', label: 'Enviar e-mail', detail: 'atendimento@servopa.com.br' },
            { icon: 'pin', label: 'Ver lojas próximas', detail: 'Curitiba, PR' },
          ].map((row, i, arr) => {
            const IconC = Ico[row.icon] || Ico.user;
            return (
              <button key={row.label} style={{
                width: '100%', background: 'transparent', border: 'none',
                borderTop: i > 0 ? `1px solid ${theme.border}` : 'none',
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                color: theme.text, cursor: 'pointer', textAlign: 'left',
              }}>
                <IconC width="17" height="17" style={{ color: theme.muted }}/>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{row.label}</p>
                  <p style={{ fontSize: 12, color: theme.muted, marginTop: 1 }}>{row.detail}</p>
                </div>
                <Ico.arrowSm width="14" height="14" style={{ color: theme.muted }}/>
              </button>
            );
          })}
        </div>
      </div>
    </Sheet>
  );
}

window.EditProfileSheet = EditProfileSheet;
window.WhatsAppSheet = WhatsAppSheet;
