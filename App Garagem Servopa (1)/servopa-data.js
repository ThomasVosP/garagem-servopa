
window.SVP_DATA = {
  user: {
    name: 'Renato Marques',
    firstName: 'Renato',
    lastName: 'Marques',
    handle: 'renato.m',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isClient: true, // true = já comprou na Servopa; false = prospect
    customerSince: 2021,
    location: 'Curitiba, PR',
    cpf: '••• .•••.•••-12',
    phone: '(41) 9 ••••-9230',
    email: 'renato.marques@gmail.com',
    points: 8420,
    pointsThisYear: 3120,
    tier: 'drive', // start | drive | premium | black
    nextTierAt: 12000,
    referrals: 3,
    cashbackBalance: 84.20, // R$
  },
  tiers: [
    { id: 'start',   name: 'Start',   minPoints: 0,     accent: '#9CA3AF', perks: ['Acesso ao programa', 'Lembretes de revisão'] },
    { id: 'drive',   name: 'Drive',   minPoints: 5000,  accent: '#175AC8', perks: ['5% off em peças', 'Test drive prioritário', 'Brinde Servopa Boutique'] },
    { id: 'premium', name: 'Premium', minPoints: 12000, accent: '#06BCC1', perks: ['10% off em revisões', 'Manobrista cortesia', 'Acesso antecipado a lançamentos'] },
    { id: 'black',   name: 'Black',   minPoints: 25000, accent: '#0F1115', perks: ['15% off serviços', 'Concierge dedicado', 'Eventos VIP', 'Carro reserva em revisões'] },
  ],
  garage: [
    {
      id: 'g1', make: 'Volkswagen', model: 'Nivus Highline', year: 2023,
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      licensePlate: 'BFD-2K48',
      purchasedAt: 'mar/2023',
      kmAtPurchase: 0,
      currentKm: 21850,
      nextRevisionKm: 30000,
      nextRevisionDate: '15 mar 2026',
      lastService: 'Revisão 20.000 km — Servopa Marechal',
      lastServiceDate: 'fev 2026',
      ipvaStatus: 'paid', // paid | due | overdue
      ipvaDue: '—',
      insuranceStatus: 'active',
      insuranceUntil: 'jul 2026',
    }
  ],
  earnActivities: [
    {
      id: 'profile', title: 'Complete seu perfil', subtitle: 'Adicione foto, CPF e telefone',
      points: 200, status: 'done', icon: 'user', category: 'onboarding'
    },
    {
      id: 'addCar', title: 'Adicione seu veículo', subtitle: 'Placa + km atual',
      points: 500, status: 'done', icon: 'car', category: 'onboarding'
    },
    {
      id: 'schedule', title: 'Agende uma revisão', subtitle: 'Próxima em 15 mar 2026',
      points: 1500, status: 'available', icon: 'calendar', category: 'service',
      cta: 'Agendar', highlight: true
    },
    {
      id: 'review', title: 'Avalie seu último serviço', subtitle: 'Revisão 20.000 km — fev 2026',
      points: 300, status: 'available', icon: 'star', category: 'service',
      cta: 'Avaliar'
    },
    {
      id: 'referral', title: 'Indique um amigo', subtitle: 'Você ganha 1.000 pts por agendamento',
      points: 1000, status: 'available', icon: 'users', category: 'growth',
      cta: 'Indicar'
    },
    {
      id: 'testdrive', title: 'Test drive de um lançamento', subtitle: 'Confira o novo BYD Song Plus',
      points: 800, status: 'available', icon: 'key', category: 'discover'
    },
    {
      id: 'simulate', title: 'Simule um consórcio', subtitle: 'Sem compromisso, ganhe pontos',
      points: 400, status: 'available', icon: 'landmark', category: 'discover'
    },
    {
      id: 'visit', title: 'Visite uma loja Servopa', subtitle: 'Check-in via QR Code na loja',
      points: 250, status: 'locked', icon: 'pin', category: 'discover'
    },
  ],
  rewards: [
    { id: 'r1', title: 'R$ 50 em crédito Servopa', cost: 5000, type: 'cashback', icon: 'wallet' },
    { id: 'r2', title: '10% off em troca de óleo', cost: 1500, type: 'discount', icon: 'wrench' },
    { id: 'r3', title: 'Lavagem premium grátis', cost: 2500, type: 'service', icon: 'sparkles' },
    { id: 'r4', title: 'R$ 200 em crédito Servopa', cost: 18000, type: 'cashback', icon: 'wallet' },
    { id: 'r5', title: 'Diagnóstico completo grátis', cost: 4000, type: 'service', icon: 'gauge' },
    { id: 'r6', title: 'Kit boutique Servopa', cost: 6500, type: 'gift', icon: 'gift' },
  ],
  marketplace: [
    {
      id: '1', make: 'Volkswagen', model: 'T-Cross Highline', year: 2023, price: 168900,
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      description: 'T-Cross 1.4 TSI top de linha. Único dono. Garantia de fábrica até 2026.',
      mileage: 18500, color: 'Branco Cristal', fuelType: 'Flex', likes: 24, isLiked: false,
      store: 'Servopa Rockefeller', certified: true,
    },
    {
      id: '2', make: 'BYD', model: 'Song Plus', year: 2024, price: 269900,
      imageUrl: 'https://images.unsplash.com/photo-1632934928450-7b18c8e4cf24?auto=format&fit=crop&w=1200&q=80',
      description: 'BYD Song Plus híbrido. Autonomia combinada de 1.100 km. Zero km.',
      mileage: 0, color: 'Cinza Metálico', fuelType: 'Híbrido', likes: 89, isLiked: true,
      store: 'BYD Servopa Curitiba', certified: true, electric: true,
    },
    {
      id: '3', make: 'Honda', model: 'HR-V Touring', year: 2022, price: 158000,
      imageUrl: 'https://images.unsplash.com/photo-1606152421811-aba947e8b892?auto=format&fit=crop&w=1200&q=80',
      description: 'HR-V Touring CVT. Revisões em concessionária Honda Prixx (Servopa).',
      mileage: 32000, color: 'Prata Lunar', fuelType: 'Flex', likes: 56, isLiked: false,
      store: 'Honda Prixx', certified: true,
    },
    {
      id: '4', make: 'Audi', model: 'A3 Sportback', year: 2023, price: 245000,
      imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80',
      description: 'A3 Sportback 35 TFSI Performance Black. Pacote S Line completo.',
      mileage: 12000, color: 'Preto Mythos', fuelType: 'Gasolina', likes: 142, isLiked: false,
      store: 'Audi Center Curitiba', certified: true, premium: true,
    },
  ],
  appointments: [
    { id: 'a1', type: 'Revisão programada', date: '15 MAR', time: '09:30', store: 'Servopa Marechal', status: 'upcoming' },
    { id: 'a2', type: 'Diagnóstico eletrônico', date: '02 MAR', time: '14:00', store: 'Servopa Rockefeller', status: 'available' },
  ],
  history: [
    { id: 'h1', date: 'fev 2026', title: 'Revisão 20.000 km', store: 'Servopa Marechal', value: 'R$ 890,00', earned: 250, rated: false },
    { id: 'h2', date: 'set 2025', title: 'Troca de óleo', store: 'Servopa Marechal', value: 'R$ 320,00', earned: 80, rated: true },
    { id: 'h3', date: 'mar 2025', title: 'Revisão 10.000 km', store: 'Servopa Rockefeller', value: 'R$ 540,00', earned: 150, rated: true },
  ],
  offers: [
    { id: 'o1', title: 'BYD Song Plus 2024', subtitle: 'Lançamento • A partir de R$ 269.900', tag: 'Novidade', imageUrl: 'https://images.unsplash.com/photo-1632934928450-7b18c8e4cf24?auto=format&fit=crop&w=1200&q=80', accent: '#06BCC1' },
    { id: 'o2', title: 'Consórcio Servopa', subtitle: 'Carta de R$ 80.000 • Parcela R$ 587/mês', tag: 'Consórcio', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80', accent: '#175AC8' },
    { id: 'o3', title: 'Revisão programada', subtitle: 'Agende e ganhe 1.500 Servopontos', tag: 'Oficina', imageUrl: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=1200&q=80', accent: '#EC6C24' },
  ],
  events: [
    { id: 'e1', title: 'Test Drive Day BYD', date: '20 MAR • 09:00', location: 'BYD Servopa Curitiba', imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80', attendees: 142, price: 'Grátis', exclusive: true },
    { id: 'e2', title: 'Lançamento Audi Q5 2026', date: '05 ABR • 19:00', location: 'Audi Center Curitiba', imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', attendees: 56, price: 'VIP Premium', exclusive: true },
    { id: 'e3', title: 'Track Day Servopa', date: '18 ABR • 08:00', location: 'Autódromo Internacional Pinhais', imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80', attendees: 230, price: 'R$ 350,00' }
  ]
};
