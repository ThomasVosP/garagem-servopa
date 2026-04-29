// =============================================================
// Login — split prospect vs cliente Servopa
// =============================================================
function LoginScreen({ onLogin, theme }) {
  const [mode, setMode] = useState('intro'); // intro | client | prospect
  const { ServopaLogo, ServopaMark, Ico } = window.SVP;

  if (mode === 'intro') {
    return (
      <div style={{ minHeight: '100%', background: theme.bg, color: theme.text, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <div>
            <ServopaLogo size={32} color={theme.text} />
            <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.05, marginTop: 28, letterSpacing: '-0.02em' }}>
              Sua garagem,<br/>
              <span style={{ color: theme.primary }}>do jeito que ela merece.</span>
            </h1>
            <p style={{ marginTop: 14, fontSize: 15, color: theme.muted, lineHeight: 1.5, maxWidth: 320 }}>
              Bem-vindo à Garagem Servopa. Cuide do seu carro, acumule Servopontos e descubra novidades.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => setMode('client')} style={{ background: theme.primary, color: theme.onPrimary, padding: '15px 18px', borderRadius: theme.btnRadius, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none' }}>
              <span>Já sou cliente Servopa</span>
              <Ico.arrow width="18" height="18"/>
            </button>
            <button onClick={() => setMode('prospect')} style={{ background: 'transparent', color: theme.text, padding: '15px 18px', borderRadius: theme.btnRadius, fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${theme.border}` }}>
              <span>Quero conhecer / comprar</span>
              <Ico.arrowSm width="18" height="18"/>
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: theme.muted, marginTop: 24 }}>
          Grupo Servopa • Desde 1955 • +300 mil clientes
        </p>
      </div>
    );
  }

  const isClient = mode === 'client';
  return (
    <div style={{ minHeight: '100%', background: theme.bg, color: theme.text, padding: '24px 24px 32px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => setMode('intro')} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', color: theme.muted, padding: 4, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        <Ico.back width="16" height="16"/> voltar
      </button>
      <div style={{ marginBottom: 24 }}>
        <ServopaMark size={28} color={theme.text} />
        <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 16, letterSpacing: '-0.01em' }}>
          {isClient ? 'Acesse sua conta' : 'Crie sua conta'}
        </h2>
        <p style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>
          {isClient ? 'Use seu CPF ou e-mail cadastrado na Servopa.' : 'Cadastro grátis. Ganhe 200 Servopontos no perfil completo.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!isClient && (
          <input placeholder="Seu nome completo" style={{ background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius, padding: '14px 16px', color: theme.text, fontSize: 14 }} />
        )}
        <input placeholder={isClient ? 'CPF ou e-mail' : 'E-mail'} defaultValue={isClient ? 'renato.marques@gmail.com' : ''} style={{ background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius, padding: '14px 16px', color: theme.text, fontSize: 14 }} />
        <input type="password" placeholder="Senha" defaultValue="••••••••" style={{ background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius, padding: '14px 16px', color: theme.text, fontSize: 14 }} />
        {!isClient && (
          <input placeholder="CPF (opcional)" style={{ background: theme.field, border: `1px solid ${theme.border}`, borderRadius: theme.fieldRadius, padding: '14px 16px', color: theme.text, fontSize: 14 }} />
        )}
      </div>

      <button onClick={() => onLogin(isClient)} style={{ marginTop: 20, background: theme.primary, color: theme.onPrimary, padding: '15px 18px', borderRadius: theme.btnRadius, fontWeight: 700, fontSize: 15, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {isClient ? 'Entrar' : 'Criar conta'}
        <Ico.arrow width="16" height="16"/>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
        <div style={{ flex: 1, height: 1, background: theme.border }}/>
        <span style={{ fontSize: 11, color: theme.muted, letterSpacing: '0.1em' }}>OU</span>
        <div style={{ flex: 1, height: 1, background: theme.border }}/>
      </div>

      <button onClick={() => onLogin(isClient)} style={{ background: theme.field, color: theme.text, padding: '14px 18px', borderRadius: theme.btnRadius, fontWeight: 600, fontSize: 14, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continuar com Google
      </button>

      <p style={{ marginTop: 'auto', textAlign: 'center', fontSize: 12, color: theme.muted, paddingTop: 24 }}>
        {isClient ? 'Ainda não tem cadastro? ' : 'Já tem conta? '}
        <button onClick={() => setMode(isClient ? 'prospect' : 'client')} style={{ background: 'transparent', border: 'none', color: theme.primary, fontWeight: 700 }}>
          {isClient ? 'Cadastre-se' : 'Entrar'}
        </button>
      </p>
    </div>
  );
}

window.LoginScreen = LoginScreen;
