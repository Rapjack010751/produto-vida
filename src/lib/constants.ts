export const CATEGORIES = {
  professional: { label: 'Profissional', color: 'from-blue-500 to-indigo-600' },
  financial: { label: 'Financeiro', color: 'from-emerald-400 to-teal-600' },
  health: { label: 'Saúde & Corpo', color: 'from-orange-400 to-pink-600' },
  spiritual: { label: 'Espiritual', color: 'from-purple-500 to-pink-500' },
  relationships: { label: 'Relacionamentos', color: 'from-pink-400 to-red-500' },
  personal: { label: 'Pessoal', color: 'from-cyan-500 to-blue-600' }
} as const

export const ACTIVITY_SUGGESTIONS = [
  { title: 'Meditação Diária', category: 'spiritual', duration: '15 min' },
  { title: 'Exercício Físico', category: 'health', duration: '30 min' },
  { title: 'Leitura', category: 'personal', duration: '20 min' },
  { title: 'Networking', category: 'professional', duration: '1 hora' },
  { title: 'Planejamento Financeiro', category: 'financial', duration: '30 min' },
  { title: 'Tempo em Família', category: 'relationships', duration: '2 horas' }
]

export const DEVELOPMENT_AREAS = [
  { id: 'professional', label: 'Desenvolvimento Profissional', icon: 'Briefcase' },
  { id: 'financial', label: 'Educação Financeira', icon: 'DollarSign' },
  { id: 'health', label: 'Saúde e Bem-estar', icon: 'Heart' },
  { id: 'spiritual', label: 'Crescimento Espiritual', icon: 'Sparkles' },
  { id: 'relationships', label: 'Relacionamentos', icon: 'Users' },
  { id: 'personal', label: 'Desenvolvimento Pessoal', icon: 'User' }
]
