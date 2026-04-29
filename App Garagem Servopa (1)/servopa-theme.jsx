// =============================================================
// THEME PRESETS — Clean Apple, Racing, Tech Futurista
// =============================================================
// Servopa institutional palette: deep blue + accent orange
// All themes share role tokens; presets remap them.

window.SVP_THEMES = {
  clean: {
    label: 'Clean (Servopa)',
    bg: '#F4F6FB',                       // very subtle blue-tinted gray
    card: '#FFFFFF',
    cardElevated: '#FFFFFF',
    field: '#EEF2F8',
    border: 'rgba(15,30,60,0.08)',
    text: '#0A1530',                     // deep navy ink instead of pure black
    muted: '#5A6A85',
    primary: '#0A3FA8',                  // SERVOPA deep institutional blue (more saturated)
    primaryDeep: '#072D7A',
    primarySoft: '#E8EFFB',              // soft blue tint for chip/badge bg
    accent: '#F39200',                   // Servopa orange accent (subtle, for highlights only)
    onPrimary: '#FFFFFF',
    success: '#16A34A',
    danger: '#DC2626',
    cardRadius: 18,
    smallRadius: 14,
    btnRadius: 12,
    fieldRadius: 12,
    cardShadow: '0 1px 3px rgba(10,21,48,0.04), 0 12px 28px -16px rgba(10,21,48,0.16)',
    heroGradient: 'linear-gradient(135deg, #0A3FA8 0%, #1559C9 60%, #2C7AE0 100%)',
    fontStack: '"Inter", "Satoshi", -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    statusBarStyle: 'dark',
  },
  racing: {
    label: 'Racing (vermelho + carbono)',
    bg: '#0B0B0D',
    card: '#16161A',
    cardElevated: '#1B1B20',
    field: '#212126',
    border: 'rgba(255,255,255,0.08)',
    text: '#F5F5F7',
    muted: '#8E8E94',
    primary: '#E11D2A',          // racing red
    onPrimary: '#FFFFFF',
    success: '#22C55E',
    danger: '#FB7185',
    cardRadius: 14,
    smallRadius: 10,
    btnRadius: 10,
    fieldRadius: 10,
    cardShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 30px rgba(0,0,0,0.5)',
    heroGradient: 'linear-gradient(135deg, rgba(225,29,42,0.18) 0%, rgba(225,29,42,0.04) 60%, transparent 100%), repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 2px, transparent 2px 6px)',
    fontStack: '"Satoshi", "Inter", -apple-system, system-ui, sans-serif',
    statusBarStyle: 'light',
  },
  tech: {
    label: 'Tech (neon + glass)',
    bg: '#0A0F1F',
    card: 'rgba(255,255,255,0.04)',
    cardElevated: 'rgba(255,255,255,0.06)',
    field: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.10)',
    text: '#F0F4FF',
    muted: '#8590B5',
    primary: '#06D6FF',          // electric cyan
    onPrimary: '#04141C',
    success: '#36F1A8',
    danger: '#FF5C8A',
    cardRadius: 20,
    smallRadius: 14,
    btnRadius: 14,
    fieldRadius: 14,
    cardShadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 40px rgba(6,214,255,0.06)',
    heroGradient: 'linear-gradient(135deg, rgba(6,214,255,0.18) 0%, rgba(125,90,255,0.14) 50%, transparent 100%)',
    fontStack: '"Satoshi", "Inter", -apple-system, system-ui, sans-serif',
    statusBarStyle: 'light',
  },
};

// Background CSS for entire viewport behind the iPhone (per preset)
window.SVP_BG = {
  clean:  'radial-gradient(ellipse at top, #DCE4F2 0%, #B8C7E0 100%)',
  racing: 'radial-gradient(ellipse at center, #1a1a1f 0%, #050507 100%)',
  tech:   'radial-gradient(ellipse at top, #1a1f3a 0%, #050810 70%)',
};
