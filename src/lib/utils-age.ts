export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

export function getAgeBasedRecommendations(age: number) {
  if (age < 18) {
    return {
      focus: ['education', 'hobbies', 'social_skills'],
      suggestions: [
        'Desenvolva habilidades de estudo',
        'Explore diferentes atividades',
        'Construa amizades saudáveis'
      ]
    }
  } else if (age < 30) {
    return {
      focus: ['career', 'financial_basics', 'relationships'],
      suggestions: [
        'Invista em sua carreira',
        'Aprenda sobre finanças pessoais',
        'Construa uma rede profissional'
      ]
    }
  } else if (age < 50) {
    return {
      focus: ['career_growth', 'investments', 'health', 'family'],
      suggestions: [
        'Avance na carreira',
        'Diversifique investimentos',
        'Mantenha hábitos saudáveis',
        'Fortaleça laços familiares'
      ]
    }
  } else {
    return {
      focus: ['health', 'legacy', 'wisdom_sharing', 'hobbies'],
      suggestions: [
        'Priorize sua saúde',
        'Compartilhe sua experiência',
        'Planeje seu legado',
        'Aproveite hobbies e lazer'
      ]
    }
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function calculateProgress(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100)
}
